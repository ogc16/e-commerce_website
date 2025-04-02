import type React from "react"
import { cn } from "@/lib/utils"

interface StepsProps {
  children: React.ReactNode
  className?: string
}

interface StepItemProps {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}

export function Steps({ children, className }: StepsProps) {
  return <div className={cn("space-y-8", className)}>{children}</div>
}

export function StepItem({ title, children, icon }: StepItemProps) {
  return (
    <div className="relative pl-8 pb-8 border-l last:border-l-0 border-primary/20">
      <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 -translate-x-1/2 rounded-full bg-primary text-primary-foreground">
        {icon || <span className="text-xs font-bold"></span>}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  )
}

