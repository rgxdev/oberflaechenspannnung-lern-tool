import type React from "react"
import { FaAtom, FaFlask, FaMicroscope } from "react-icons/fa"
import { GiMolecule, GiWaterDrop, GiChemicalDrop } from "react-icons/gi"

interface FloatingIconsProps {
  className?: string
}

export function FloatingIcons({ className = "" }: FloatingIconsProps) {
  const icons = [
    { Icon: FaAtom, color: "text-blue-400", delay: "0s" },
    { Icon: GiMolecule, color: "text-teal-400", delay: "0.5s" },
    { Icon: GiWaterDrop, color: "text-cyan-400", delay: "1s" },
    { Icon: FaAtom, color: "text-indigo-400", delay: "1.5s" },
    { Icon: GiChemicalDrop, color: "text-purple-400", delay: "2s" },
    { Icon: FaFlask, color: "text-green-400", delay: "2.5s" },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {icons.map(({ Icon, color, delay }, index) => (
        <div
          key={index}
          className={`absolute animate-float ${color} opacity-20`}
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            animationDelay: delay,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
      ))}
    </div>
  )
}

interface ScienceIconBadgeProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  color?: string
  size?: "sm" | "md" | "lg"
}

export function ScienceIconBadge({
  icon: Icon,
  label,
  color = "bg-teal-100 text-teal-700",
  size = "md",
}: ScienceIconBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-full ${color} ${sizeClasses[size]} font-medium`}>
      <Icon className={iconSizes[size]} />
      <span>{label}</span>
    </div>
  )
}

export function ExperimentIcon({ type }: { type: "flask" | "microscope" | "atom" | "molecule" }) {
  const iconMap = {
    flask: FaFlask,
    microscope: FaMicroscope,
    atom: FaAtom,
    molecule: GiMolecule,
  }

  const Icon = iconMap[type]

  return (
    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
  )
}
