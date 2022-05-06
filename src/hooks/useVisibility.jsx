import { useRef, useEffect, useState } from "react";

const useVisibility = ({offset = 0}) => {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef(null);

  const onScroll = () => {
    if (!currentElement) return;

    const top = currentElement.current.getBoundingClientRect().top;
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight)
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return [isVisible, currentElement]
}

export default useVisibility;
