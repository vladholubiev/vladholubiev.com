"use client"

import type React from "react"
import { useState } from "react"
import { Hash, Check } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  id?: string
  className?: string
}

export function Heading({ level, children, id, className = "" }: HeadingProps) {
  const [showIndicator, setShowIndicator] = useState(false)
  const [copied, setCopied] = useState(false)

  // Generate ID from children if not provided
  const headingId =
    id ||
    (typeof children === "string"
      ? children
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "")
      : "")

  const handleAnchorClick = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${headingId}`

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)

      // Also scroll to the heading
      document.getElementById(headingId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Update URL without triggering navigation
      window.history.replaceState(null, "", `#${headingId}`)

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      window.location.hash = `#${headingId}`
    }
  }

  const baseClasses = "group scroll-mt-20"

  const levelStyles = {
    1: "text-4xl md:text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6 md:mb-8",
    2: "text-3xl md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-5 md:mb-6 mt-12 md:mt-16",
    3: "text-2xl md:text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4 md:mb-5 mt-10 md:mt-12",
    4: "text-xl md:text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 mb-3 md:mb-4 mt-8 md:mt-10",
    5: "text-lg md:text-xl font-medium tracking-tight text-zinc-800 dark:text-zinc-100 mb-2 md:mb-3 mt-6 md:mt-8",
    6: "text-base md:text-lg font-medium tracking-tight text-zinc-800 dark:text-zinc-100 mb-2 mt-4 md:mt-6",
  }

  const iconSizes = {
    1: "w-[0.8em] h-[0.8em]",
    2: "w-[0.8em] h-[0.8em]",
    3: "w-[0.8em] h-[0.8em]",
    4: "w-[0.8em] h-[0.8em]",
    5: "w-[0.8em] h-[0.8em]",
    6: "w-[0.8em] h-[0.8em]",
  }

  const Tag: keyof JSX.IntrinsicElements = `h${level}`

  return (
    <Tag
      id={headingId}
      className={`${baseClasses} ${levelStyles[level]} ${className} relative`}
      onMouseEnter={() => setShowIndicator(true)}
      onMouseLeave={() => setShowIndicator(false)}
    >
      <button
        onClick={handleAnchorClick}
        className={`
        absolute -left-[1.2em] top-0 bottom-0
        flex items-center justify-center
        text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-400
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:rounded-md
        hidden md:flex
        ${showIndicator ? "opacity-100" : "opacity-0"}
      `}
        aria-label={`Copy link to ${children}`}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? <Check className={`${iconSizes[level]} text-green-600`} /> : <Hash className={iconSizes[level]} />}
      </button>
      {children}
    </Tag>
  )
}