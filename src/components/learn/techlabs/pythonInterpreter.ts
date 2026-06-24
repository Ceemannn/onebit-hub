/**
 * A deliberately tiny Python interpreter — enough to make the learning REPL feel
 * real for the supported subset: int/float/str/list literals, arithmetic
 * (+ - * / %), comparison-free f-strings, variables, list indexing, range() for
 * loops, and print / len / max / min / sum / round. Anything unsupported raises
 * a friendly error rather than doing something surprising.
 */

type Val =
  | { t: 'num'; v: number; float: boolean }
  | { t: 'str'; v: string }
  | { t: 'list'; v: Val[] }

const num = (v: number, float = false): Val => ({ t: 'num', v, float })
const str = (v: string): Val => ({ t: 'str', v })

class PyError extends Error {}

function valStr(val: Val): string {
  if (val.t === 'num') {
    if (val.float && Number.isInteger(val.v)) return val.v.toFixed(1)
    return String(val.v)
  }
  if (val.t === 'list') return '[' + val.v.map(reprStr).join(', ') + ']'
  return val.v
}
function reprStr(val: Val): string {
  return val.t === 'str' ? `'${val.v}'` : valStr(val)
}

/* ------------------------------ tokenizer ------------------------------ */
type Tok =
  | { k: 'num'; v: number; float: boolean }
  | { k: 'str'; v: string }
  | { k: 'fstr'; v: string }
  | { k: 'name'; v: string }
  | { k: 'op'; v: string }

function tokenize(src: string): Tok[] {
  const toks: Tok[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (c === ' ' || c === '\t') {
      i++
      continue
    }
    // f-string
    if ((c === 'f' || c === 'F') && (src[i + 1] === '"' || src[i + 1] === "'")) {
      const q = src[i + 1]
      let j = i + 2
      let s = ''
      while (j < src.length && src[j] !== q) s += src[j++]
      toks.push({ k: 'fstr', v: s })
      i = j + 1
      continue
    }
    if (c === '"' || c === "'") {
      let j = i + 1
      let s = ''
      while (j < src.length && src[j] !== c) s += src[j++]
      toks.push({ k: 'str', v: s })
      i = j + 1
      continue
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1]))) {
      let j = i
      let s = ''
      let float = false
      while (j < src.length && /[0-9.]/.test(src[j])) {
        if (src[j] === '.') float = true
        s += src[j++]
      }
      toks.push({ k: 'num', v: parseFloat(s), float })
      i = j
      continue
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i
      let s = ''
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) s += src[j++]
      toks.push({ k: 'name', v: s })
      i = j
      continue
    }
    if ('+-*/%()[],'.includes(c)) {
      toks.push({ k: 'op', v: c })
      i++
      continue
    }
    throw new PyError(`SyntaxError: unexpected character '${c}'`)
  }
  return toks
}

/* ------------------------------- parser -------------------------------- */
type Scope = Record<string, Val>

