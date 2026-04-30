import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VibeTwistPro() {
  const [avatar, setAvatar] = useState("green");
  const [dance, setDance] = useState("Hip Hop");
  const [song, setSong] = useState("EDM");
  const [photo, setPhoto] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultMode, setResultMode] = useState(null);
  const [funLevel, setFunLevel] = useState("Funny");
  const [scene, setScene] = useState("Haunted House");
  const [endingGag, setEndingGag] = useState("Disco Ball Crash");
  const [performanceStyle, setPerformanceStyle] = useState(
    "I Will Survive Energy"
  );
  const [mode, setMode] = useState("Solo Mode");
  const [dancerCount, setDancerCount] = useState(5);

  const audioRef = useRef(null);

  const aliens = {
    green: { emoji: "👽", name: "Green Alien DJ", className: "green" },
    blue: { emoji: "🛸", name: "Blue Space Queen", className: "blue" },
    robot: { emoji: "🤖", name: "Robot Cyborg", className: "robot" },
    gold: { emoji: "👑", name: "Gold VIP Alien", className: "gold" }
  };

  const avatarKeys = ["green", "blue", "robot", "gold"];

  const sceneData = {
    "Haunted House": {
      title: "Haunted House",
      label: "Entering the Haunted House",
      background:
        "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1400&q=80",
      icon: "🏚️"
    },
    "Alpha Tower": {
      title: "Alpha Tower",
      label: "Entering Alpha Tower",
      background:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
      icon: "🗼"
    },
Pyramids: {
  title: "Pyramids",
  label: "Entering the Pyramid Club",
  background:
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=80",
  icon: "🏜️"
},
    "Funky Doorway": {
      title: "Funky Doorway",
      label: "Entering the Funk Portal",
      background:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
      icon: "🚪"
    },
    "Alien Club": {
      title: "Alien Club",
      label: "Entering the Alien Club",
      background:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80",
      icon: "🪩"
    }
  };

  const musicTracks = {
    EDM: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    Afrobeats: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "Funk Groove": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "Disco Beat": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  };

  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function playMusic() {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function changeVolume(e) {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  function changeSong(e) {
    setSong(e.target.value);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function generateDance() {
    setResultMode(null);
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setResultMode("done");
    }, 2500);
  }

  const currentAlien = aliens[avatar];
  const currentScene = sceneData[scene];

  const groupDancers = Array.from({ length: Number(dancerCount) }, (_, i) => {
    const key = avatarKeys[i % avatarKeys.length];
    return aliens[key];
  });

  return (
    <main className="app">
      <section className="hero">
        <div className="badge">MBA Demo Mode</div>
        <h1>👽 VibeTwist PRO</h1>
        <p>
          Upload a solo or group photo, choose alien bodies, enter a realistic
          dance area, pick music, and generate a club-style alien performance.
        </p>
      </section>

      <section className="card">
        <h2>Create Your Alien Performance</h2>

        <div className="controls">
          <input type="file" accept="image/*" onChange={upload} />

          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Solo Mode</option>
            <option>Group Club Mode</option>
          </select>

          {mode === "Group Club Mode" && (
            <select
              value={dancerCount}
              onChange={(e) => setDancerCount(Number(e.target.value))}
            >
              <option value={3}>3 Alien Dancers</option>
              <option value={5}>5 Alien Dancers</option>
              <option value={8}>8 Alien Dancers</option>
              <option value={10}>10 Alien Dancers</option>
            </select>
          )}

          <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
            <option value="green">Green Alien DJ</option>
            <option value="blue">Blue Space Queen</option>
            <option value="robot">Robot Cyborg</option>
            <option value="gold">Gold VIP Alien</option>
          </select>

          <select value={scene} onChange={(e) => setScene(e.target.value)}>
            <option>Haunted House</option>
            <option>Alpha Tower</option>
            <option>Pyramids</option>
            <option>Funky Doorway</option>
            <option>Alien Club</option>
          </select>

          <select value={dance} onChange={(e) => setDance(e.target.value)}>
            <option>Hip Hop</option>
            <option>Shuffle</option>
            <option>Breakdance</option>
            <option>Disco</option>
            <option>Ballroom</option>
            <option>Robot Dance</option>
          </select>

          <select value={song} onChange={changeSong}>
            <option>EDM</option>
            <option>Afrobeats</option>
            <option>Funk Groove</option>
            <option>Disco Beat</option>
          </select>

          <select value={funLevel} onChange={(e) => setFunLevel(e.target.value)}>
            <option>Subtle</option>
            <option>Funny</option>
            <option>Absurd</option>
          </select>

          <select
            value={performanceStyle}
            onChange={(e) => setPerformanceStyle(e.target.value)}
          >
            <option>I Will Survive Energy</option>
            <option>Confident Alien Diva</option>
            <option>Awkward Karaoke Alien</option>
            <option>Disco Disaster Mode</option>
            <option>Overdramatic Space Idol</option>
          </select>

          <select
            value={endingGag}
            onChange={(e) => setEndingGag(e.target.value)}
          >
            <option>Disco Ball Crash</option>
            <option>Spotlight Fails</option>
            <option>Alien Trips</option>
            <option>Crowd Goes Wild</option>
            <option>Freeze Frame Pose</option>
            <option>Microphone Drop</option>
          </select>

          <button onClick={playMusic}>
            {isPlaying ? "Stop Music" : "Play Music Preview"}
          </button>

          <div className="volume-box">
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={changeVolume}
            />
          </div>

          <div className={`waveform ${isPlaying ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section className="preview-card">
        <h2>AI Scene Preview</h2>

        <div
          className="real-scene-stage"
          style={{ backgroundImage: `url(${currentScene.background})` }}
        >
          <div className="scene-overlay"></div>

          <div className="scene-title">
            {currentScene.icon} {currentScene.title}
          </div>

          <motion.div
            className="portal-door"
            animate={{
              scale: isPlaying ? [1, 1.06, 1] : [1, 1.03, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <span>{currentScene.label}</span>
          </motion.div>

          <div
            className="disco-real"
            style={{
              animation: isPlaying
                ? "spin 1s linear infinite"
                : "spin 6s linear infinite"
            }}
          >
            🪩
          </div>

          {mode === "Solo Mode" ? (
            <motion.div
              className="solo-real-dancer"
              animate={{
                y: isPlaying ? [0, -18, 0] : [0, -6, 0],
                rotate: isPlaying ? [0, -6, 6, 0] : [0, -2, 2, 0]
              }}
              transition={{ repeat: Infinity, duration: isPlaying ? 0.8 : 1.5 }}
            >
              <AlienDancer alien={currentAlien} photo={photo} large />
            </motion.div>
          ) : (
            <div className="real-club-floor">
              {groupDancers.map((dancer, index) => (
                <motion.div
                  key={index}
                  className={`real-mini-dancer dancer-${index}`}
                  animate={{
                    y: isPlaying ? [0, -16, 0] : [0, -5, 0],
                    rotate: isPlaying ? [0, -8, 8, 0] : [0, -2, 2, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.7 + index * 0.04,
                    delay: index * 0.08
                  }}
                >
                  <AlienDancer alien={dancer} photo={photo} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="production-note">
            Demo mode uses realistic scene backgrounds and face-source mapping.
            Production would use AI to detect each person’s face and generate
            the full video scene.
          </div>
        </div>

        <p className="caption">
          {mode === "Solo Mode"
            ? `${currentAlien.name} performing ${dance} to ${song}`
            : `${dancerCount} alien dancers performing ${dance} to ${song}`}{" "}
          inside <strong>{scene}</strong> with{" "}
          <strong>{performanceStyle}</strong> and ending:{" "}
          <strong>{endingGag}</strong>
        </p>

        <button className="generate" onClick={generateDance}>
          {isGenerating ? "Generating..." : "Generate Dancing GIF"}
        </button>

        {isGenerating && (
          <div className="ai-thinking">
            🧠 Building {scene} environment... placing alien bodies... syncing
            beat... creating performance preview...
          </div>
        )}

        {resultMode === "done" && (
          <div className="results">
            <h3>✨ Your Alien Performances</h3>

            <div className="result-grid">
              <div>
                <span>{currentScene.icon}</span>
                <strong>Environment Cut</strong>
                <p>
                  {mode === "Solo Mode"
                    ? `Full-body alien dancing inside ${scene}.`
                    : `${dancerCount} alien dancers clubbing inside ${scene}.`}
                </p>
              </div>

              <div>
                <span>🪩</span>
                <strong>Disco Crash Cut</strong>
                <p>{endingGag} ending inspired by old-school alien comedy.</p>
              </div>

              <div>
                <span>🤪</span>
                <strong>Chaos Cut</strong>
                <p>{funLevel} comedy remix with dramatic alien energy.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="features">
        <div>🌍 Realistic Scene Backgrounds</div>
        <div>👽 Solo or Group Mode</div>
        <div>🎬 Viral Performance Cut</div>
      </section>

      <audio
        ref={audioRef}
        src={musicTracks[song]}
        onEnded={() => setIsPlaying(false)}
      />
    </main>
  );
}

function AlienDancer({ alien, photo, large = false }) {
  return (
    <div className={large ? "alien-dancer large" : "alien-dancer"}>
      <div className={`alien-body-card ${alien.className}`}>
        <div className="alien-face-slot">
          {photo ? (
            <img src={photo} alt="Face source" />
          ) : (
            <span>{alien.emoji}</span>
          )}
        </div>

        <div className="alien-chest">{alien.emoji}</div>
        <div className="alien-arms-row">╲┃╱</div>
        <div className="alien-legs-row">╱ ╲</div>
      </div>
    </div>
  );
}
