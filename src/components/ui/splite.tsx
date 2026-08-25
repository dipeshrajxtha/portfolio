'use client'

import { Suspense, lazy } from 'react'
import { Bot } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-950/40 border border-indigo-500/20 backdrop-blur-md relative overflow-hidden animate-pulse">
          <div className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 shadow-[0_0_30px_rgba(100,120,255,0.25)]">
            <Bot className="w-10 h-10 text-indigo-400 animate-bounce" />
          </div>
          <span className="font-mono text-xs text-indigo-300/80 tracking-widest uppercase">
            Loading Interactive 3D Model...
          </span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
