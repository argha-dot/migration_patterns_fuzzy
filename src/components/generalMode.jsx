import { useEffect, useRef, useState } from "react";
import { Map } from "mapbox-gl"

import Slide from "./slide";
import Sidebar from "./sidebar";

const PARTS = [
  {
    title: "Introduction",
    content: 'Introduction Following the Partitioning of India and Pakistan in 1947, there were migrations on an unfathomable scale with over 14 million Hindus, Muslims and Sikhs crossing the newly formed borders. The creation of these two new states resulted in atrocities beyond our comprehension through riots, massacres and abduction, to name a few. What emerges out of this is a whole new genre in the field of literature, telling the stories of fictional characters who experienced the partition in different ways. This is done against the backdrop of the actual partition and the tales are very much inspired by true events, if not directly autobiographical. Some of the authors who contributed to this new field were Sadaat Hasan Manto, Khushwant Singh, Mohinder Singh Sarda and Sunanda Sikdar in their texts ‘Mottled Dawn’, ‘The Train to Pakistan’, ‘Savage Harvest’ and ‘A Life Long Ago’ respectively. The project that we have undertaken aims to map the paths of those characters, who in these aforementioned texts made the journey across one of the new borders between India and Pakistan (including the erstwhile East Pakistan). We do this taking into account the additional factor of the interactions they have in their stories. Trying to answer the larger question of why these migrations were made, our group hypothesised that negative interactions in their narratives would be intertwined with their decision to make the migration. We have thus created this map showing the characters who move across the borders in their stories who have had either a positive or a negative interaction in the text they have been written about. ',
    center: [74.8736, 31.6343083],
    zoom: 4.00
  },
  {
    title: "The question ",
    content: 'As mentioned earlier, the map we have made shows the characters who move across the border in their respective stories when either a negative or a positive interaction has occurred. The larger question that we are trying to answer here is whether these interactions are related to their movement across the border. The more specific research question that we have tried to address, is whether negative interactions in the narratives of these characters are responsible for the migrations that they made.',
    center: [77.1835, 28.6239],
    zoom: 4.00
  },
  {
    title: "Hypothesis",
    content: 'The expectations of this project were that a large majority of those characters who move across the borders would be the ones who have had negative interactions in their narratives.',
    center: [77.0688997, 28.5272803],
    zoom: 4.00
  },
]

const LAYERS = {
  "India": "dev-char-layer-unf-ind",
  "Bangladesh": "dev-char-layer-unf-bang",
  "Pakistan": "dev-char-layer-unf-pak",
  "Impressionist Art": "dev-char-paths-unf",
}

const GeneralMode = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [currentSection, setCurrentSection] = useState(0)
  const [config, setConfig] = useState({
    center: {
      lang: 88.1492,
      lat: 22.1878
    },
    zoom: 4,
    bearing: 0,
    pitch: 0
  })

  useEffect(() => {
    if (map.current) return;
    map.current = new Map({
      container: mapContainer.current,
      style: 'mapbox://styles/argha-dot/cl2qgqrdb000114o1c8jdgd1b',
      center: [config.center.lang, config.center.lat],
      zoom: config.zoom
    });

    map.current.on('load', () => {
      map.current.setLayoutProperty('dev-true-char-paths', 'visibility', 'none')
      map.current.setLayoutProperty('dev-layer-pos-neg', 'visibility', 'none')
      console.log(map.current.getStyle().layers)
    })
  }, [])

  useEffect(() => {
    if (!map.current) return;

    map.current.on('load', () => {
      map.current.setLayoutProperty('dev-char-layer-unf-bang', 'visibility', 'none')
      map.current.setLayoutProperty('dev-char-layer-unf-pak', 'visibility', 'none')
      map.current.setLayoutProperty('dev-char-layer-unf-ind', 'visibility', 'none')
      map.current.setLayoutProperty('dev-char-paths-unf', 'visibility', 'none')
    })
  })

  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      setConfig({
        ...config,
        center: {
          lang: map.current.getCenter().lng.toFixed(4),
          lat: map.current.getCenter().lat.toFixed(4)
        },
        zoom: map.current.getZoom().toFixed(2)
      })
    })
  })

  const selectionHandle = (layer) => {
    const visibility = map.current ? map.current.getLayoutProperty(layer, 'visibility') : null;
    console.log(visibility)

    if (visibility == 'visible') {
      map.current.setLayoutProperty(layer, 'visibility', 'none');
    } else {
      map.current.setLayoutProperty(layer, 'visibility', 'visible');
    }
  }

  const clearMap = () => {
    map.current.setLayoutProperty('dev-char-layer-unf-bang', 'visibility', 'none')
    map.current.setLayoutProperty('dev-char-layer-unf-pak', 'visibility', 'none')
    map.current.setLayoutProperty('dev-char-layer-unf-ind', 'visibility', 'none')
    map.current.setLayoutProperty('dev-char-paths-unf', 'visibility', 'none')
  }

  return (
    <>
      <div ref={mapContainer} className="map"></div>
      <Sidebar
        lang={config.center.lang}
        lat={config.center.lat}
        zoom={config.zoom}
      />

      <Slide
        PARTS={PARTS}
        map={map}
        currentSection={currentSection}
        setCurrentSlide={setCurrentSection}
      />

      <div className="selection">
        {
        // console.log(Object.keys(LAYERS))
        Object.keys(LAYERS).map((key) => {
          return (
            <div
              key={key}
              onClick={() => selectionHandle(LAYERS[key])}>
              {key}
            </div>
          )
        })
        }
        <div onClick={() => clearMap()}>Clear Map </div>
      </div>
    </>
  )
}

export default GeneralMode;

