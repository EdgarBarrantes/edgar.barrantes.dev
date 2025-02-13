import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import type { BackgroundType } from '../BackgroundSwitcher'
import { twMerge } from 'tailwind-merge'

const mobileCompatibleEffects: BackgroundType[] = ['none', 'subtle', 'psychedelic', 'kaleidoscope', 'wormhole', 'calming']

interface AnimatedBackgroundProps {
  type: BackgroundType
}

export function AnimatedBackground({ type }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const timeRef = useRef(0)
  const touchesRef = useRef<{ x: number; y: number; life: number }[]>([])
  const animationFrameIdRef = useRef<number>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const gameRef = useRef<any>(null) // Store game instance
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 })
  const [showKeyboard, setShowKeyboard] = useState(false)
  const lastTouchRef = useRef({ x: 0, y: 0, time: 0 })

  // Handle mounting and mobile detection
  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cleanup function to reset canvas and stop animation
  const cleanup = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current)
    }
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    timeRef.current = 0
    mouseRef.current = { x: 0, y: 0 }
    scrollRef.current = 0
    touchesRef.current = []
  }

  // Handle keyboard input for hangman
  useEffect(() => {
    if (type === 'hangman' && isMobile) {
      // Create a permanent invisible input for keyboard interaction
      const input = document.createElement('input')
      input.style.position = 'fixed'
      input.style.opacity = '0'
      input.style.pointerEvents = 'none'
      input.style.top = '50%'
      input.style.left = '50%'
      input.style.transform = 'translate(-50%, -50%)'
      input.style.width = '1px'
      input.style.height = '1px'
      input.style.padding = '0'
      input.style.border = 'none'
      input.style.outline = 'none'
      input.style.backgroundColor = 'transparent'
      input.setAttribute('autocomplete', 'off')
      input.setAttribute('autocorrect', 'off')
      input.setAttribute('autocapitalize', 'off')
      input.setAttribute('spellcheck', 'false')
      
      // Handle input changes
      const handleInput = (e: Event) => {
        const inputElement = e.target as HTMLInputElement
        const letter = inputElement.value.slice(-1).toUpperCase()
        if (gameRef.current && /^[A-Z]$/.test(letter)) {
          gameRef.current.handleKeyPress(letter)
        }
        inputElement.value = '' // Clear input after processing
      }
      
      input.addEventListener('input', handleInput)
      document.body.appendChild(input)
      inputRef.current = input

      // Focus input initially
      input.focus()

      return () => {
        input.removeEventListener('input', handleInput)
        if (inputRef.current) {
          document.body.removeChild(inputRef.current)
          inputRef.current = null
        }
      }
    }
  }, [type, isMobile])

  // Reset and reinitialize when effect changes
  useEffect(() => {
    cleanup()
  }, [type])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !mounted) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Only proceed with animation setup if type is not 'none'
    if (type === 'none') {
      cleanup()
      return
    }

    // Reset canvas size
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Handle scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY
      if (isMobile && mobileCompatibleEffects.includes(type)) {
        // Update target position based on last touch
        mouseRef.current.x = lastTouchRef.current.x
        mouseRef.current.y = lastTouchRef.current.y + scrollRef.current
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      setTouchPos({ x, y })
      lastTouchRef.current = { x, y, time: Date.now() }
      mouseRef.current.x = x
      mouseRef.current.y = y
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      setTouchPos({ x, y })
      lastTouchRef.current = { x, y, time: Date.now() }
      mouseRef.current.x = x
      mouseRef.current.y = y
    }

    const handleTouchEnd = () => {
      setTimeout(() => {
        if (Date.now() - lastTouchRef.current.time > 100) {
          setTouchPos({ x: 0, y: 0 })
        }
      }, 100)
    }

    // Mouse move handler with smoothing
    const targetMouse = { x: canvas.width / 2, y: canvas.height / 2 }
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX
      targetMouse.y = e.clientY
    }

    // Animation handlers for different types
    const animations = {
      hexagons: () => {
        class Point {
          x: number = 0
          y: number = 0
          baseX: number = 0
          baseY: number = 0
          size: number = 0
          angle: number = 0
          
          constructor(x: number, y: number) {
            this.x = x
            this.y = y
            this.baseX = x
            this.baseY = y
            this.size = 1.5
            this.angle = Math.random() * Math.PI * 2
          }

          update() {
            if (!canvas) return
            const time = timeRef.current * 0.001
            const scrollOffset = scrollRef.current * 0.1

            const waveX = Math.sin(time + this.baseX * 0.02) * 5
            const waveY = Math.cos(time + this.baseY * 0.02) * 5

            const dx = targetMouse.x - (this.baseX + waveX)
            const dy = targetMouse.y - scrollOffset - (this.baseY + waveY)
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150
            
            if (distance < maxDistance) {
              const force = (1 - (distance / maxDistance)) * 0.3
              const angle = Math.atan2(dy, dx)
              const pushX = Math.cos(angle) * force * maxDistance
              const pushY = Math.sin(angle) * force * maxDistance
              
              this.x = this.baseX + waveX + pushX
              this.y = this.baseY + waveY + pushY + scrollOffset * 0.1
              this.angle += force * 0.1
            } else {
              this.x = this.baseX + waveX
              this.y = this.baseY + waveY + scrollOffset * 0.1
              this.angle += 0.002
            }

            this.size = 1.5 + Math.sin(time * 2 + this.baseX * 0.05) * 0.5
          }

          draw(ctx: CanvasRenderingContext2D) {
            if (!canvas) return
            const isDark = resolvedTheme === 'dark'
            
            const dx = targetMouse.x - this.x
            const dy = (targetMouse.y - scrollRef.current) - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150
            const baseOpacity = isDark ? 0.25 : 0.15
            const extraOpacity = Math.max(0, 0.4 * (1 - distance / maxDistance))
            
            const sides = 6
            const opacity = baseOpacity + extraOpacity
            
            ctx.fillStyle = isDark 
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`
            
            ctx.beginPath()
            for (let i = 0; i < sides; i++) {
              const segmentAngle = (i * 2 * Math.PI / sides) + this.angle
              const pointX = this.x + Math.cos(segmentAngle) * this.size
              const pointY = this.y + Math.sin(segmentAngle) * this.size
              if (i === 0) {
                ctx.moveTo(pointX, pointY)
              } else {
                ctx.lineTo(pointX, pointY)
              }
            }
            ctx.closePath()
            ctx.fill()
          }
        }

        const points: Point[] = []
        const spacing = 35
        const hexHeight = spacing * Math.sqrt(3) / 2
        const margin = spacing / 2
        
        for (let y = margin; y < canvas.height * 2; y += hexHeight) {
          const isOddRow = Math.floor(y / hexHeight) % 2 === 1
          const xOffset = isOddRow ? spacing / 2 : 0
          
          for (let x = margin - xOffset; x < canvas.width + spacing; x += spacing) {
            points.push(new Point(x, y))
          }
        }

        return {
          points,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            points.forEach(point => {
              point.update()
              point.draw(ctx)
            })
          }
        }
      },
      grid: () => {
        class GridPoint {
          x: number = 0
          y: number = 0
          baseX: number = 0
          baseY: number = 0
          size: number = 0
          
          constructor(x: number, y: number) {
            this.x = x
            this.y = y
            this.baseX = x
            this.baseY = y
            this.size = 1
          }

          update() {
            if (!canvas) return
            const scrollOffset = scrollRef.current * 0.1
            const dx = targetMouse.x - this.baseX
            const dy = (targetMouse.y - scrollOffset) - this.baseY
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 0.5
              this.x = this.baseX + dx * force
              this.y = this.baseY + dy * force + scrollOffset
              this.size = 2
            } else {
              this.x += (this.baseX - this.x) * 0.1
              this.y += (this.baseY + scrollOffset - this.y) * 0.1
              this.size += (1 - this.size) * 0.1
            }
          }

          draw(ctx: CanvasRenderingContext2D) {
            if (!canvas) return
            const isDark = resolvedTheme === 'dark'
            
            const dx = targetMouse.x - this.x
            const dy = (targetMouse.y - scrollRef.current) - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150
            const opacity = isDark
              ? 0.3 - (distance / maxDistance) * 0.2
              : 0.2 - (distance / maxDistance) * 0.15

            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`
            
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        const points: GridPoint[] = []
        const spacing = 30
        
        for (let y = 0; y < canvas.height * 2; y += spacing) {
          for (let x = 0; x < canvas.width + spacing; x += spacing) {
            points.push(new GridPoint(x, y))
          }
        }

        return {
          points,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            points.forEach(point => {
              point.update()
              point.draw(ctx)
            })
          }
        }
      },
      sparkles: () => {
        class Sparkle {
          x: number = 0
          y: number = 0
          size: number = 0
          angle: number = 0
          speed: number = 0
          
          constructor() {
            this.reset()
          }

          reset() {
            if (!canvas) return
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height * 2
            this.size = Math.random() * 2 + 0.5
            this.angle = Math.random() * Math.PI * 2
            this.speed = Math.random() * 0.02 + 0.01
          }

          update() {
            if (!canvas) return
            const scrollOffset = scrollRef.current * 0.1
            this.angle += this.speed
            this.y += scrollOffset * 0.01
            
            const dx = targetMouse.x - this.x
            const dy = (targetMouse.y - scrollOffset) - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 200

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 0.2
              this.x += dx * force
              this.y += dy * force
              this.size = 2
            } else {
              this.size += (0.5 - this.size) * 0.1
            }

            // Reset if out of view
            if (this.y > canvas.height * 2) {
              this.y = 0
            }
          }

          draw(ctx: CanvasRenderingContext2D) {
            if (!canvas) return
            const isDark = resolvedTheme === 'dark'
            const time = timeRef.current * 0.001
            const flicker = 0.7 + Math.sin(time * 3 + this.x * 0.01) * 0.3

            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle)

            const opacity = isDark ? 0.4 * flicker : 0.3 * flicker
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`

            // Draw star shape
            ctx.beginPath()
            for (let i = 0; i < 4; i++) {
              const angle = (i * Math.PI) / 2
              ctx.moveTo(0, 0)
              ctx.lineTo(Math.cos(angle) * this.size * 3, Math.sin(angle) * this.size * 3)
            }
            ctx.stroke()
            
            ctx.beginPath()
            ctx.arc(0, 0, this.size, 0, Math.PI * 2)
            ctx.fill()
            
            ctx.restore()
          }
        }

        const sparkles = Array.from({ length: 50 }, () => new Sparkle())

        return {
          points: sparkles,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            sparkles.forEach(sparkle => {
              sparkle.update()
              sparkle.draw(ctx)
            })
          }
        }
      },
      vortex: () => {
        class VortexRing {
          x: number = 0
          y: number = 0
          radius: number = 0
          angle: number = 0
          speed: number = 0
          hue: number = 0
          saturation: number = 70
          lightness: number = 50

          constructor() {
            this.reset()
          }

          reset() {
            if (!canvas || !ctx) return
            this.x = canvas.width / 2
            this.y = canvas.height / 2
            this.radius = Math.random() * 100 + 50
            this.angle = Math.random() * Math.PI * 2
            this.speed = (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1)
            this.hue = Math.random() * 360
            this.saturation = 70
            this.lightness = 50
          }

          update() {
            if (!canvas) return
            const time = timeRef.current * 0.001
            const scrollOffset = scrollRef.current * 0.1
            
            // Mouse interaction
            const dx = targetMouse.x - this.x
            const dy = (targetMouse.y - scrollOffset) - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 200

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 0.1
              this.x += dx * force
              this.y += dy * force
              this.speed += force * 0.01 * (Math.random() < 0.5 ? 1 : -1)
            } else {
              // Return to center
              this.x += (canvas.width / 2 - this.x) * 0.02
              this.y += (canvas.height / 2 - this.y) * 0.02
            }

            // Rotate and pulse
            this.angle += this.speed
            this.radius += Math.sin(time + this.angle) * 2
            this.hue += 0.5
            this.saturation = 70 + Math.sin(time * 2) * 20
            this.lightness = 50 + Math.cos(time * 1.5) * 20

            // Scroll effect
            this.y += scrollOffset * 0.02
          }

          draw(ctx: CanvasRenderingContext2D) {
            if (!canvas) return
            const points = 50
            const innerRadius = this.radius * 0.8

            ctx.strokeStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
            ctx.lineWidth = 2
            ctx.beginPath()

            for (let i = 0; i <= points; i++) {
              const pointAngle = (i / points) * Math.PI * 2 + this.angle
              const radiusOffset = Math.sin(pointAngle * 3) * 20
              const currentRadius = this.radius + radiusOffset
              const x = this.x + Math.cos(pointAngle) * currentRadius
              const y = this.y + Math.sin(pointAngle) * currentRadius
              
              if (i === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }

            ctx.closePath()
            ctx.stroke()
          }
        }

        const rings = Array.from({ length: 5 }, () => new VortexRing())

        return {
          points: rings,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            rings.forEach(ring => {
              ring.update()
              ring.draw(ctx)
            })
          }
        }
      },
      neural: () => {
        class Neuron {
          x: number
          y: number
          connections: Neuron[] = []
          pulseTime: number = Math.random() * 1000
          active: boolean = false
          activationStrength: number = 0

          constructor(x: number, y: number) {
            this.x = x
            this.y = y
          }

          connectTo(other: Neuron) {
            if (!this.connections.includes(other)) {
              this.connections.push(other)
            }
          }

          update() {
            if (!canvas) return
            const time = timeRef.current * 0.001
            const scrollOffset = scrollRef.current * 0.1

            // Mouse interaction
            const dx = targetMouse.x - this.x
            const dy = (targetMouse.y - scrollOffset) - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150

            if (distance < maxDistance) {
              this.active = true
              this.activationStrength = 1 - distance / maxDistance
            } else {
              this.active = Math.sin(time + this.pulseTime) > 0.97
              this.activationStrength = this.active ? 0.5 : 0
            }

            // Scroll effect
            this.y += scrollOffset * 0.02
            if (this.y > canvas.height + 100) this.y = -100
            if (this.y < -100) this.y = canvas.height + 100
          }

          draw(ctx: CanvasRenderingContext2D) {
            if (!canvas) return
            const isDark = resolvedTheme === 'dark'

            // Draw connections
            this.connections.forEach(other => {
              const dx = other.x - this.x
              const dy = other.y - this.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < 200) {
                const strength = (this.activationStrength + other.activationStrength) * 0.5
                const alpha = strength * (1 - distance / 200) * 0.5

                ctx.strokeStyle = isDark
                  ? `rgba(255, 255, 255, ${alpha})`
                  : `rgba(0, 0, 0, ${alpha})`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(other.x, other.y)
                ctx.stroke()
              }
            })

            // Draw neuron
            const glowSize = 2 + this.activationStrength * 3
            const alpha = 0.3 + this.activationStrength * 0.7

            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(0, 0, 0, ${alpha})`
            ctx.beginPath()
            ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Create neurons grid
        const neurons: Neuron[] = []
        const spacing = 80
        const cols = Math.ceil(canvas.width / spacing)
        const rows = Math.ceil((canvas.height * 1.5) / spacing)

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const neuron = new Neuron(
              x * spacing + (Math.random() * spacing * 0.5),
              y * spacing + (Math.random() * spacing * 0.5)
            )
            neurons.push(neuron)
          }
        }

        // Connect nearby neurons
        neurons.forEach(neuron => {
          neurons.forEach(other => {
            if (neuron !== other) {
              const dx = other.x - neuron.x
              const dy = other.y - neuron.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              if (distance < spacing * 1.5) {
                neuron.connectTo(other)
              }
            }
          })
        })

        return {
          points: neurons,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.2)'
              : 'rgba(255, 255, 255, 0.2)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            neurons.forEach(neuron => {
              neuron.update()
              neuron.draw(ctx)
            })
          }
        }
      },
      kaleidoscope: () => {
        class KaleidoscopePoint {
          x: number = 0
          y: number = 0
          vx: number = 0
          vy: number = 0
          size: number = 0
          color: string = ''
          segments: number = 0

          constructor() {
            this.reset()
          }

          reset() {
            if (!canvas || !ctx) return
            const angle = Math.random() * Math.PI * 2
            const distance = Math.random() * 100 + 50
            this.x = canvas.width / 2 + Math.cos(angle) * distance
            this.y = canvas.height / 2 + Math.sin(angle) * distance
            this.vx = (Math.random() - 0.5) * 2
            this.vy = (Math.random() - 0.5) * 2
            this.size = Math.random() * 20 + 10
            this.color = `hsl(${Math.random() * 360}, 70%, 50%)`
            this.segments = Math.floor(Math.random() * 4) + 4
          }

          update() {
            if (!canvas) return
            const time = timeRef.current * 0.001
            const scrollOffset = scrollRef.current * 0.1

            // Mouse interaction
            const dx = targetMouse.x - this.x
            const dy = (targetMouse.y - scrollOffset) - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 200

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 0.1
              this.vx += dx * force * 0.1
              this.vy += dy * force * 0.1
            }

            // Update position
            this.x += this.vx
            this.y += this.vy + scrollOffset * 0.02

            // Bounce off edges with some randomness
            if (this.x < 0 || this.x > canvas.width) {
              this.vx *= -0.8
              this.vx += (Math.random() - 0.5) * 0.5
            }
            if (this.y < 0 || this.y > canvas.height) {
              this.vy *= -0.8
              this.vy += (Math.random() - 0.5) * 0.5
            }

            // Add some chaos
            this.vx += Math.sin(time * 2 + this.y * 0.1) * 0.1
            this.vy += Math.cos(time * 2 + this.x * 0.1) * 0.1

            // Dampen velocity
            this.vx *= 0.99
            this.vy *= 0.99

            // Reset if too fast
            if (Math.abs(this.vx) > 10 || Math.abs(this.vy) > 10) {
              this.reset()
            }
          }

          draw(ctx: CanvasRenderingContext2D) {
            if (!canvas) return
            const time = timeRef.current * 0.001
            
            // Draw multiple reflections
            for (let i = 0; i < this.segments; i++) {
              const angle = (i / this.segments) * Math.PI * 2 + time * 0.5
              const x = canvas.width / 2 + (this.x - canvas.width / 2) * Math.cos(angle) - (this.y - canvas.height / 2) * Math.sin(angle)
              const y = canvas.height / 2 + (this.x - canvas.width / 2) * Math.sin(angle) + (this.y - canvas.height / 2) * Math.cos(angle)

              ctx.save()
              ctx.translate(x, y)
              ctx.rotate(angle + time)

              // Draw a geometric shape
              ctx.fillStyle = this.color
              ctx.globalAlpha = 0.3
              ctx.beginPath()
              for (let j = 0; j < 5; j++) {
                const pointAngle = (j / 5) * Math.PI * 2
                const radius = this.size * (1 + Math.sin(time * 3 + j) * 0.3)
                const px = Math.cos(pointAngle) * radius
                const py = Math.sin(pointAngle) * radius
                if (j === 0) {
                  ctx.moveTo(px, py)
                } else {
                  ctx.lineTo(px, py)
                }
              }
              ctx.closePath()
              ctx.fill()

              ctx.restore()
            }
          }
        }

        const points = Array.from({ length: 10 }, () => new KaleidoscopePoint())

        return {
          points,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            points.forEach(point => {
              point.update()
              point.draw(ctx)
            })
          }
        }
      },
      psychedelic: () => {
        class PsychedelicWave {
          x: number = 0
          y: number = 0
          radius: number = 0
          angle: number = 0
          hue: number = 0
          frequency: number = 0
          phase: number = 0
          targetX: number = 0
          targetY: number = 0
          speed: number = 0.05
          pulsePhase: number = 0
          baseRadius: number = 0
          maxRadius: number = 300
          
          constructor() {
            this.reset()
          }

          reset() {
            if (!canvas) return
            this.x = targetMouse.x || canvas.width / 2
            this.y = targetMouse.y || canvas.height / 2
            this.targetX = this.x
            this.targetY = this.y
            this.baseRadius = Math.random() * 60 + 40
            this.radius = this.baseRadius
            this.angle = Math.random() * Math.PI * 2
            this.hue = Math.random() * 360
            this.frequency = Math.random() * 2 + 1
            this.phase = Math.random() * Math.PI * 2
            this.pulsePhase = Math.random() * Math.PI * 2
          }

          update() {
            if (!canvas) return
            const scrollOffset = scrollRef.current * 0.1
            const time = timeRef.current * 0.001

            this.targetX = targetMouse.x || canvas.width / 2
            this.targetY = (targetMouse.y - scrollOffset) || canvas.height / 2

            // Smoother movement
            this.x += (this.targetX - this.x) * this.speed
            this.y += (this.targetY - this.y) * this.speed

            // Gradually increase radius
            const targetRadius = Math.min(this.baseRadius + 200, this.maxRadius)
            this.radius += (targetRadius - this.radius) * 0.01

            // Update phases
            this.phase += 0.02
            this.pulsePhase += 0.03

            // Reset when too far from target
            const dx = this.x - this.targetX
            const dy = this.y - this.targetY
            const distanceToTarget = Math.sqrt(dx * dx + dy * dy)

            if (distanceToTarget > canvas.width * 0.8 || this.radius >= this.maxRadius) {
              this.reset()
            }
          }

          draw(ctx: CanvasRenderingContext2D) {
            const time = timeRef.current * 0.001
            const points = 50
            const angleStep = (Math.PI * 2) / points
            
            // Create gradient
            const gradient = ctx.createRadialGradient(
              this.x, this.y, 0,
              this.x, this.y, this.radius
            )
            gradient.addColorStop(0, `hsla(${this.hue}, 100%, 50%, 0.3)`)
            gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`)

            ctx.beginPath()
            for (let i = 0; i <= points; i++) {
              const angle = i * angleStep
              const distortionX = Math.cos(angle * this.frequency + this.phase) * 30
              const distortionY = Math.sin(angle * this.frequency + this.phase) * 30
              const pulseFactor = Math.sin(this.pulsePhase) * 0.2 + 1
              const radius = this.radius * pulseFactor
              
              const x = this.x + Math.cos(angle) * (radius + distortionX)
              const y = this.y + Math.sin(angle) * (radius + distortionY)

              if (i === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }
            ctx.closePath()
            ctx.fillStyle = gradient
            ctx.fill()
          }
        }

        const waves = Array.from({ length: 15 }, () => new PsychedelicWave())
        return { points: waves, update: () => {
          if (!canvas || !ctx) return
          timeRef.current++
          ctx.fillStyle = resolvedTheme === 'dark'
            ? 'rgba(17, 18, 23, 0.1)'
            : 'rgba(255, 255, 255, 0.1)'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          waves.forEach(wave => {
            wave.update()
            wave.draw(ctx)
          })
        }}
      },
      subtle: () => {
        class SubtlePoint {
          x: number = 0
          y: number = 0
          opacity: number = 0
          speed: number = 0
          size: number = 1
          mouseDistance: number = 0
          
          constructor() {
            this.reset()
          }

          reset() {
            if (!canvas) return
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height * 2
            this.opacity = Math.random() * 0.15
            this.speed = Math.random() * 0.2 + 0.1
            this.size = Math.random() * 0.5 + 0.5
            this.mouseDistance = 0
          }

          update() {
            if (!canvas) return
            const time = timeRef.current * 0.001
            const scrollOffset = scrollRef.current * 0.1

            this.y -= this.speed
            this.opacity += Math.sin(time + this.x * 0.01) * 0.01

            const dx = this.x - targetMouse.x
            const dy = this.y - (targetMouse.y - scrollOffset)
            this.mouseDistance = Math.sqrt(dx * dx + dy * dy)
            
            const mouseRadius = 100
            if (this.mouseDistance < mouseRadius) {
              const angle = Math.atan2(dy, dx)
              const force = (1 - this.mouseDistance / mouseRadius) * 0.2
              this.x += Math.cos(angle) * force
              this.y += Math.sin(angle) * force
              this.opacity += force * 0.1
              this.size += force * 0.5
            } else {
              this.size = Math.max(1, this.size * 0.95)
            }

            if (this.y < -20 || this.opacity < 0) {
              this.reset()
              this.y = canvas.height + 20
            }

            this.y += scrollOffset * 0.02
          }

          draw(ctx: CanvasRenderingContext2D) {
            const isDark = resolvedTheme === 'dark'
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${this.opacity * 0.3})`
              : `rgba(0, 0, 0, ${this.opacity * 0.2})`
            
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        const points = Array.from({ length: 100 }, () => new SubtlePoint())

        return {
          points,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            points.forEach(point => {
              point.update()
              point.draw(ctx)
            })
          }
        }
      },
      wormhole: () => {
        class WormholeRing {
          distance: number = 0
          rotation: number = 0
          speed: number = 0
          size: number = 0
          distortionX: number = 0
          distortionY: number = 0
          
          constructor() {
            this.reset()
          }

          reset() {
            this.distance = Math.random() * 2
            this.rotation = Math.random() * Math.PI * 2
            this.speed = (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1)
            this.size = Math.random() * 0.5 + 0.5
            this.distortionX = Math.random() * 0.2 - 0.1
            this.distortionY = Math.random() * 0.2 - 0.1
          }

          update() {
            const time = timeRef.current * 0.001
            const scrollOffset = scrollRef.current * 0.001

            this.rotation += this.speed
            this.distance -= 0.001

            if (this.distance < 0) {
              this.reset()
              this.distance = 2
            }

            // Mouse influence
            const mouseX = (targetMouse.x / canvas!.width) * 2 - 1
            const mouseY = (targetMouse.y / canvas!.height) * 2 - 1
            this.distortionX += (mouseX * 0.1 - this.distortionX) * 0.1
            this.distortionY += (mouseY * 0.1 - this.distortionY) * 0.1
          }

          draw(ctx: CanvasRenderingContext2D) {
            if (!canvas) return
            const time = timeRef.current * 0.001
            const isDark = resolvedTheme === 'dark'

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const perspective = 0.8 - this.distance * 0.3
            const size = Math.min(canvas.width, canvas.height) * perspective * this.size
            
            const offsetX = this.distortionX * size
            const offsetY = this.distortionY * size

            ctx.save()
            ctx.translate(centerX + offsetX, centerY + offsetY)
            ctx.rotate(this.rotation)
            ctx.scale(1 + Math.abs(this.distortionX), 1 + Math.abs(this.distortionY))

            const opacity = (1 - this.distance * 0.3) * 0.2
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`
            ctx.lineWidth = 2 * perspective

            // Draw distorted circle
            ctx.beginPath()
            for (let i = 0; i <= 100; i++) {
              const angle = (i / 100) * Math.PI * 2
              const distortion = Math.sin(angle * 3 + time + this.rotation) * 20 * perspective
              const radius = size + distortion
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              
              if (i === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }
            ctx.closePath()
            ctx.stroke()

            ctx.restore()
          }
        }

        const rings = Array.from({ length: 20 }, () => new WormholeRing())

        return {
          points: rings,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.15)'
              : 'rgba(255, 255, 255, 0.15)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            rings.forEach(ring => {
              ring.update()
              ring.draw(ctx)
            })
          }
        }
      },
      calming: () => {
        class CalmingOrb {
          x: number = 0
          y: number = 0
          targetX: number = 0
          targetY: number = 0
          radius: number = 0
          baseHue: number = 0
          hue: number = 0
          opacity: number = 0
          speed: number = 0
          angle: number = 0
          neighbors: CalmingOrb[] = []
          
          constructor() {
            this.reset()
          }

          reset() {
            if (!canvas) return
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            this.targetX = this.x
            this.targetY = this.y
            this.radius = Math.random() * 40 + 20
            this.baseHue = Math.random() * 40 + 180 // Blue to cyan range
            this.hue = this.baseHue
            this.opacity = Math.random() * 0.2 + 0.1
            this.speed = Math.random() * 0.5 + 0.2
            this.angle = Math.random() * Math.PI * 2
          }

          findNeighbors(orbs: CalmingOrb[]) {
            this.neighbors = orbs.filter(orb => {
              if (orb === this) return false
              const dx = this.x - orb.x
              const dy = this.y - orb.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              return distance < 200
            })
          }

          update() {
            if (!canvas) return
            const time = timeRef.current * 0.001

            // Natural floating motion
            this.angle += this.speed * 0.01
            const floatRadius = 50
            this.targetX += Math.cos(this.angle) * 0.2
            this.targetY += Math.sin(this.angle * 0.7) * 0.2

            // Softer mouse/touch interaction
            const dx = targetMouse.x - this.x
            const dy = targetMouse.y - this.y
            const mouseDistance = Math.sqrt(dx * dx + dy * dy)
            const mouseInfluence = 300 // Increased range
            
            if (mouseDistance < mouseInfluence) {
              const force = Math.pow(1 - mouseDistance / mouseInfluence, 2) * 0.7 // Quadratic falloff for smoother interaction
              this.targetX += dx * force * 0.02 // Reduced force
              this.targetY += dy * force * 0.02
              this.hue = this.baseHue + (10 * force) // Subtle color shift based on distance
              this.opacity = Math.min(0.3, this.opacity + force * 0.1) // Gentle opacity increase near mouse
            } else {
              this.hue += (this.baseHue - this.hue) * 0.05 // Slower color return
              this.opacity += (0.15 - this.opacity) * 0.1 // Return to base opacity
            }

            // Neighbor interaction
            this.neighbors.forEach(neighbor => {
              const nx = neighbor.x - this.x
              const ny = neighbor.y - this.y
              const distance = Math.sqrt(nx * nx + ny * ny)
              if (distance < 200) {
                const force = (1 - distance / 200) * 0.02
                this.targetX -= nx * force
                this.targetY -= ny * force
              }
            })

            // Smooth movement
            this.x += (this.targetX - this.x) * 0.02
            this.y += (this.targetY - this.y) * 0.02

            // Keep within bounds
            const padding = 50
            if (this.x < padding) this.targetX += (padding - this.x) * 0.05
            if (this.x > canvas.width - padding) this.targetX -= (this.x - (canvas.width - padding)) * 0.05
            if (this.y < padding) this.targetY += (padding - this.y) * 0.05
            if (this.y > canvas.height - padding) this.targetY -= (this.y - (canvas.height - padding)) * 0.05
          }

          draw(ctx: CanvasRenderingContext2D) {
            // Main orb with softer gradient
            const gradient = ctx.createRadialGradient(
              this.x, this.y, 0,
              this.x, this.y, this.radius
            )
            gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, ${this.opacity * 1.2})`)
            gradient.addColorStop(0.6, `hsla(${this.hue}, 70%, 50%, ${this.opacity * 0.4})`)
            gradient.addColorStop(1, `hsla(${this.hue}, 70%, 40%, 0)`)
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            ctx.fill()

            // Softer connection lines
            this.neighbors.forEach(neighbor => {
              const dx = neighbor.x - this.x
              const dy = neighbor.y - this.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              if (distance < 200) {
                const opacity = Math.pow(1 - distance / 200, 2) * 0.1 // Quadratic falloff for connections
                ctx.strokeStyle = `hsla(${this.hue}, 70%, 50%, ${opacity})`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(neighbor.x, neighbor.y)
                ctx.stroke()
              }
            })
          }
        }

        const orbs = Array.from({ length: 15 }, () => new CalmingOrb())
        
        return {
          points: orbs,
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            
            // Clear with fade effect
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Update neighbor relationships
            orbs.forEach(orb => orb.findNeighbors(orbs))
            
            // Update and draw orbs
            orbs.forEach(orb => {
              orb.update()
              orb.draw(ctx)
            })
          }
        }
      },
      hangman: () => {
        // Import word list from JSON file
        const wordList = require('../../data/hangman-words.json').words

        class HangmanGame {
          word: string = ''
          guessedLetters: Set<string> = new Set()
          wrongGuesses: number = 0
          maxWrongGuesses: number = 6
          gameOver: boolean = false
          won: boolean = false
          lastClickTime: number = 0
          clickCooldown: number = 500 // ms between letter clicks

          constructor() {
            this.word = wordList[Math.floor(Math.random() * wordList.length)]
          }

          reset() {
            this.word = wordList[Math.floor(Math.random() * wordList.length)]
            this.guessedLetters.clear()
            this.wrongGuesses = 0
            this.gameOver = false
            this.won = false
          }

          getMaskedWord(): string {
            return this.word
              .split('')
              .map(letter => this.guessedLetters.has(letter) ? letter : '_')
              .join(' ')
          }

          handleKeyPress(key: string) {
            if (this.gameOver) {
              this.reset()
              return
            }

            const letter = key.toUpperCase()
            if (!/^[A-Z]$/.test(letter) || this.guessedLetters.has(letter)) return

            const now = Date.now()
            if (now - this.lastClickTime < this.clickCooldown) return
            this.lastClickTime = now

            this.guessedLetters.add(letter)
            if (!this.word.includes(letter)) {
              this.wrongGuesses++
            }

            // Check win/lose conditions
            if (this.wrongGuesses >= this.maxWrongGuesses) {
              this.gameOver = true
            } else if (this.word.split('').every(letter => this.guessedLetters.has(letter))) {
              this.gameOver = true
              this.won = true
            }
          }

          checkLetter(x: number, y: number) {
            if (!canvas || this.gameOver) return

            const now = Date.now()
            if (now - this.lastClickTime < this.clickCooldown) return
            this.lastClickTime = now

            // Define letter positions
            const centerX = canvas.width / 2
            const startX = centerX - 300
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            const letterWidth = 40
            const letterHeight = 40
            
            // Adjust letters per row based on screen width
            const isMobile = canvas.width < 768
            const lettersPerRow = isMobile ? 7 : 13
            const rows = Math.ceil(letters.length / lettersPerRow)
            const letterY = canvas.height - (rows * 50 + 50)

            letters.split('').forEach((letter, i) => {
              const row = Math.floor(i / lettersPerRow)
              const col = i % lettersPerRow
              const letterX = startX + col * letterWidth
              const currentY = letterY + row * 50

              if (
                x >= letterX && x <= letterX + letterWidth &&
                y >= currentY && y <= currentY + letterHeight
              ) {
                this.handleKeyPress(letter)
              }
            })
          }

          drawGallows(ctx: CanvasRenderingContext2D) {
            const isDark = resolvedTheme === 'dark'
            ctx.strokeStyle = isDark ? '#fff' : '#000'
            ctx.lineWidth = 3
            const centerX = canvas!.width / 2
            const baseY = canvas!.height / 2

            // Base
            ctx.beginPath()
            ctx.moveTo(centerX - 100, baseY + 100)
            ctx.lineTo(centerX + 100, baseY + 100)
            ctx.stroke()

            // Vertical pole
            ctx.beginPath()
            ctx.moveTo(centerX - 50, baseY + 100)
            ctx.lineTo(centerX - 50, baseY - 100)
            ctx.stroke()

            // Top beam
            ctx.beginPath()
            ctx.moveTo(centerX - 50, baseY - 100)
            ctx.lineTo(centerX + 50, baseY - 100)
            ctx.stroke()

            // Rope
            ctx.beginPath()
            ctx.moveTo(centerX + 50, baseY - 100)
            ctx.lineTo(centerX + 50, baseY - 70)
            ctx.stroke()
          }

          drawHangman(ctx: CanvasRenderingContext2D) {
            const isDark = resolvedTheme === 'dark'
            ctx.strokeStyle = isDark ? '#fff' : '#000'
            ctx.lineWidth = 3
            const centerX = canvas!.width / 2 + 50
            const baseY = canvas!.height / 2

            if (this.wrongGuesses >= 1) {
              // Head
              ctx.beginPath()
              ctx.arc(centerX, baseY - 45, 25, 0, Math.PI * 2)
              ctx.stroke()
            }

            if (this.wrongGuesses >= 2) {
              // Body
              ctx.beginPath()
              ctx.moveTo(centerX, baseY - 20)
              ctx.lineTo(centerX, baseY + 30)
              ctx.stroke()
            }

            if (this.wrongGuesses >= 3) {
              // Left arm
              ctx.beginPath()
              ctx.moveTo(centerX, baseY - 10)
              ctx.lineTo(centerX - 30, baseY + 10)
              ctx.stroke()
            }

            if (this.wrongGuesses >= 4) {
              // Right arm
              ctx.beginPath()
              ctx.moveTo(centerX, baseY - 10)
              ctx.lineTo(centerX + 30, baseY + 10)
              ctx.stroke()
            }

            if (this.wrongGuesses >= 5) {
              // Left leg
              ctx.beginPath()
              ctx.moveTo(centerX, baseY + 30)
              ctx.lineTo(centerX - 30, baseY + 70)
              ctx.stroke()
            }

            if (this.wrongGuesses >= 6) {
              // Right leg
              ctx.beginPath()
              ctx.moveTo(centerX, baseY + 30)
              ctx.lineTo(centerX + 30, baseY + 70)
              ctx.stroke()
            }
          }

          drawLetters(ctx: CanvasRenderingContext2D) {
            const isDark = resolvedTheme === 'dark'
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            const letterWidth = 40
            const letterHeight = 40
            
            // Adjust letters per row based on screen width
            const isMobile = canvas!.width < 768
            const lettersPerRow = isMobile ? 7 : 13
            const rows = Math.ceil(letters.length / lettersPerRow)
            const letterY = canvas!.height - (rows * 50 + 50)

            // Calculate total width needed for letters in a row
            const totalRowWidth = lettersPerRow * letterWidth
            // Center the keyboard by calculating starting X position
            const startX = (canvas!.width - totalRowWidth) / 2

            letters.split('').forEach((letter, i) => {
              const row = Math.floor(i / lettersPerRow)
              const col = i % lettersPerRow
              const x = startX + col * letterWidth
              const y = letterY + row * 50

              // Draw letter background
              ctx.fillStyle = this.guessedLetters.has(letter)
                ? (this.word.includes(letter)
                  ? isDark ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 200, 0, 0.2)'
                  : isDark ? 'rgba(255, 0, 0, 0.2)' : 'rgba(200, 0, 0, 0.2)')
                : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              
              ctx.fillRect(x, y, letterWidth - 5, letterHeight - 5)

              // Draw letter
              ctx.fillStyle = isDark ? '#fff' : '#000'
              ctx.font = '20px Arial'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillText(letter, x + letterWidth / 2, y + letterHeight / 2)
            })
          }

          draw(ctx: CanvasRenderingContext2D) {
            const isDark = resolvedTheme === 'dark'
            
            // Draw word
            ctx.fillStyle = isDark ? '#fff' : '#000'
            ctx.font = '40px monospace'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(this.getMaskedWord(), canvas!.width / 2, 100)

            // Draw gallows and hangman
            this.drawGallows(ctx)
            this.drawHangman(ctx)

            // Always draw letters
            this.drawLetters(ctx)

            // Draw game over message
            if (this.gameOver) {
              ctx.fillStyle = isDark ? '#fff' : '#000'
              ctx.font = '30px Arial'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              
              if (this.won) {
                ctx.fillText(
                  "You Won! Press any letter to play again",
                  canvas!.width / 2,
                  180
                );
              } else {
                ctx.fillText(`Game Over! The word was ${this.word}`, canvas!.width / 2, 180)
                ctx.fillText('Press any letter to play again', canvas!.width / 2, 220)
              }
            }
          }
        }

        const game = new HangmanGame()
        gameRef.current = game // Store game instance in ref

        // Handle mouse clicks
        const handleClick = (e: MouseEvent) => {
          if (!canvas) return
          const rect = canvas.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          if (game.gameOver) {
            game.reset()
          } else {
            game.checkLetter(x, y)
          }
        }

        // Handle keyboard input
        const handleKeyDown = (e: KeyboardEvent) => {
          game.handleKeyPress(e.key)
        }

        canvas.addEventListener('click', handleClick)
        window.addEventListener('keydown', handleKeyDown)

        return {
          points: [game],
          update: () => {
            if (!canvas || !ctx) return
            timeRef.current++
            
            // Clear canvas
            ctx.fillStyle = resolvedTheme === 'dark'
              ? 'rgba(17, 18, 23, 1)'
              : 'rgba(255, 255, 255, 1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw game
            game.draw(ctx)
          },
          cleanup: () => {
            window.removeEventListener('keydown', handleKeyDown)
            canvas?.removeEventListener('click', handleClick)
            gameRef.current = null // Clean up game reference
          }
        }
      }
    }

    // Type guard for animation types
    const isAnimationType = (type: BackgroundType): type is Exclude<BackgroundType, 'none'> => {
      return type !== 'none'
    }

    // Initialize animation based on device
    const animation = isAnimationType(type) && type in animations ? animations[type]() : null
    
    // Update animation frame reference
    const animate = () => {
      if (!canvas || !ctx) return
      
      if (animation) {
        animation.update()
      }
      
      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    // Start animation only if we have a valid animation
    if (animation) {
      animate()
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('scroll', handleScroll)

    // Add touch events for mobile
    if (isMobile) {
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
      canvas.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      cleanup()
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (isMobile) {
        canvas.removeEventListener('touchstart', handleTouchStart)
        canvas.removeEventListener('touchmove', handleTouchMove)
        canvas.removeEventListener('touchend', handleTouchEnd)
      }
      // Call animation-specific cleanup if it exists
      if ('cleanup' in (animation || {})) {
        (animation as any).cleanup()
      }
    }
  }, [resolvedTheme, type, mounted, isMobile])

  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 -z-20 h-screen w-screen bg-white dark:bg-[#111217]"
        aria-hidden="true"
      />
    )
  }

  // For 'none' type, render a simple div with solid background
  if (type === 'none') {
    return (
      <div 
        className={twMerge(
          "fixed inset-0 -z-20 h-screen w-screen",
          "transition-colors duration-150"
        )}
        style={{ 
          background: resolvedTheme === 'dark' ? '#111217' : '#ffffff'
        }}
        aria-hidden="true"
      />
    )
  }

  // For other types, render the canvas with keyboard toggle buttons for mobile hangman
  return (
    <>
      <canvas
        ref={canvasRef}
        className={twMerge(
          "fixed inset-0 h-screen w-screen touch-none",
          "transition-colors duration-150"
        )}
        style={{
          zIndex: -20,
          background: resolvedTheme === 'dark' ? '#111217' : '#ffffff'
        }}
        aria-hidden="true"
      />
      {isMobile && type === 'hangman' && (
        <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.focus()
              }
            }}
            className={twMerge(
              "rounded-full p-3 text-sm font-medium transition-colors",
              "bg-white dark:bg-gray-800",
              "text-gray-900 dark:text-gray-100",
              "shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700",
              "focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
          >
            Show Keyboard
          </button>
        </div>
      )}
    </>
  )
} 