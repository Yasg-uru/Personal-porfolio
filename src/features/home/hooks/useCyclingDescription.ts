import { useEffect, useState } from "react"

export const useCyclingDescription = (descriptions: readonly string[], intervalMs = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!descriptions.length) return

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % descriptions.length)
    }, intervalMs)

    return () => window.clearInterval(interval)
  }, [descriptions, intervalMs])

  return descriptions[currentIndex] ?? ""
}
