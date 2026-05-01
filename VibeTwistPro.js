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

  const [customSong, setCustomSong] = useState(null);
  const [customSongName, setCustomSongName] = useState(""); // ✅ NEW

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

  const tracks = {
    EDM: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    Afrobeats: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    Funk: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  };

  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  // ✅ Upload custom music
  function uploadMusic(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setCustomSong(url);
    setCustomSongName(file.name); // ✅ capture name

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
  }

  async function toggleMusic() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      audioRef.current.src = customSong || tracks[song];
      audioRef.current.volume = Number(volume);
      audioRef.current.load();

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Music playback failed:", error);
      alert("Music could not play. Try again.");
    }
  }

  function generate() {
    setGenerated(false);
    setShowExport(false);
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2800);
  }

  return (
    <main className="app">
      <section className="hero">
        <div className="badge">MBA PREMIUM DEMO</div>
        <h1>👽 VibeTwist PRO</h1>
      </section>

      <section className="panel">
        <h2>Create Your Alien Performance</h2>

        <div className="control-grid">
          <label>
            Upload Photo
            <input type="file" accept="image/*" onChange={upload} />
          </label>

          {/* ✅ MUSIC UPLOAD */}
          <label>
            Upload Your Own Music
            <input type="file" accept="audio/*" onChange={uploadMusic} />
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

        {/* ✅ TRACK DISPLAY */}
        <div className="music-row">
          <button onClick={toggleMusic}>
            {isPlaying ? "Stop Music" : "Play Music"}
          </button>

          <div className="track-name">
            🎵 {customSongName || song}
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value);
              if (audioRef.current)
                audioRef.current.volume = e.target.value;
            }}
          />
        </div>
      </section>

      <section className="preview-card">
        <div className="action-row">
          <button className="generate" onClick={generate}>
            {isGenerating ? "Generating..." : "Generate"}
          </button>

          <button className="export" onClick={() => setShowExport(true)}>
            Export
          </button>

          {/* ✅ RESET BUTTON */}
          <button
            className="export"
            onClick={() => {
              setPhoto(null);
              setGenerated(false);
              setShowExport(false);
              setIsGenerating(false);
              setCustomSong(null);
              setCustomSongName("");
              setIsPlaying(false);

              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }}
          >
            Reset Demo
          </button>
        </div>
      </section>

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </main>
  );
}
