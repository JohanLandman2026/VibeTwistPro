import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VibeTwistPro() {
  const [avatar, setAvatar] = useState("alien1.png");
  const [dance, setDance] = useState("Hip Hop");
  const [song, setSong] = useState("EDM");
  const [photo, setPhoto] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  // 🎵 MUSIC TRACKS
  const tracks = {
    EDM: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    Afrobeats: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    Funk: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  };

  // 🛸 ALIEN ASSETS (MATCH YOUR FILES)
  const aliens = [
    "/aliens/alien1.png",
    "/aliens/alien2.png.jpg",
    "/aliens/alien3.png.jpg",
    "/aliens/alien4.png.jpg"
  ];

  // 💃 GIFS (ONLY REAL FILES)
  const gifs = [
    "/gifs/dance1.gif",
    "/gifs/dance3.gif"
  ];

  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function playMusic() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.src = tracks[song];
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <main className="app">
      {/* HERO */}
      <section className="hero">
        <div className="badge">MBA DEMO MODE</div>
        <h1>👽 VibeTwist PRO</h1>
        <p>Create viral alien dance experiences with your face</p>
      </section>

      {/* CONTROLS */}
      <section className="card">
        <h2>Create Your Alien</h2>

        <div className="controls">
          <input type="file" accept="image/*" onChange={upload} />

          <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
            {aliens.map((a) => (
              <option key={a} value={a}>
                {a.split("/").pop()}
              </option>
            ))}
          </select>

          <select value={dance} onChange={(e) => setDance(e.target.value)}>
            <option>Hip Hop</option>
            <option>Shuffle</option>
            <option>Breakdance</option>
            <option>Disco</option>
          </select>

          <select value={song} onChange={(e) => setSong(e.target.value)}>
            <option>EDM</option>
            <option>Afrobeats</option>
            <option>Funk</option>
          </select>

          <button onClick={playMusic}>
            {isPlaying ? "Stop Music" : "Play Music"}
          </button>
        </div>

        {/* VOLUME */}
        <div className="volume">
          <label>Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </section>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />

      {/* PREVIEW */}
      <section className="preview-card">
        <h2>Live Preview</h2>

        <motion.div
          className="alien-stage"
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {/* DISCO BALL */}
          <div className="disco">🪩</div>

          {/* ALIEN BODY */}
          <div className="alien-body">
            <img src={avatar} className="alien-img" />

            {/* FACE OVERLAY */}
            {photo && (
              <img src={photo} className="face-overlay" />
            )}
          </div>

          {/* DANCER */}
          <div className="dancer">🕺</div>
        </motion.div>

        <p className="caption">
          Alien performing <b>{dance}</b> to <b>{song}</b>
        </p>

        <button
          className="generate"
          onClick={() =>
            window.open(gifs[Math.floor(Math.random() * gifs.length)])
          }
        >
          Generate Dancing GIF
        </button>
      </section>

      {/* VISUALIZER */}
      {isPlaying && (
        <div className="visualizer">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bar"></div>
          ))}
        </div>
      )}
    </main>
  );
}
