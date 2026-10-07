import { useEffect, useState } from "react";

const particles = Array.from({ length: 18 }, (_, index) => index);

export function FallingParticles() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const update = () => setPaused(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <div className="falling-particles" aria-hidden="true" data-paused={paused}>
      {particles.map((index) => <span className="falling-particle" key={index} />)}
    </div>
  );
}
