import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { Suspense, useMemo, useRef, useState } from 'react'

function NeonBlob() {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t / 2) / 8
      mesh.current.rotation.y = Math.cos(t / 3) / 8
    }
  })
  return (
    <mesh ref={mesh} castShadow>
      <icosahedronGeometry args={[1.1, 32]} />
      <MeshDistortMaterial
        color="#6ea2ff"
        emissive="#6ea2ff"
        emissiveIntensity={0.25}
        roughness={0.2}
        metalness={0.6}
        speed={1.2}
        distort={0.35}
      />
    </mesh>
  )
}

function VortexParticles({ count = 1500 }) {
  const group = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 1.8
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 2.0
      pos[i * 3 + 0] = Math.cos(angle) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * r
    }
    return pos
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    group.current.rotation.y = t * (hovered ? 0.25 : 0.12)
    group.current.rotation.x = Math.sin(t / 3) * 0.05
  })

  return (
    <group ref={group} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color={new THREE.Color('#86b3ff')} sizeAttenuation depthWrite={false} transparent opacity={0.9} />
      </points>
    </group>
  )
}

export function InteractiveScene() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-xl border bg-background/20">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.2, 4], fov: 45 }} shadows>
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[2, 2, 2]} intensity={0.9} castShadow />
        <directionalLight position={[-2, -1, -2]} intensity={0.3} />

        <Suspense fallback={null}>
          <group position={[0, -0.1, 0]}>
            <VortexParticles />
            <Sparkles count={60} scale={[4, 2.4, 2]} size={2} speed={0.4} color="#8eb5ff" />
            <NeonBlob />
          </group>
        </Suspense>

        <EffectComposer>
          <Bloom intensity={1.2} mipmapBlur luminanceThreshold={0.15} luminanceSmoothing={0.25} />
          <ChromaticAberration offset={[0.001, 0.001]} />
          <Vignette eskil offset={0.2} darkness={0.6} />
        </EffectComposer>
      </Canvas>

      <div className="pointer-events-none absolute right-6 top-6 text-[10px] tracking-widest uppercase text-foreground/60">Interactive AI</div>
    </div>
  )
}