import { useState } from 'react'

export default function FilterSection({ onFilterChange, citiesCount }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState({
    region: 'all',
    type: 'all'
  })

  const regions = [
    { value: 'all', label: '全部地区' },
    { value: '华东', label: '华东' },
    { value: '华北', label: '华北' },
    { value: '华南', label: '华南' },
    { value: '西南', label: '西南' },
    { value: '西北', label: '西北' },
    { value: '东北', label: '东北' },
    { value: '华中', label: '华中' }
  ]

  const types = [
    { value: 'all', label: '全部类型' },
    { value: '古镇', label: '古镇古城' },
    { value: '海滨', label: '海滨海岛' },
    { value: '山岳', label: '山岳名山' },
    { value: '都市', label: '现代都市' },
    { value: '草原', label: '草原牧场' },
    { value: '沙漠', label: '沙漠戈壁' }
  ]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = { region: 'all', type: 'all' }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg flex items-center">
            <span className="mr-2">🔍</span>
            筛选条件
            <span className="ml-3 text-sm text-white/70">
              (当前匹配 {citiesCount} 个城市)
            </span>
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/80 hover:text-white transition"
          >
            {isExpanded ? '收起 ▲' : '展开 ▼'}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 地区筛选 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  地区
                </label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {regions.map(region => (
                    <option key={region.value} value={region.value} className="text-gray-900">
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 类型筛选 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  类型
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value} className="text-gray-900">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 重置按钮 */}
            <button
              onClick={handleReset}
              className="w-full md:w-auto px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
            >
              重置筛选
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
