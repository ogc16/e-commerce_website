"use client"

import { useState } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width = 500,
  height = 500,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  const [isError, setIsError] = useState(false)

  // Fallback to placeholder if image fails to load
  const handleError = () => {
    setIsError(true)
  }

  return (
    <Image
      src={isError ? `/placeholder.svg?height=${height}&width=${width}` : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
      quality={90}
    />
  )
}

