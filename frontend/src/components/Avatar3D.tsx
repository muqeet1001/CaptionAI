import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import { Suspense } from 'react'

function Model() {
  // Public CORS-enabled sample model; you can replace with your own .glb URL
  const { scene } = useGLTF('https://modelviewer.dev/shared-assets/models/Astronaut.glb')
  return <primitive object={scene} />
}

export function Avatar3D() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-xl border bg-background/20">
      <Canvas camera={{ position: [2.5, 1.6, 2.5], fov: 45 }} shadows>
        <Suspense fallback={null}>
          <Stage environment={null} intensity={0.6}>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
      <div className="pointer-events-none absolute right-6 top-6 text-[10px] tracking-widest uppercase text-foreground/60">AI Avatar</div>
    </div>
  )
}

useGLTF.preload('https://modelviewer.dev/shared-assets/models/Astronaut.glb')