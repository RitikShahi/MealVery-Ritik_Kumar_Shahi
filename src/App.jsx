import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import { useEffect, useState } from 'react';
import { Coordinates } from '../context/contextApi';

function App() {
  const [coord, setCoord] = useState({ lat: 19.07480, lng: 72.88560 });
  const location = useLocation();
  // Hide header if the current path is /admin or /delivery
  const hideHeader = location.pathname === '/admin' || location.pathname === '/delivery';

  return (
    <Coordinates.Provider value={{ coord, setCoord }}>
      {!hideHeader && <Header />}
      <Outlet />
    </Coordinates.Provider>
  );
}

export default App;
