import { describe, expect, it } from 'vitest'
import { cn } from '../utils'

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle conditional classes', () => {
      expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar')
    })

    it('should handle conflicting Tailwind classes', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('should merge with custom classes', () => {
      expect(cn('foo', 'bar', 'foo:custom')).toBe('foo bar foo:custom')
    })
  })
})