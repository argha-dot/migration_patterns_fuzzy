import mapboxGl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react'
import '../styles/App.css'

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [center, setCenter] = useState({
    lang: 77.0688997,
    lat: 20.5272803
  })
  const [zoom, setZoom] = useState(4);
  const [toggleSlide, setToggleSlide] = useState(true);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxGl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/argha-dot/cl2qgqrdb000114o1c8jdgd1b',
      center: [center.lang, center.lat],
      zoom: zoom
    })
  })
  return (
    <div className="app">
      <div ref={mapContainer} className="map"></div>

      <div className={ `features-container ${toggleSlide ? 'toggled' : ''}` }>
        <button className="features-toggler" onClick={() => setToggleSlide(!toggleSlide)}>
          press
        </button>

        <div className="features-content">
          
        </div>
      </div>
    </div>
  )
}

export default App
