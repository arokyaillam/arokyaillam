"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"

const locales = [
  { code: "en", name: "English" },
  { code: "ta", name: "தமிழ்" },
]

export function LocaleSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // Extract current locale from pathname
  const currentLocale = pathname.startsWith('/ta') ? 'ta' : 'en'

  const switchLocale = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      const newPath = `/${newLocale}${pathname.startsWith(`/${currentLocale}`) ? pathname.replace(`/${currentLocale}`, '') : pathname}`
      router.push(newPath)
    }
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selection">
      <Languages className="h-4 w-4" aria-hidden="true" />
      {locales.map((loc) => (
        <Button
          key={loc.code}
          variant={currentLocale === loc.code ? "default" : "ghost"}
          size="sm"
          onClick={() => switchLocale(loc.code)}
          className="h-8 px-2 text-xs"
          aria-label={`Switch to ${loc.name}`}
          aria-pressed={currentLocale === loc.code}
          title={`Switch to ${loc.name}`}
        >
          {loc.name}
        </Button>
      ))}
    </div>
  )
}