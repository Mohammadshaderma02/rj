import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { List } from './pages/CustomerInfo'
import Main from './pages/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Main/>
     {/* <List/> */}
    </>
  )
}

export default App
