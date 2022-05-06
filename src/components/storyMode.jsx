import { useEffect, useRef, useState } from "react";
import { Map } from "mapbox-gl"
import Slide from "./slide";
import Sidebar from "./sidebar";

const PARTS = {
  "part_1": {
    title: "Story Mode",
    content: 'This feature of our project allows users to track the stories of particular characters and see the interactions, conflicts and situations they were put in either before or while they were making these movements. Furthermore, it reveals to you the larger themes or occurrences of the actual partition that occurred giving the users a larger context for the things that are unfolding in the texts.',
    center: [91.4617, 25.7689],
    zoom: 4.34,
    section: 1
  },
  "part_2": {
    title: "The Train to Pakistan",
    content: 'The unfortunate reality of the violence that occurred during the Partition period was that no community could claim to be safe or free of guilt in the face of the atrocities committed. This path that has been highlighted shows the movements of the riots as they spread to the East from Calcutta to Noakhali in Bangladesh. The violence spread like a wildfire throughout the country in this way be it in Calcutta, Bihar or Punjab, with Hindus killing Muslims and Muslims killing Hindus in the areas that they were the dominant part of the population. In order to escape this violence, there was a large exodus of each of these communities trying to escape the said violence, moving to places where they would be protected- Hindus and Sikhs east from the Northwest Frontier Province and Muslims to the West. This was the summer of 1947, right before the official partitioning and people travelled on foot, in carts lorries and trains escaping the threat that was posed to them.',
    center: [91.1839, 22.8769],
    zoom: 9.94,
    section: 2
  },
  "part_3": {
    title: "",
    content: 'In the actual Partitioning of India and Pakistan, an estimated 14 million people migrated across the borders in ways similar to that mentioned in Khushwant Singh’s text. Furthermore, the number of people killed as a result of the violence that ensued officially stands at a mammoth 1 million. We must, however, take into account the fact that these numbers only represent the official records and several of these migrations and killings went undocumented. Following this story, therefore, we see how negative interactions among the characters of a certain text directly affect their decision to make the move across the border.',
    center: [88.5509, 22.5790],
    zoom: 9.94,
    section: 3
  },
  "part_4": {
    title: "Gul Mohammad",
    content: 'This story shows us the path traversed by the narrator in Mohinder Singh Sarna’s, wrote for the ‘Savage Harvest.’ The narrator, on seeing a Pakistani gentleman caught by a group of angry demonstrators in front of the Pakistan High commission believes he has seen Gul Mohammad Third Timer, his classmate from over 32 years ago. He then recalls an incident from over thirty years ago, back when he used to live in what was now Pakistan. The path thus followed represents not only a large spatial shift but also a temporal one. In Pakistan, back when they were school students, the narrator had saved his friend Gul Mohammad from getting beaten by his teacher. That day Gul Mohammad had followed the narrator home, an act that unnerved him leading him to have dreams about his classmate spearheading a riot in his village. The next morning, however, Gul Mohammad’s father arrived at the narrator’s house with melons as a sign of gratitude for standing up for his son. Back in India 32 years later, the narrator saved the Pakistani gentleman by talking down the crowd and directing their anger at the Government of Pakistan, not its people.',
    center: [76.5394, 30.3887],
    zoom: 9.76,
    section: 4
  },
  "part_5": {
    title: "",
    content: 'This story follows several interactions, both positive and negative with an underlying narrative of the threat posed to a Pakistani gentleman in India. Following the path of the narrator, however, reveals to us that these interactions did not necessarily cause his migration from Pakistan to India. Since there is a huge absence of information in the 32 years that have lapsed between him being in Pakistan and India, particularly about when he made the move. It is not possible to make the claim that one of these interactions led to the migration in the first place.',
    center: [75.1146, 31.6316],
    zoom: 9.76,
    section: 5
  },
  "part_6": {
    title: "The Dutiful Daughter",
    content: 'What we observe here is the path followed by Bhagbari, a young girl who was abducted during the riots in Patiala after the partition. We view her narrative through the stories of her mother and a liaison officer, who was working on locating young girls who had been abducted during the riots. The liaison officer, who is recalling these events writes about how he keeps running into this old woman who was looking for her abducted daughter. They meet in Jullandar, Saharanpur and Amritsar. In Amritsars Farid Chowk, the woman sees her daughter Bhargabi who, with her husband walks away from her mother leaving her an abandoned mess.',
    center: [77.2537, 28.6143],
    zoom: 11.52,
    section: 6
  },
  "part_7": {
    title: "",
    content: 'During the Partition, it is estimated that between 75,000 to 100,000 women were abducted or raped by both sides. After the partitioning several offices were set up in order to locate and bring back the girls that had been kidnapped. In some of these cases, we see how a sort of Stockholm syndrome situation develops and the kidnapped women refuse to go back to their native places. In this story, we see how the abduction of Bhargabi during the riots displaced both her and her mother. While we did not know Bhargabi’s location for the larger part of the story, we see how her mother moves from town to town looking for her. This is quite directly a negative interaction leading to these movements. What makes this case nuanced, however, is the fact that Bhargabi refuses to acknowledge her mother at the end of the story when she is found, leading to the larger question of whether the initial interaction of abduction was perceived as a negative one by Bhargabi.',
    center: [73.0924, 33.6069],
    zoom: 12.74,
    section: 7
  },
 }

const StoryMode = () => {
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
      map.current.setLayoutProperty('dev-char-paths-unf-b3she6', 'visibility', 'none')
    });
  }, [])

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
    </>
  )
}

export default StoryMode;
