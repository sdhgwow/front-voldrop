import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import './css/header.css'
import './css/stylename.css'
import { Header } from './components/Header'
import { PreviewContainer } from './components/PreviewContainer'
import { Main } from './components/Main'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <PreviewContainer />
      <Main />
      <Footer />
    </>
  )
}

export default App
