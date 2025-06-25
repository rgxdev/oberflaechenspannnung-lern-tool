"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X, Smartphone, Monitor, Zap } from "lucide-react"

interface PWAPromptProps {
  onInstall: () => void
  onDismiss: () => void
}

export function PWAPrompt({ onInstall, onDismiss }: PWAPromptProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50 shadow-2xl border-teal-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">App installieren</h3>
              <p className="text-xs text-slate-600 mt-1">Schneller Zugriff ohne Browser</p>
            </div>
          </div>
          <Button
            onClick={onDismiss}
            size="sm"
            variant="ghost"
            className="p-1 h-auto text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {showDetails && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center gap-1">
                <Zap className="w-5 h-5 text-teal-600" />
                <span className="text-xs text-slate-600">Schneller</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Smartphone className="w-5 h-5 text-teal-600" />
                <span className="text-xs text-slate-600">Offline</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Monitor className="w-5 h-5 text-teal-600" />
                <span className="text-xs text-slate-600">Homescreen</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button onClick={() => setShowDetails(!showDetails)} variant="outline" size="sm" className="flex-1 text-xs">
            {showDetails ? "Weniger" : "Mehr erfahren"}
          </Button>
          <Button onClick={onInstall} size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-xs">
            Installieren
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
