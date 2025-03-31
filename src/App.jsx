import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import { useEffect, useState } from 'react'
import { Coordinates } from '../context/contextApi'

function App() {

  const [coord, setCoord] = useState({ lat: 19.07480, lng: 72.88560 })

  return (
    <>
      <Coordinates.Provider value={{ coord, setCoord }}>
        <Header />
        <Outlet />
      </Coordinates.Provider>
    </>
  )
}

export default App
