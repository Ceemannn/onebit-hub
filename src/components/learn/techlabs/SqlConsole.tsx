import { useState } from 'react'
import { Play, Database, Table2 } from 'lucide-react'

type Row = Record<string, string | number>

// Sample table the queries run against.
const SALES: Row[] = [
  { id: 1, region: 'Lagos', product: 'Analytics', amount: 240, status: 'paid' },
  { id: 2, region: 'Abuja', product: 'ERP', amount: 180, status: 'pending' },
  { id: 3, region: 'Lagos', product: 'AI', amount: 320, status: 'paid' },
  { id: 4, region: 'Nairobi', product: 'Analytics', amount: 150, status: 'paid' },
  { id: 5, region: 'Abuja', product: 'AI', amount: 410, status: 'paid' },
  { id: 6, region: 'Lagos', product: 'ERP', amount: 90, status: 'refunded' },
  { id: 7, region: 'Nairobi', product: 'AI', amount: 260, status: 'pending' },
  { id: 8, region: 'Abuja', product: 'Analytics', amount: 200, status: 'paid' },
]

const EXAMPLES = [
  'SELECT * FROM sales WHERE region = \'Lagos\';',
  'SELECT region, product, amount FROM sales WHERE amount > 200 ORDER BY amount DESC;',
  'SELECT * FROM sales WHERE status = \'paid\' ORDER BY amount DESC LIMIT 3;',
]

type Result = { cols: string[]; rows: Row[] } | { error: string }

function runSql(query: string): Result {
  try {
    let q = query.trim().replace(/;$/, '')
    const m = q.match(/^select\s+(.+?)\s+from\s+sales(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(.+?))?(?:\s+limit\s+(\d+))?$/is)
    if (!m) throw new Error('Only: SELECT <cols> FROM sales [WHERE ...] [ORDER BY col [ASC|DESC]] [LIMIT n]')
    const [, colsRaw, whereRaw, orderRaw, limitRaw] = m

    let rows = [...SALES]

    if (whereRaw) {
      const clauses = whereRaw.split(/\s+and\s+/i).map(parseCondition)
      rows = rows.filter((r) => clauses.every((c) => c(r)))
    }

    if (orderRaw) {
      const [col, dir] = orderRaw.trim().split(/\s+/)
      if (!(col in SALES[0])) throw new Error(`Unknown column '${col}'`)
      const desc = (dir || 'asc').toLowerCase() === 'desc'
      rows.sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (desc ? -1 : 1))
    }

    if (limitRaw) rows = rows.slice(0, Number(limitRaw))

    const cols =
      colsRaw.trim() === '*'
        ? Object.keys(SALES[0])
        : colsRaw.split(',').map((c) => c.trim())
    for (const c of cols) if (!(c in SALES[0])) throw new Error(`Unknown column '${c}'`)
    const projected = rows.map((r) => Object.fromEntries(cols.map((c) => [c, r[c]])))
    return { cols, rows: projected }
  } catch (e) {
    return { error: (e as Error).message }
  }
}

function parseCondition(raw: string): (r: Row) => boolean {
  const m = raw.trim().match(/^(\w+)\s*(>=|<=|!=|=|>|<)\s*(.+)$/)
  if (!m) throw new Error(`Bad condition: ${raw}`)
  const [, col, op, valRaw] = m
  if (!(col in SALES[0])) throw new Error(`Unknown column '${col}'`)
  const v = valRaw.trim().replace(/^'(.*)'$/, '$1')
  const num = Number(v)
  const isNum = !Number.isNaN(num) && /^-?\d+(\.\d+)?$/.test(v)
  return (r) => {
    const cell = r[col]
    const a = isNum ? Number(cell) : String(cell)
    const b = isNum ? num : v
    switch (op) {
      case '=':
        return a === b
      case '!=':
        return a !== b
      case '>':
        return a > b
      case '<':
        return a < b
      case '>=':
        return a >= b
      case '<=':
        return a <= b
      default:
        return false
    }
  }
}

/** SQL-tailored lab: a query editor that really runs against a sample table. */
export function SqlConsole() {
  const [query, setQuery] = useState(EXAMPLES[1])
  const [result, setResult] = useState<Result>(() => runSql(EXAMPLES[1]))

  const run = () => setResult(runSql(query))

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Database size={16} className="text-indigo-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">SQL console</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/60">table: sales</span>
        </div>
        <button
          onClick={run}
          className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-gold-400"
        >
          <Play size={13} /> Run query
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(ex)
                setResult(runSql(ex))
              }}
              className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] text-white/60 transition hover:text-white"
            >
              example {i + 1}
            </button>
          ))}
        </div>

        <textarea
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run()
          }}
          className="h-24 w-full resize-none rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[13px] leading-6 text-emerald-200 outline-none focus:border-indigo-400"
        />

        {/* Results */}
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-wider text-white/40">
            <Table2 size={12} /> Result
            {'rows' in result && <span className="ml-auto font-mono normal-case text-white/40">{result.rows.length} rows</span>}
          </div>
          {'error' in result ? (
            <p className="p-4 font-mono text-xs text-[#ff9ea1]">⚠ {result.error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-white/50">
                    {result.cols.map((c) => (
                      <th key={c} className="px-3 py-2 font-medium uppercase tracking-wider">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      {result.cols.map((c) => (
                        <td key={c} className="px-3 py-2 text-white/80">
                          {String(r[c])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {result.rows.length === 0 && (
                    <tr>
                      <td className="px-3 py-4 text-white/40" colSpan={result.cols.length}>
                        No rows match.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <p className="text-center text-[11px] text-white/40">Tip: press ⌘/Ctrl + Enter to run.</p>
      </div>
    </div>
  )
}
