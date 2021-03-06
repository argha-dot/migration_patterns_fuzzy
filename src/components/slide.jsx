import React, { useState, useEffect } from "react";
import { ArrowIcon } from "./icons";
import useVisibility from "../hooks/useVisibility"

const Feature = ({part, map}) => {
  const [isVisible, ref] = useVisibility(0);

  useEffect(() => {
    if (isVisible) {
      map.current.flyTo({
        center: [
          ...part.center
        ],
        zoom: part.zoom
      });
    }
  }, [isVisible]);

  return (
    <section ref={ref} className={`part_${part.section} feature ${isVisible ? "visible" : ""}`}>
      <h3>{part.title}</h3>
      <p>{part.content}</p>
    </section>
  );
}

const Slide = ({PARTS, map }) => {
  const [toggleSlide, setToggleSlide] = useState(true);

  const onScroll = () => {
    // console.log("hello")
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll, true)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={ `features-container ${toggleSlide ? 'toggled-container' : ''}` }>
      <button className={ `features-toggler ${toggleSlide ? 'toggled-btn' : '' }` } onClick={() => setToggleSlide(!toggleSlide)}>
        <ArrowIcon />
      </button>

      <div className="features-content">
        { Object.values(PARTS).map((part) => {
          return (
            <React.Fragment key={part.section}>
              <Feature
                part={part}
                map={map}
              />
            </React.Fragment>
          )
        }) }
      </div>
    </div>
  )
}

export default Slide;
