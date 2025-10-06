"use client"

import * as React from "react"
import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navigation } from "./navigation"
import { ThemeToggle } from "./theme-toggle"
import { LocaleSwitcher } from "./locale-switcher"

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
          aria-label="AROKYA ILLAM CHARITABLE TRUST - Home"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center" aria-hidden="true">
            <span className="text-primary-foreground font-bold text-sm">AICT</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg">AROKYA ILLAM</h1>
            <p className="text-xs text-muted-foreground">CHARITABLE TRUST</p>
          </div>
        </Link>

        {/* Desktop Navigation & Controls */}
        <div className="hidden md:flex items-center space-x-6">
          <Navigation />
          <div className="flex items-center space-x-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/donate">
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/donate">
              <Heart className="w-4 h-4 mr-1" />
              Donate
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}