function evaluate(src: string, scope: Scope): Val {
  const toks = tokenize(src)
  let p = 0
  const peek = () => toks[p]
  const next = () => toks[p++]

  function parseExpr(): Val {
    return parseAdd()
  }
  function parseAdd(): Val {
    let left = parseMul()
    while (peek() && peek().k === 'op' && (peek().v === '+' || peek().v === '-')) {
      const op = String(next().v)
      const right = parseMul()
      left = applyBin(op, left, right)
    }
    return left
  }
  function parseMul(): Val {
    let left = parseUnary()
    while (peek() && peek().k === 'op' && ['*', '/', '%'].includes(String(peek().v))) {
      const op = String(next().v)
      const right = parseUnary()
      left = applyBin(op, left, right)
    }
    return left
  }
  function parseUnary(): Val {
    if (peek() && peek().k === 'op' && peek().v === '-') {
      next()
      const v = parseUnary()
      if (v.t !== 'num') throw new PyError('TypeError: bad operand for unary -')
      return num(-v.v, v.float)
    }
    return parsePostfix()
  }
  function parsePostfix(): Val {
    let v = parsePrimary()
    while (peek() && peek().k === 'op' && peek().v === '[') {
      next()
      const idx = parseExpr()
      expect(']')
      if (v.t !== 'list' && v.t !== 'str') throw new PyError('TypeError: object is not subscriptable')
      if (idx.t !== 'num') throw new PyError('TypeError: indices must be integers')
      let k = idx.v
      const len = v.t === 'list' ? v.v.length : v.v.length
      if (k < 0) k += len
      if (k < 0 || k >= len) throw new PyError('IndexError: index out of range')
      v = v.t === 'list' ? v.v[k] : str(v.v[k])
    }
    return v
  }
  function parsePrimary(): Val {
    const t = peek()
    if (!t) throw new PyError('SyntaxError: unexpected end of expression')
    if (t.k === 'num') {
      next()
      return num(t.v, t.float)
    }
    if (t.k === 'str') {
      next()
      return str(t.v)
    }
    if (t.k === 'fstr') {
      next()
      return str(interpolate(t.v, scope))
    }
    if (t.k === 'op' && t.v === '(') {
      next()
      const v = parseExpr()
      expect(')')
      return v
    }
    if (t.k === 'op' && t.v === '[') {
      next()
      const items: Val[] = []
      if (!(peek() && peek().k === 'op' && peek().v === ']')) {
        items.push(parseExpr())
        while (peek() && peek().k === 'op' && peek().v === ',') {
          next()
          items.push(parseExpr())
        }
      }
      expect(']')
      return { t: 'list', v: items }
    }
    if (t.k === 'name') {
      next()
      // function call?
      if (peek() && peek().k === 'op' && peek().v === '(') {
        next()
        const args: Val[] = []
        if (!(peek() && peek().k === 'op' && peek().v === ')')) {
          args.push(parseExpr())
          while (peek() && peek().k === 'op' && peek().v === ',') {
            next()
            args.push(parseExpr())
          }
        }
        expect(')')
        return callFn(t.v, args)
      }
      if (!(t.v in scope)) throw new PyError(`NameError: name '${t.v}' is not defined`)
      return scope[t.v]
    }
    throw new PyError('SyntaxError: unexpected token')
  }
  function expect(op: string) {
    const t = next()
    if (!t || t.k !== 'op' || t.v !== op) throw new PyError(`SyntaxError: expected '${op}'`)
  }

  const result = parseExpr()
  if (p < toks.length) throw new PyError('SyntaxError: unexpected trailing tokens')
  return result
}

function applyBin(op: string, a: Val, b: Val): Val {
  if (op === '+' && a.t === 'str' && b.t === 'str') return str(a.v + b.v)
  if (op === '+' && a.t === 'list' && b.t === 'list') return { t: 'list', v: [...a.v, ...b.v] }
  if (a.t !== 'num' || b.t !== 'num') throw new PyError(`TypeError: unsupported operands for '${op}'`)
  const float = op === '/' || a.float || b.float
  switch (op) {
    case '+':
      return num(a.v + b.v, float)
    case '-':
      return num(a.v - b.v, float)
    case '*':
      return num(a.v * b.v, float)
    case '/':
      if (b.v === 0) throw new PyError('ZeroDivisionError: division by zero')
      return num(a.v / b.v, true)
    case '%':
      return num(a.v % b.v, float)
    default:
      throw new PyError(`TypeError: bad operator '${op}'`)
  }
}

function callFn(name: string, args: Val[]): Val {
  switch (name) {
    case 'len': {
      const a = args[0]
      if (a?.t === 'list') return num(a.v.length)
      if (a?.t === 'str') return num(a.v.length)
      throw new PyError('TypeError: object has no len()')
    }
    case 'sum': {
      const a = args[0]
      if (a?.t !== 'list') throw new PyError('TypeError: sum() expects a list')
      let acc = 0
      let float = false
      for (const it of a.v) {
        if (it.t !== 'num') throw new PyError('TypeError: unsupported operand in sum()')
        acc += it.v
        float = float || it.float
      }
      return num(acc, float)
    }
    case 'max':
    case 'min': {
      const list = args.length === 1 && args[0].t === 'list' ? args[0].v : args
      const nums = list.map((x) => {
        if (x.t !== 'num') throw new PyError(`TypeError: ${name}() expects numbers`)
        return x
      })
      if (!nums.length) throw new PyError(`ValueError: ${name}() arg is empty`)
      let best = nums[0]
      for (const x of nums) if (name === 'max' ? x.v > best.v : x.v < best.v) best = x
      return best
    }
    case 'round': {
      const a = args[0]
      if (a?.t !== 'num') throw new PyError('TypeError: round() expects a number')
      const nd = args[1]?.t === 'num' ? args[1].v : 0
      const f = Math.pow(10, nd)
      return num(Math.round(a.v * f) / f, nd > 0)
    }
    case 'str':
      return str(args[0] ? valStr(args[0]) : '')
    case 'int': {
      const a = args[0]
      if (a?.t === 'num') return num(Math.trunc(a.v))
      if (a?.t === 'str') return num(parseInt(a.v, 10))
      throw new PyError('TypeError: int() bad argument')
    }
    default:
      throw new PyError(`NameError: function '${name}' is not defined`)
  }
}

