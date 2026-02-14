import { useEffect, useRef } from 'react'

export default function Roulette({ cities, isSpinning, onSpin, selectedCity }) {
  const canvasRef = useRef(null)
  const rotationRef = useRef(0)
  const animationRef = useRef(null)

  // 转盘颜色
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B195', '#F67280', '#C06C84', '#6C5B7B'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    const drawRoulette = (rotation = 0) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const sliceAngle = (2 * Math.PI) / cities.length

      // 绘制城市扇区
      cities.forEach((city, index) => {
        const startAngle = rotation + index * sliceAngle
        const endAngle = startAngle + sliceAngle

        // 绘制扇区
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.closePath()
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.stroke()

        // 绘制城市名称
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(startAngle + sliceAngle / 2)
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.font = 'bold 16px sans-serif'
        ctx.fillText(city.name, radius * 0.65, 5)
        ctx.restore()
      })

      // 绘制中心圆
      ctx.beginPath()
      ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI)
      ctx.fillStyle = 'white'
      ctx.fill()
      ctx.strokeStyle = '#333'
      ctx.lineWidth = 3
      ctx.stroke()

      // 绘制指针（顶部）
      ctx.beginPath()
      ctx.moveTo(centerX, 10)
      ctx.lineTo(centerX - 15, 40)
      ctx.lineTo(centerX + 15, 40)
      ctx.closePath()
      ctx.fillStyle = '#FF6B6B'
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    if (isSpinning) {
      let startTime = Date.now()
      const duration = 4000 // 4秒
      const startRotation = rotationRef.current
      const totalRotation = Math.PI * 2 * 5 + Math.random() * Math.PI * 2 // 5圈 + 随机角度

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 缓动函数：先快后慢
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentRotation = startRotation + totalRotation * easeOut

        rotationRef.current = currentRotation
        drawRoulette(currentRotation)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animate()
    } else {
      drawRoulette(rotationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [cities, isSpinning])

  if (cities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-xl">筛选条件太严格，没有匹配的城市</p>
        <p className="text-white/70 mt-2">请重新选择筛选条件</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center mb-12">
      {/* 转盘画布 */}
      <div className="relative mb-8">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="max-w-full h-auto"
        />
      </div>

      {/* 抽取按钮 */}
      <button
        onClick={onSpin}
        disabled={isSpinning}
        className={`
          px-12 py-4 text-xl font-bold rounded-full
          transition-all duration-300 transform
          ${isSpinning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-110 hover:shadow-2xl'
          }
          text-white shadow-lg
        `}
      >
        {isSpinning ? '抽取中... 🎲' : selectedCity ? '再抽一次 🎲' : '开始抽取 🎲'}
      </button>

      {isSpinning && (
        <p className="text-white mt-4 animate-pulse">
          转盘旋转中，请稍候...
        </p>
      )}
    </div>
  )
}
