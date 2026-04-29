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
  const [scene, setScene] = useState("Space Disco");

  const audioRef = useRef(null);

  const aliens = {
    green: "👽",
    blue: "🛸",
    robot: "🤖",
    gold: "👑"
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

  return (
    <main className="app">
      <section className="hero">
        <div className="badge">MBA Demo Mode</div>
        <h1>👽 VibeTwist PRO</h1>
        <p>
          Upload your face, choose an alien avatar, pick a song, select a dance
          style, and generate a viral alien performance.
        </p>
      </section>

      <section className="card">
        <h2>Create Your Alien</h2>

        <div className="controls">
          <input type="file" accept="image/*" onChange={upload} />

          <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
            <option value="green">Green Alien DJ</option>
            <option value="blue">Blue Space Queen</option>
            <option value="robot">Robot Cyborg</option>
            <option value="gold">Gold VIP Alien</option>
          </select>

          <select value={dance} onChange={(e) => setDance(e.target.value)}>
            <option>Hip Hop</option>
            <option>Shuffle</option>
            <option>Breakdance</option>
            <option>Disco</option>
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

          <select value={scene} onChange={(e) => setScene(e.target.value)}>
            <option>Space Disco</option>
            <option>Alien Nightclub</option>
            <option>Moon Party</option>
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
        <h2>Live Preview</h2>

        <motion.div
          className="alien-stage"
          animate={{
            rotate: isPlaying ? [0, 5, -5, 0] : [0, 3, -3, 0],
            y: isPlaying ? [0, -12, 0] : [0, -8, 0],
            scale: isPlaying ? [1, 1.05, 1] : [1, 1.02, 1]
          }}
          transition={{ repeat: Infinity, duration: isPlaying ? 1 : 1.4 }}
        >
          <div
            className="disco"
            style={{
              animation: isPlaying
                ? "spin 1s linear infinite"
                : "spin 6s linear infinite"
            }}
          >
            🪩
          </div>

          <div className="alien-body">
            <div className="alien-head">
              {photo ? (
                <img src={photo} alt="Uploaded face" className="face-photo" />
              ) : (
                <span>{aliens[avatar]}</span>
              )}
            </div>

            <div className="alien-torso">{aliens[avatar]}</div>
            <div className="alien-legs">🕺</div>
          </div>
        </motion.div>

        <p className="caption">
          {aliens[avatar]} performing <strong>{dance}</strong> to{" "}
          <strong>{song}</strong> in <strong>{scene}</strong> (
          <strong>{funLevel}</strong> mode)
        </p>

        <button className="generate" onClick={generateDance}>
          {isGenerating ? "Generating..." : "Generate Dancing GIF"}
        </button>

        {isGenerating && (
          <div className="ai-thinking">
            🧠 Scanning face... syncing beat... choosing dance moves...
          </div>
        )}

        {resultMode === "done" && (
          <div className="results">
            <h3>✨ Your Alien Performances</h3>

            <div className="result-grid">
              <div>
                <span>😎</span>
                <strong>Clean Version</strong>
                <p>Polished alien performance.</p>
              </div>

              <div>
                <span>😂</span>
                <strong>Funniest Version</strong>
                <p>Maximum comedy contrast.</p>
              </div>

              <div>
                <span>🤪</span>
                <strong>Weirdest Version</strong>
                <p>Absurd alien chaos mode.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="features">
        <div>📱 TikTok Share Mode</div>
        <div>💃 Premium Dance Packs</div>
        <div>🎬 HD Export</div>
      </section>

      <audio
        ref={audioRef}
        src={musicTracks[song]}
        onEnded={() => setIsPlaying(false)}
      />
    </main>
  );
}
