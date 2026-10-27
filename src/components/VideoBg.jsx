"use client";

import { useEffect, useRef, useState } from "react";

// Muted looping video that fades in over whatever image sits beneath it.
// If the file is missing or fails to load, it renders nothing and the image stays.
export default function VideoBg({ src, className = "" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (v.error || v.networkState === 3) setFailed(true);
    else if (v.readyState >= 2) setReady(true);
  }, []);

  if (failed) return null;

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onLoadedData={() => setReady(true)}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:hidden ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
