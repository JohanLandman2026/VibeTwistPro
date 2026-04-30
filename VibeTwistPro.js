import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VibeTwistPro() {
  const [avatar, setAvatar] = useState("/aliens/alien1.png");
  const [dance, setDance] = useState("Hip Hop");
  const [song, setSong] = useState("EDM");
  const [scene, setScene] = useState("Alien Club");
  const [mode, setMode] = useState("Solo Mode");
  const [dancerCount, setDancerCount] = useState(5);
  const [photo, setPhoto] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const audioRef = useRef(null);

  const aliens = [
    { name: "Green Alien DJ", image: "/aliens/alien1.png" },
    { name: "Space Diva Alien", image: "/aliens/alien2.png.jpg" },
    { name: "Cyborg Alien", image: "/aliens/alien3.png.jpg" },
    { name: "Boss Alien", image: "/aliens/alien4.png.jpg" }
  ];

  const gifs = {
    "Hip Hop": "/gifs/dance1.gif",
    Shuffle: "/gifs/dance3.gif",
    Breakdance: "/gifs/dance1.gif",
    Disco: "/gifs/dance3.gif"
  };

  const tracks = {
    EDM: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    Afrobeats: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    Funk: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  };

  const scenes = {
    "Alien Club":
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80",
    "Haunted House":
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1400&q=80",
    Pyramids:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=80",
    "Funky Doorway":
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80"
  };

  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function toggleMusic() {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.src = tracks[song];
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function generate() {
    setGenerated(false);
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2500);
  }

  const selectedAlien =
    aliens.find((a) => a.image === avatar) || aliens[0];

  const dancers = Array.from({ length: Number(dancerCount) }, (_, i) => {
    return aliens[i % aliens.length];
  });

  return (
    <main className="app">
      <section className="hero">
        <div className="badge">MBA DEMO MODE</div>
        <h1>👽 VibeTwist PRO</h1>
        <p>
          Upload a face or group photo, choose an alien style, enter a scene,
          and generate a viral dancing alien performance.
        </p>
      </section>

      <section className="panel">
        <h2>Create Your Alien Performance</h2>

        <div className="control-grid">
          <label>
            Upload Photo
            <input type="file" accept="image/*" onChange={upload} />
          </label>

          <label>
            Mode
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option>Solo Mode</option>
              <option>Group Club Mode</option>
            </select>
          </label>

          {mode === "Group Club Mode" && (
            <label>
              Dancers
              <select
                value={dancerCount}
                onChange={(e) => setDancerCount(e.target.value)}
              >
                <option value={3}>3 dancers</option>
                <option value={5}>5 dancers</option>
                <option value={8}>8 dancers</option>
                <option value={10}>10 dancers</option>
              </select>
            </label>
          )}

          <label>
            Alien Style
            <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
              {aliens.map((alien) => (
                <option key={alien.image} value={alien.image}>
                  {alien.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Dance Area
            <select value={scene} onChange={(e) => setScene(e.target.value)}>
              <option>Alien Club</option>
              <option>Haunted House</option>
              <option>Pyramids</option>
              <option>Funky Doorway</option>
            </select>
          </label>

          <label>
            Dance Style
            <select value={dance} onChange={(e) => setDance(e.target.value)}>
              <option>Hip Hop</option>
              <option>Shuffle</option>
              <option>Breakdance</option>
              <option>Disco</option>
            </select>
          </label>

          <label>
            Song
            <select value={song} onChange={(e) => setSong(e.target.value)}>
              <option>EDM</option>
              <option>Afrobeats</option>
              <option>Funk</option>
            </select>
          </label>
        </div>

        <div className="music-row">
          <button onClick={toggleMusic}>
            {isPlaying ? "Stop Music" : "Play Music Preview"}
          </button>

          <div className="volume-box">
            <span>Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                if (audioRef.current) audioRef.current.volume = e.target.value;
              }}
            />
          </div>

          <div className={`waveform ${isPlaying ? "active" : ""}`}>
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="preview-card">
        <h2>AI Scene Preview</h2>

        <div
          className={`scene-stage ${generated ? "generated" : ""}`}
          style={{ backgroundImage: `url(${scenes[scene]})` }}
        >
          <div className="scene-dark"></div>

          <motion.div
            className="club-door"
            initial={false}
            animate={generated ? { scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] } : {}}
            transition={{ repeat: generated ? Infinity : 0, duration: 1.6 }}
          >
            <span>Entering {scene}</span>
          </motion.div>

          <div className="scene-chip">{scene}</div>
          <div className="disco-ball">🪩</div>

          {mode === "Solo Mode" ? (
            <motion.div
              className="solo-dancer"
              animate={{ y: isPlaying || generated ? [0, -16, 0] : [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            >
              <AlienCharacter alien={selectedAlien} photo={photo} large />
            </motion.div>
          ) : (
            <div className="group-floor">
              {dancers.map((alien, index) => (
                <motion.div
                  key={index}
                  className="group-dancer"
                  animate={{
                    y: isPlaying || generated ? [0, -14, 0] : [0, -4, 0],
                    rotate: isPlaying || generated ? [0, -5, 5, 0] : [0, -2, 2, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.75 + index * 0.04,
                    delay: index * 0.05
                  }}
                >
                  <AlienCharacter alien={alien} photo={photo} />
                </motion.div>
              ))}
            </div>
          )}

          {generated && (
            <img src={gifs[dance]} className="dance-gif-overlay" />
          )}

          <div className="ai-note">
            Demo AI: face-source mapping, scene selection, dancing GIF preview.
            Production version would use face detection and AI video generation.
          </div>
        </div>

        <p className="caption">
          {mode === "Solo Mode"
            ? selectedAlien.name
            : `${dancerCount} alien dancers`}{" "}
          performing <strong>{dance}</strong> to <strong>{song}</strong> inside{" "}
          <strong>{scene}</strong>.
        </p>

        <div className="action-row">
          <button className="generate" onClick={generate}>
            {isGenerating ? "Generating AI Performance..." : "Generate Dancing GIF"}
          </button>

          <button className="export" onClick={() => setShowExport(true)}>
            Export to TikTok
          </button>
        </div>

        {isGenerating && (
          <div className="ai-thinking">
            🧠 Detecting faces... assigning alien bodies... opening club portal...
            syncing dance to beat...
          </div>
        )}

        {showExport && (
          <div className="export-card">
            <h3>📱 TikTok Export Ready</h3>
            <p>Demo export package created: vertical video, caption, hashtags.</p>
            <p>#VibeTwist #AlienDance #MBAStartup</p>
            <button onClick={() => setShowExport(false)}>Close</button>
          </div>
        )}
      </section>

      <section className="features">
        <div>🧠 AI Face Detection Demo</div>
        <div>🎬 Dancing Video Preview</div>
        <div>📱 TikTok Export Flow</div>
      </section>

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </main>
  );
}

function AlienCharacter({ alien, photo, large = false }) {
  return (
    <div className={large ? "alien-character large" : "alien-character"}>
      <img src={alien.image} className="alien-asset" alt={alien.name} />

      {photo && (
        <div className="face-bubble">
          <img src={photo} alt="Face source" />
        </div>
      )}
    </div>
  );
}
