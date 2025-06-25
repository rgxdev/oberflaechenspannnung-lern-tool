"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  RotateCcw,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react"

import {
  FaAtom,
  FaFlask,
  FaMicroscope,
  FaGraduationCap,
  FaCertificate,
  FaCalculator,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa"
import { MdQuiz } from "react-icons/md"
import { GiMolecule, GiWaterDrop, GiChemicalDrop, GiTestTubes } from "react-icons/gi"
import { IoMdWater, IoMdDownload } from "react-icons/io"

const chapters = [
  {
    id: 1,
    title: "Einführung",
    subtitle: "Was ist Oberflächenspannung?",
    icon: GiWaterDrop,
    type: "intro",
  },
  {
    id: 2,
    title: "Experiment 1",
    subtitle: "Wie viel passt rein?",
    icon: FaFlask,
    type: "experiment",
    video: "/placeholder.mp4?height=720&width=1280",
  },
  {
    id: 3,
    title: "Experiment 2",
    subtitle: "Versiegeln mit Papier?",
    icon: GiTestTubes,
    type: "experiment",
    video: "/placeholder.mp4?height=720&width=1280",
  },
  {
    id: 4,
    title: "Experiment 3",
    subtitle: "Münzmagnet?",
    icon: FaFlask,
    type: "experiment",
    video: "/placeholder.mp4?height=720&width=1280",
  },
]

const dragDropItems = [
  { id: "kohäsion", text: "Kohäsion", description: "Wassermoleküle halten zusammen" },
  { id: "adhäsion", text: "Adhäsion", description: "Wasser haftet an anderen Stoffen" },
  { id: "oberflächenspannung", text: "Oberflächenspannung", description: "Wasseroberfläche verhält sich wie Haut" },
]

const dragDropTargets = [
  { id: "target1", text: "Münzen haften an feuchter Wand", correctAnswer: "adhäsion" },
  { id: "target2", text: "Wassertropfen bleibt rund", correctAnswer: "kohäsion" },
  { id: "target3", text: "Wasser wölbt sich über Glasrand", correctAnswer: "oberflächenspannung" },
]

function VideoPlayer({ src, title }: { src: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause()
      } else {
        videoRef.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef) {
      videoRef.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef) {
      setCurrentTime(videoRef.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef) {
      setDuration(videoRef.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef) {
      const newTime = (Number.parseFloat(e.target.value) / 100) * duration
      videoRef.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleFullscreen = () => {
    if (videoRef) {
      if (videoRef.requestFullscreen) {
        videoRef.requestFullscreen()
      }
    }
  }

  return (
    <Card className="bg-slate-900 text-white overflow-hidden">
      <CardContent className="p-0 relative group">
        <div className="aspect-video bg-slate-800 relative">
          <video
            ref={setVideoRef}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            poster="/placvid.png?height=720&width=1280"
          >
            <source src={src} type="video/mp4" />
            Ihr Browser unterstützt das Video-Element nicht.
          </video>

          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={togglePlay}
          >
            {!isPlaying && (
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Play className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20 p-2">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20 p-2">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-white/80">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-white/80">{formatTime(duration)}</span>
              </div>

              <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20 p-2">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-slate-300 text-sm">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SurfaceTensionLearning() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({})
  const [showQuizResult, setShowQuizResult] = useState<{ [key: number]: boolean }>({})
  const [dragDropAnswers, setDragDropAnswers] = useState<{ [key: string]: string }>({})
  const [dragDropCompleted, setDragDropCompleted] = useState(false)

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setShowInstallPrompt(false)
      }
      setDeferredPrompt(null)
    }
  }

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false)
    localStorage.setItem("installPromptDismissed", "true")
  }

  const progress = (currentChapter / chapters.length) * 100

  const handleQuizAnswer = (chapterId: number, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [chapterId]: answer }))
    setShowQuizResult((prev) => ({ ...prev, [chapterId]: true }))
  }

  const handleDragDropAnswer = (targetId: string, itemId: string) => {
    setDragDropAnswers((prev) => ({ ...prev, [targetId]: itemId }))
  }

  const checkDragDropAnswers = () => {
    setDragDropCompleted(true)
  }

  const resetDragDrop = () => {
    setDragDropAnswers({})
    setDragDropCompleted(false)
  }

  const nextChapter = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const currentChapterData = chapters.find((ch) => ch.id === currentChapter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Oberflächenspannung</h1>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">Interaktives Lernmodul</p>
            </div>
            <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 self-start sm:self-auto">
              Klasse 9 Gymnasium Bayern
            </Badge>
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-2">
              <span>Fortschritt</span>
              <span>
                {currentChapter} von {chapters.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {showInstallPrompt && !isInstalled && (
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IoMdDownload className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">App installieren</p>
                  <p className="text-xs sm:text-sm text-teal-100">
                    Installiere das Lernmodul für schnellen Zugriff ohne Browser
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="bg-white text-teal-600 hover:bg-teal-50 text-xs sm:text-sm"
                >
                  Installieren
                </Button>
                <Button
                  onClick={dismissInstallPrompt}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="xl:col-span-1 order-2 xl:order-1">
            <Card className="xl:sticky xl:top-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Kapitel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
                  {chapters.map((chapter) => {
                    const Icon = chapter.icon
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => {
                          setCurrentChapter(chapter.id)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg text-left transition-colors ${
                          currentChapter === chapter.id
                            ? "bg-teal-100 text-teal-800 border border-teal-200"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-medium text-xs sm:text-sm truncate">{chapter.title}</div>
                          <div className="text-xs opacity-75 truncate xl:whitespace-normal">{chapter.subtitle}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-3 order-1 xl:order-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  {currentChapterData && <currentChapterData.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />}
                  <div className="min-w-0">
                    <CardTitle className="text-lg sm:text-xl truncate">{currentChapterData?.title}</CardTitle>
                    <p className="text-teal-100 mt-1 text-sm truncate sm:whitespace-normal">
                      {currentChapterData?.subtitle}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 lg:p-8">
                {currentChapter === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GiMolecule className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-600" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                        Was ist Oberflächenspannung?
                      </h2>
                    </div>

                    <div className="prose prose-slate max-w-none">
                      <p className="text-base sm:text-lg leading-relaxed">
                        Die <strong>Oberflächenspannung</strong> entsteht durch <strong>Anziehungskräfte</strong>{" "}
                        zwischen den
                        <strong> Wassermolekülen</strong>. Diese Kräfte bewirken, dass sich die Wasseroberfläche wie
                        eine dünne, elastische Haut verhält.
                      </p>

                      <p className="text-sm sm:text-base leading-relaxed mt-4">
                        Wassermoleküle (H₂O) sind <strong>Dipole</strong> - sie haben eine positive und eine negative
                        Seite. Dadurch können sie <strong>Wasserstoffbrücken</strong> bilden, die für die hohe
                        Oberflächenspannung von Wasser verantwortlich sind.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <FaAtom className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-800 text-sm sm:text-base">Kohäsion</h3>
                          </div>
                          <p className="text-blue-700 text-sm sm:text-base">
                            <strong>Anziehungskräfte zwischen gleichen Teilchen</strong> (Wasser-Wasser). Diese Kräfte
                            halten die Wassermoleküle zusammen.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-teal-50 border-teal-200">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <GiChemicalDrop className="w-5 h-5 text-teal-600" />
                            <h3 className="font-semibold text-teal-800 text-sm sm:text-base">Adhäsion</h3>
                          </div>
                          <p className="text-teal-700 text-sm sm:text-base">
                            <strong>Anziehungskräfte zwischen verschiedenen Stoffen</strong> (z.B. Wasser-Glas).
                            Bestimmt, ob Wasser eine Oberfläche benetzt.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-slate-50 border-slate-200 mt-4 sm:mt-6">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-slate-800 text-base sm:text-lg">Wichtige Eigenschaften</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <FaAtom className="w-4 h-4 text-slate-600" />
                              <h4 className="font-semibold text-slate-800 text-sm sm:text-base">Wasserstoffbrücken</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600">
                              Schwache Bindungen zwischen H₂O-Molekülen durch ihre <strong>Polarität</strong>
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <IoMdWater className="w-4 h-4 text-slate-600" />
                              <h4 className="font-semibold text-slate-800 text-sm sm:text-base">Oberflächenspannung</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600">
                              Kraft pro Länge [N/m] - bei Wasser 0,0728 N/m bei 20°C
                            </p>
                          </div>
                          <div className="sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FaCalculator className="w-4 h-4 text-slate-600" />
                              <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
                                Temperaturabhängigkeit
                              </h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600">
                              Bei höherer Temperatur bewegen sich Moleküle schneller und schwächen die Wasserstoffbrücken → geringere Oberflächenspannung
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentChapter === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                        Experiment 1: Münzen im Reagenzglas
                      </h2>
                      <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
                        Ein <strong>Reagenzglas</strong> wird randvoll mit Wasser gefüllt. Dann werden vorsichtig
                        <strong> Münzen hineingelegt</strong>. Das Wasser steigt über den Rand, läuft aber nicht über!
                        Die <strong>Oberflächenspannung</strong> hält das Wasser wie eine Kuppel zusammen.
                      </p>
                    </div>

                    <VideoPlayer src={"./exp_1.mp4"} title="Video: Münzen im Reagenzglas" />

                    <Card className="bg-indigo-50 border-indigo-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <FaMicroscope className="w-5 h-5 text-indigo-600" />
                          <CardTitle className="text-indigo-800 text-base sm:text-lg">
                            Physikalische Erklärung
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-indigo-800 text-sm sm:text-base">Kräftegleichgewicht</h4>
                            <p className="text-indigo-700 text-xs sm:text-sm">
                              Die <strong>Oberflächenspannung</strong> erzeugt eine nach innen gerichtete Kraft, die das Wasser zusammenhält. Die{" "}
                              <strong>Gewichtskraft</strong> des zusätzlichen Wassers wirkt nach unten.
                              <br />
                              <strong>Solange die resultierende Oberflächenkraft die Gewichtskraft übersteigt → kein Überlaufen</strong>
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-indigo-800 text-sm sm:text-base">Meniskus</h4>
                            <p className="text-indigo-700 text-xs sm:text-sm">
                              Die <strong>gewölbte Wasseroberfläche</strong> nennt man Meniskus. Bei Wasser in Glas ist
                              er nach unten gewölbt (konkav), da die Adhäsion zwischen Wasser und Glas stärker ist als die Kohäsion.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-50 border-amber-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <MdQuiz className="w-5 h-5 text-amber-600" />
                          <CardTitle className="text-amber-800 text-base sm:text-lg">Verständnistest</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium mb-4 text-sm sm:text-base">
                          Warum läuft das Wasser nicht sofort über, wenn Münzen hinzugefügt werden?
                        </p>
                        <div className="space-y-2">
                          {[
                            { id: "A", text: "Das Wasser wird durch die Münzen komprimiert", correct: false },
                            { id: "B", text: "Die Oberflächenspannung hält das Wasser zusammen", correct: true },
                            { id: "C", text: "Die Münzen schwimmen auf dem Wasser", correct: false },
                          ].map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleQuizAnswer(2, option.id)}
                              className={`w-full text-left p-3 rounded-lg border transition-colors text-sm sm:text-base ${
                                quizAnswers[2] === option.id
                                  ? option.correct
                                    ? "bg-green-100 border-green-300 text-green-800"
                                    : "bg-red-100 border-red-300 text-red-800"
                                  : "bg-white border-slate-200 hover:bg-slate-50"
                              }`}
                            >
                              <span className="font-medium">{option.id})</span> {option.text}
                              {quizAnswers[2] === option.id && option.correct && (
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 float-right" />
                              )}
                            </button>
                          ))}
                        </div>
                        {showQuizResult[2] && quizAnswers[2] === "B" && (
                          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                            <p className="text-green-800 font-medium text-sm sm:text-base">Richtig! 🎉</p>
                            <p className="text-green-700 text-xs sm:text-sm mt-1">
                              Die <strong>Oberflächenspannung</strong> entsteht durch Anziehungskräfte zwischen den
                              Wassermolekülen und wirkt wie eine elastische Haut.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentChapter === 3 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                        Experiment 2: Das Papiertuch-Experiment
                      </h2>
                      <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
                        Ein vollständig gefülltes Reagenzglas wird mit einem <strong>Papiertuch</strong> abgedeckt und
                        vorsichtig umgedreht. Das Wasser läuft nicht heraus! Dies funktioniert durch das Zusammenspiel
                        von <strong>Oberflächenspannung</strong>, <strong>Adhäsion</strong> und
                        <strong>Luftdruck</strong>.
                      </p>
                    </div>

                    <VideoPlayer src={"./exp_2.mp4"} title="Video: Das Papiertuch-Experiment" />

                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-blue-800 text-base sm:text-lg">Warum funktioniert das?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-blue-800 text-sm sm:text-base">1. Adhäsion</h4>
                            <p className="text-blue-700 text-xs sm:text-sm">
                              Das Wasser <strong>haftet am Papiertuch</strong>. Die Wassermoleküle bilden
                              Wasserstoffbrücken mit den Fasern des Papiers.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800 text-sm sm:text-base">2. Oberflächenspannung</h4>
                            <p className="text-blue-700 text-xs sm:text-sm">
                              Die <strong>Anziehungskräfte zwischen den Wassermolekülen</strong> halten die Flüssigkeit
                              zusammen.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800 text-sm sm:text-base">3. Luftdruck</h4>
                            <p className="text-blue-700 text-xs sm:text-sm">
                              Der <strong>äußere Luftdruck</strong> (1013,25 hPa auf Meereshöhe) drückt von unten gegen das
                              Papiertuch und unterstützt den Effekt.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50 border-slate-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-slate-800 text-base sm:text-lg">Wichtige Formeln</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-xs sm:text-sm">
                          <div>
                            <strong>Druck:</strong> p = F/A (Kraft pro Fläche) [Pa = N/m²]
                          </div>
                          <div>
                            <strong>Gewichtskraft:</strong> F<sub>G</sub> = m × g (Masse × Erdbeschleunigung, g ≈ 9,81 m/s²) [N]
                          </div>
                          <div>
                            <strong>Dichte:</strong> ρ = m/V (Masse pro Volumen) [kg/m³]
                          </div>
                          <div>
                            <strong>Oberflächenspannung:</strong> σ = F/L (Kraft pro Länge) [N/m]
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentChapter === 4 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                        Experiment 3: Haftende Münzen
                      </h2>
                      <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
                        Nach dem Experiment bleiben viele <strong>Münzen an den feuchten Wänden</strong> des Behälters
                        haften. Dies zeigt die Wirkung von <strong>Adhäsionskräften</strong> zwischen Wasser und Metall
                        sowie die <strong>Oberflächenspannung</strong> dünner Wasserfilme.
                      </p>
                    </div>

                    {/* Video Player */}
                    <VideoPlayer src={"./exp_3.mp4"} title="Video: Haftende Münzen" />

                    {/* Scientific Analysis */}
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-green-800 text-base sm:text-lg">Warum haften die Münzen?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Wasserfilm</h4>
                            <ul className="text-xs sm:text-sm text-green-700 space-y-1">
                              <li>
                                • Dünner <strong>Wasserfilm</strong> zwischen Münze und Wand
                              </li>
                              <li>
                                • <strong>Adhäsion</strong> hält Wasser an beiden Oberflächen
                              </li>
                              <li>
                                • <strong>Oberflächenspannung</strong> verstärkt den Effekt
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Kräfte</h4>
                            <ul className="text-xs sm:text-sm text-green-700 space-y-1">
                              <li>
                                • <strong>Adhäsionskraft</strong> wirkt nach oben
                              </li>
                              <li>
                                • <strong>Gewichtskraft</strong> der Münze wirkt nach unten
                              </li>
                              <li>• Bei dünnen Filmen: Adhäsion {">"} Gewicht</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Interactive Drag and Drop Quiz */}
                    <Card className="bg-purple-50 border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-purple-800 text-base sm:text-lg flex items-center gap-2">
                          Zuordnungsaufgabe
                          <Button variant="outline" size="sm" onClick={resetDragDrop} className="ml-auto">
                            <RotateCcw className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">Zurücksetzen</span>
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm sm:text-base">Ordne die Begriffe den passenden Phänomenen zu:</p>

                        {/* Drag Items */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-purple-800 mb-3 text-sm sm:text-base">Begriffe:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            {dragDropItems.map((item) => (
                              <div
                                key={item.id}
                                className={`p-3 rounded-lg border-2 border-dashed text-center cursor-pointer transition-colors ${
                                  Object.values(dragDropAnswers).includes(item.id)
                                    ? "bg-gray-100 border-gray-300 text-gray-500"
                                    : "bg-white border-purple-300 text-purple-800 hover:bg-purple-50"
                                }`}
                              >
                                <h5 className="font-semibold text-xs sm:text-sm">{item.text}</h5>
                                <p className="text-xs text-purple-600 mt-1">{item.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Drop Targets */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-purple-800 mb-3 text-sm sm:text-base">Phänomene:</h4>
                          <div className="space-y-3">
                            {dragDropTargets.map((target) => (
                              <div
                                key={target.id}
                                className="p-4 rounded-lg border-2 border-dashed border-slate-300 bg-white min-h-[60px] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                              >
                                <span className="text-slate-700 text-sm sm:text-base">{target.text}</span>
                                <div className="flex flex-wrap gap-2">
                                  {dragDropItems.map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => handleDragDropAnswer(target.id, item.id)}
                                      disabled={
                                        Object.values(dragDropAnswers).includes(item.id) &&
                                        dragDropAnswers[target.id] !== item.id
                                      }
                                      className={`px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                                        dragDropAnswers[target.id] === item.id
                                          ? dragDropCompleted
                                            ? target.correctAnswer === item.id
                                              ? "bg-green-100 text-green-800 border border-green-300"
                                              : "bg-red-100 text-red-800 border border-red-300"
                                            : "bg-purple-100 text-purple-800 border border-purple-300"
                                          : Object.values(dragDropAnswers).includes(item.id)
                                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
                                      }`}
                                    >
                                      {item.text}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Check Button */}
                        {Object.keys(dragDropAnswers).length === dragDropTargets.length && !dragDropCompleted && (
                          <Button onClick={checkDragDropAnswers} className="w-full bg-purple-600 hover:bg-purple-700">
                            Antworten überprüfen
                          </Button>
                        )}

                        {/* Results */}
                        {dragDropCompleted && (
                          <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                            <h5 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Auflösung:</h5>
                            <div className="space-y-2 text-xs sm:text-sm">
                              <p>
                                <strong>Münzen haften an feuchter Wand:</strong> Adhäsion (Wasser haftet an Metall)
                              </p>
                              <p>
                                <strong>Wassertropfen bleibt rund:</strong> Kohäsion (Wassermoleküle halten zusammen)
                              </p>
                              <p>
                                <strong>Wasser wölbt sich über Glasrand:</strong> Oberflächenspannung (elastische
                                "Haut")
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Completion */}
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 text-center">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex justify-center items-center gap-3 mb-4">
                          <FaGraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
                          <FaCertificate className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Herzlichen Glückwunsch!</h3>
                        <p className="text-slate-700 mb-4 text-sm sm:text-base">
                          Du hast die <strong>Grundlagen der Oberflächenspannung</strong> erfolgreich gelernt:
                        </p>
                        <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                          <p className="flex items-center justify-center gap-2">
                            <FaAtom className="w-4 h-4 text-green-600" />
                            <strong>Wasserstoffbrücken</strong> zwischen H₂O-Molekülen
                          </p>
                          <p className="flex items-center justify-center gap-2">
                            <GiMolecule className="w-4 h-4 text-blue-600" />
                            <strong>Kohäsion und Adhäsion</strong> verstehen
                          </p>
                          <p className="flex items-center justify-center gap-2">
                            <FaFlask className="w-4 h-4 text-purple-600" />
                            <strong>Oberflächenspannung</strong> in Experimenten beobachten
                          </p>
                          <p className="flex items-center justify-center gap-2">
                            <FaLightbulb className="w-4 h-4 text-yellow-600" />
                            <strong>Alltagsphänomene</strong> physikalisch erklären
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
              <Button
                variant="outline"
                onClick={prevChapter}
                disabled={currentChapter === 1}
                className="bg-white order-2 sm:order-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>

              <Button
                onClick={nextChapter}
                disabled={currentChapter === chapters.length}
                className="bg-teal-600 hover:bg-teal-700 order-1 sm:order-2"
              >
                Weiter
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 text-sm flex items-center justify-center gap-2">
              Made with <FaHeart className="w-4 h-4 text-red-500" /> by{" "}
              <a
                href="https://d-aaron.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                Aaron
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
