// @ts-check

import { useEffect, useState } from 'react';
import { Toggle } from "react-toggle-component";

import StoryMode from "./components/storyMode";
import GeneralMode from "./components/generalMode";

import '../styles/App.css';


function App() {
  const [isStoryMode, setIsStoryMode] = useState(false);
  useEffect(() => {
  }, [])

  return (
    <div className="app">
      <div className="modes">
        <p>General Mode</p>
        <Toggle
          leftBackgroundColor="tomato"
          rightBackgroundColor="green"
          borderColor="black"
          knobColor="white"
          name="toggle-3"
          onToggle={() => setIsStoryMode(!isStoryMode)}
        />
        <p style={{textAlign: "right"}}>Story Mode</p>
      </div>

      { isStoryMode ?
        <StoryMode /> : <GeneralMode />
      }
    </div>
  )
}

export default App
