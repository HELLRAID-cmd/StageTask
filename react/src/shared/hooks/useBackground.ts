import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const backgrounds = [
  withBase("background/scenery-1.png"),
  withBase("background/scenery-2.png"),
  withBase("background/scenery-3.png"),
  withBase("background/scenery-4.png"),
  withBase("background/scenery-5.png"),
];

function useBackground() {
  const location = useLocation();

  useEffect(() => {
    const randomBg =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];

    document.body.style.backgroundImage = `url(${randomBg})`;
  }, [location.pathname]);
}

export default useBackground;
