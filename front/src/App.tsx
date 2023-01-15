import axios from 'axios'
import { useEffect } from 'react'
import { HeroCard } from './components/HeroCard'
import { PageDefault } from './components/PageDefault'

function App() {
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/gift-all')
      .then(resp => console.log('resp', resp))
  }, [])

  return (
    <div>
      <PageDefault>
        <HeroCard />
      </PageDefault>
    </div>
  )
}

export default App
