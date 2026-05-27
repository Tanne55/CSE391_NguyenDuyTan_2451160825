import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import BadCounter from '../components/BadCounter'
import GoodCounter from '../components/GoodCounter'
import FlowDemo from '../components/FLowDemo'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BadCounter />
      <GoodCounter />
      <FlowDemo />
    </>
  )
}

export default App
