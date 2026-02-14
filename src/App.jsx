import { useState } from 'react'
import Header from './components/Header'
import FilterSection from './components/FilterSection'
import Roulette from './components/Roulette'
import ResultCard from './components/ResultCard'
import citiesData from './data/cities.json'

function App() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [filteredCities, setFilteredCities] = useState(citiesData.cities)
  const [isSpinning, setIsSpinning] = useState(false)

  const handleFilterChange = (filters) => {
    let filtered = citiesData.cities

    if (filters.region && filters.region !== 'all') {
      filtered = filtered.filter(city => city.region === filters.region)
    }

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(city => city.types.includes(filters.type))
    }

    setFilteredCities(filtered)
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedCity(null)

    // 模拟转盘旋转 3-5 秒后随机选择一个城市
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredCities.length)
      setSelectedCity(filteredCities[randomIndex])
      setIsSpinning(false)
    }, 4000)
  }

  const handleSpinAgain = () => {
    setSelectedCity(null)
    handleSpin()
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <FilterSection
          onFilterChange={handleFilterChange}
          citiesCount={filteredCities.length}
        />

        <Roulette
          cities={filteredCities}
          isSpinning={isSpinning}
          onSpin={handleSpin}
          selectedCity={selectedCity}
        />

        {selectedCity && (
          <ResultCard
            city={selectedCity}
            onSpinAgain={handleSpinAgain}
          />
        )}
      </main>

      <footer className="text-center text-white/80 py-8">
        <p>已收录 {citiesData.cities.length}+ 中国旅游城市 | © 2026 城市轮盘</p>
      </footer>
    </div>
  )
}

export default App
