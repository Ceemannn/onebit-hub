import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Futuristic 3D "bit-cell" constellation: an indigo node lattice with a few
 * emerald/gold accent nodes, slowly rotating and parallaxing to the cursor.
 * Pure three.js (no extra deps). Honours prefers-reduced-motion (renders a
 * single static frame) and disposes all GPU resources on unmount.
 */
export function HeroConstellation({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const width = () => mount.clientWidth || 1
    const height = () => mount.clientHeight || 1

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width() / height(), 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width(), height())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // ---- nodes -------------------------------------------------------------
    const COUNT = 140
    const SPREAD = 11
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)

    const indigo = new THREE.Color('#5A4FE0')
    const indigoLight = new THREE.Color('#A99FEF')
    const emerald = new THREE.Color('#13B97A')
    const gold = new THREE.Color('#F5A623')

    const vecs: THREE.Vector3[] = []
    for (let i = 0; i < COUNT; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD * 2,
        (Math.random() - 0.5) * SPREAD * 1.3,
        (Math.random() - 0.5) * SPREAD * 1.4,
      )
      vecs.push(v)
      positions[i * 3] = v.x
      positions[i * 3 + 1] = v.y
      positions[i * 3 + 2] = v.z

      // Mostly indigo, with sparse emerald/gold accent nodes.
      const roll = Math.random()
      const c = roll > 0.92 ? gold : roll > 0.82 ? emerald : roll > 0.55 ? indigoLight : indigo
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      sizes[i] = roll > 0.82 ? 0.42 : 0.22
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    pointsGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Round, glowing sprite for each node.
    const sprite = makeDotTexture()
    const pointsMat = new THREE.PointsMaterial({
      size: 0.5,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pointsGeo, pointsMat)
    group.add(points)

    // ---- connecting lines --------------------------------------------------
    const linePos: number[] = []
    const lineCol: number[] = []
    const MAX_DIST = 3.4
    for (let i = 0; i < COUNT; i++) {
      let links = 0
      for (let j = i + 1; j < COUNT && links < 3; j++) {
        if (vecs[i].distanceTo(vecs[j]) < MAX_DIST) {
          links++
          linePos.push(vecs[i].x, vecs[i].y, vecs[i].z, vecs[j].x, vecs[j].y, vecs[j].z)
          lineCol.push(0.35, 0.31, 0.88, 0.07, 0.72, 0.48)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineCol, 3))
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.NormalBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    group.add(lines)

    // ---- interaction + loop -----------------------------------------------
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.6
    }
    if (!reduce) window.addEventListener('mousemove', onMove, { passive: true })

    const onResize = () => {
      camera.aspect = width() / height()
      camera.updateProjectionMatrix()
      renderer.setSize(width(), height())
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
    io.observe(mount)

    const render = () => renderer.render(scene, camera)

    if (reduce) {
      group.rotation.set(0.1, 0.4, 0)
      render()
    } else {
      const clock = new THREE.Clock()
      const loop = () => {
        raf = requestAnimationFrame(loop)
        if (!visible) return
        const t = clock.getElapsedTime()
        current.x += (target.x - current.x) * 0.05
        current.y += (target.y - current.y) * 0.05
        group.rotation.y = t * 0.06 + current.x
        group.rotation.x = Math.sin(t * 0.12) * 0.08 + current.y
        render()
      }
      loop()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      ro.disconnect()
      io.disconnect()
      pointsGeo.dispose()
      lineGeo.dispose()
      pointsMat.dispose()
      lineMat.dispose()
      sprite.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden />
}

/** Soft radial dot used as the point sprite. */
function makeDotTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.85)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}