function interpolate(template: string, scope: Scope): string {
  return template.replace(/\{([^}]*)\}/g, (_, expr) => valStr(evaluate(expr.trim(), scope)))
}

/* ----------------------------- statements ------------------------------ */
type Line = { indent: number; text: string }

export function runPython(source: string): { lines: string[]; error: boolean } {
  const out: string[] = []
  const scope: Scope = {}
  const raw = source.split('\n')
  const lines: Line[] = raw.map((l) => {
    const text = l.replace(/\t/g, '    ')
    const indent = text.length - text.trimStart().length
    return { indent, text: text.trim() }
  })

  try {
    execBlock(lines, 0, lines.length, 0, scope, out)
    return { lines: out.length ? out : ['(no output)'], error: false }
  } catch (e) {
    out.push(e instanceof PyError ? e.message : `Error: ${(e as Error).message}`)
    return { lines: out, error: true }
  }
}

function execBlock(lines: Line[], start: number, end: number, indent: number, scope: Scope, out: string[]) {
  let i = start
  let guard = 0
  while (i < end) {
    if (++guard > 100000) throw new PyError('RuntimeError: execution limit reached')
    const line = lines[i]
    if (!line.text || line.text.startsWith('#')) {
      i++
      continue
    }
    // for <name> in range(...) / list:
    const forMatch = line.text.match(/^for\s+([A-Za-z_]\w*)\s+in\s+(.+):$/)
    if (forMatch) {
      const varName = forMatch[1]
      const iterableSrc = forMatch[2].trim()
      const bodyStart = i + 1
      let bodyEnd = bodyStart
      while (bodyEnd < end && (lines[bodyEnd].text === '' || lines[bodyEnd].indent > line.indent)) bodyEnd++

      for (const item of resolveIterable(iterableSrc, scope)) {
        scope[varName] = item
        execBlock(lines, bodyStart, bodyEnd, line.indent + 4, scope, out)
      }
      i = bodyEnd
      continue
    }
    execStatement(line.text, scope, out)
    i++
  }
  void indent
}

function resolveIterable(src: string, scope: Scope): Val[] {
  const rangeMatch = src.match(/^range\((.*)\)$/)
  if (rangeMatch) {
    const args = splitArgs(rangeMatch[1]).map((a) => {
      const v = evaluate(a, scope)
      if (v.t !== 'num') throw new PyError('TypeError: range() expects integers')
      return Math.trunc(v.v)
    })
    let [a, b, step] = [0, 0, 1]
    if (args.length === 1) [b] = args
    else if (args.length === 2) [a, b] = args
    else if (args.length >= 3) [a, b, step] = args
    const arr: Val[] = []
    if (step === 0) throw new PyError('ValueError: range() step cannot be zero')
    for (let k = a; step > 0 ? k < b : k > b; k += step) arr.push(num(k))
    return arr
  }
  const v = evaluate(src, scope)
  if (v.t === 'list') return v.v
  if (v.t === 'str') return v.v.split('').map(str)
  throw new PyError('TypeError: object is not iterable')
}

function execStatement(text: string, scope: Scope, out: string[]) {
  const printMatch = text.match(/^print\((.*)\)$/)
  if (printMatch) {
    const args = splitArgs(printMatch[1])
    out.push(args.map((a) => valStr(evaluate(a, scope))).join(' '))
    return
  }
  // assignment (not ==, no comparison support)
  const eq = findAssignEq(text)
  if (eq !== -1) {
    const name = text.slice(0, eq).trim()
    if (!/^[A-Za-z_]\w*$/.test(name)) throw new PyError('SyntaxError: invalid assignment target')
    scope[name] = evaluate(text.slice(eq + 1).trim(), scope)
    return
  }
  // bare expression (e.g. a function call) — evaluate for side-effect-free subset
  evaluate(text, scope)
}

function findAssignEq(text: string): number {
  let depth = 0
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if ('([{'.includes(c)) depth++
    else if (')]}'.includes(c)) depth--
    else if (c === '=' && depth === 0 && text[i + 1] !== '=' && text[i - 1] !== '!' && text[i - 1] !== '<' && text[i - 1] !== '>') {
      return i
    }
  }
  return -1
}

function splitArgs(src: string): string[] {
  const out: string[] = []
  let depth = 0
  let cur = ''
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    if ('([{'.includes(c)) depth++
    if (')]}'.includes(c)) depth--
    if (c === ',' && depth === 0) {
      out.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}
