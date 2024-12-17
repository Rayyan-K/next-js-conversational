'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Clock, Mic } from 'lucide-react'
import Image from 'next/image'

const TOTAL_TIME = 15 * 60 // 15 minutes in seconds

export default function TestInterface() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [isTestActive, setIsTestActive] = useState(false)
  const [speakingTurn, setSpeakingTurn] = useState<'teacher' | 'student'>('teacher')

  useEffect(() => {
    let interval: NodeJS.Timeout
    let speakingInterval: NodeJS.Timeout

    if (isTestActive) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsTestActive(false)
            clearInterval(interval)
            return 0
          }
          return time - 1
        })
      }, 1000)

      speakingInterval = setInterval(() => {
        setSpeakingTurn((turn) => (turn === 'teacher' ? 'student' : 'teacher'))
      }, 5000) // Change turn every 5 seconds
    }

    return () => {
      clearInterval(interval)
      clearInterval(speakingInterval)
    }
  }, [isTestActive])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStartTest = () => {
    setIsTestActive(true)
    setSpeakingTurn('teacher')
  }

  const handleEndTest = () => {
    setIsTestActive(false)
    setSpeakingTurn('teacher')
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Image src="/LogoKhalilpre.svg" alt="Logo" width={150} height={46} />
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Clock className="h-6 w-6 text-gray-400" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <Button variant="outline" size="sm" className="w-32 h-12">
            خروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Tips Section */}
          <div className="flex-1 p-6">
            <h2 className="mb-4 text-lg font-semibold">نصائح</h2>
            <ul className="space-y-3 text-[#1f1106]">
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                  1
                </span>
                تحدث بثقة وبشكل طبيعي.
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                  2
                </span>
                نظم أفكارك باستخدام عبارات انتقالية.
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                  3
                </span>
                استخدم كلمات مناسبة ومتنوعة.
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                  4
                </span>
                التزم بالقواعد النحوية الصحيحة.
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                  5
                </span>
                انطق الكلمات بوضوح وتنغيم سليم.
              </li>
            </ul>
          </div>

          {/* Test Elements Section */}
          <div className="flex flex-1 flex-col items-center justify-center space-y-6">
            {/* Audio Visualization Circle */}
            <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-white shadow-md overflow-hidden">
              <div
                className={`absolute inset-0 rounded-full ${
                  isTestActive ? 'animate-pulse' : ''
                }`}
                style={{
                  backgroundColor: isTestActive
                    ? (speakingTurn === 'teacher' ? '#B08D57' : '#4CAF50')
                    : 'white',
                  transition: 'background-color 0.5s ease-in-out',
                }}
              ></div>
              {isTestActive ? (
                <div className="z-10 flex flex-col items-center text-white">
                  <span className="text-2xl font-bold">
                    {speakingTurn === 'teacher' ? 'المدرس يتحدث' : 'دورك للإجابة'}
                  </span>
                  <span className="mt-2 text-sm font-normal">
                    {speakingTurn === 'teacher' ? 'يرجى عدم مقاطعة الحديث' : 'تحدث بوضوح'}
                  </span>
                </div>
              ) : (
                <Mic className="h-24 w-24 text-[#1f1106] z-10" />
              )}
            </div>

            <Button
              className="h-16 w-48 text-xl"
              style={{ backgroundColor: isTestActive ? '#1f1106' : '#e02c1f', color: 'white' }}
              onClick={isTestActive ? handleEndTest : handleStartTest}
            >
              {isTestActive ? 'إنهاء الاختبار' : 'بدء الاختبار'}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-end">
          <Button variant="secondary" className="w-32 h-12 bg-[#A69B8D] text-white hover:bg-[#8B7355]">
            التالي
          </Button>
        </div>
      </footer>
    </div>
  )
}

