export default function ResultCard({ city, onSpinAgain }) {
  const getBudgetEmoji = (budget) => {
    switch (budget) {
      case '经济': return '💰'
      case '中等': return '💰💰'
      case '高端': return '💰💰💰'
      default: return '💰'
    }
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* 庆祝头部 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-6">
          <p className="text-3xl mb-2">🎉</p>
          <h2 className="text-2xl font-bold">恭喜！你的目的地是：</h2>
        </div>

        {/* 城市信息 */}
        <div className="p-8">
          <h3 className="text-5xl font-bold text-center mb-6 text-gray-800">
            {city.name}
          </h3>

          <div className="space-y-4 text-gray-700">
            {/* 位置 */}
            <div className="flex items-start">
              <span className="text-2xl mr-3">📍</span>
              <div>
                <p className="font-semibold">位置</p>
                <p>{city.province} · {city.region} · {city.highlights}</p>
              </div>
            </div>

            {/* 类型 */}
            <div className="flex items-start">
              <span className="text-2xl mr-3">🏷️</span>
              <div>
                <p className="font-semibold">类型</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {city.types.map(type => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 简介 */}
            <div className="flex items-start">
              <span className="text-2xl mr-3">✨</span>
              <div>
                <p className="font-semibold">简介</p>
                <p className="text-gray-600">{city.description}</p>
              </div>
            </div>

            {/* 景点 */}
            <div className="flex items-start">
              <span className="text-2xl mr-3">⭐</span>
              <div>
                <p className="font-semibold">推荐景点</p>
                <p className="text-gray-600">{city.attractions.join('、')}</p>
              </div>
            </div>

            {/* 美食 */}
            <div className="flex items-start">
              <span className="text-2xl mr-3">🍜</span>
              <div>
                <p className="font-semibold">特色美食</p>
                <p className="text-gray-600">{city.foodRecommend.join('、')}</p>
              </div>
            </div>

            {/* 最佳季节 */}
            <div className="flex items-start">
              <span className="text-2xl mr-3">🌡️</span>
              <div>
                <p className="font-semibold">最佳旅游季节</p>
                <p className="text-gray-600">{city.bestSeason.join('、')}</p>
              </div>
            </div>

            {/* 预算 */}
            <div className="flex items-start">
              <span className="text-2xl mr-3">{getBudgetEmoji(city.budget)}</span>
              <div>
                <p className="font-semibold">预算参考</p>
                <p className="text-gray-600">{city.budget}</p>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onSpinAgain}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              再抽一次
            </button>
            <button
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              查看详情
            </button>
            <button
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              分享结果
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
