export default function Header() {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🎰</span>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              中国城市旅游轮盘
            </h1>
          </div>
          <div className="flex space-x-4">
            <button className="text-white/80 hover:text-white transition">
              关于
            </button>
            <button className="text-white/80 hover:text-white transition">
              分享
            </button>
          </div>
        </div>
        <p className="text-white/70 mt-2 text-sm md:text-base">
          不知道去哪玩？让轮盘帮你决定下一个旅行目的地
        </p>
      </div>
    </header>
  )
}
