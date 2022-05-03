import React from 'react'
import ReactDOM from 'react-dom/client'
import mapboxGl from "mapbox-gl";

import App from './App'
import '../styles/index.css'

// mapboxGl.accessToken = import.meta.env.MAPBOX_ACC_TOKEN
mapboxGl.accessToken = "pk.eyJ1IjoiYXJnaGEtZG90IiwiYSI6ImNsMnFleDMweDAwdGIzY3J0aXBicnUwOWQifQ.hO4G9VyTWPGdy9THgry1RA"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
