'use client';

import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function VibeTwistPro() {
  const [avatar, setAvatar] = useState('👽');
  const [dance, setDance] = useState('hipHop');
  const [song, setSong] = useState('EDM');
  const [img, setImg] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  // ✅ Safe object keys + Unicode emojis
  const gifs = {
    hipHop: '\u{1F57A}',      // 🕺
    shuffle: '\u{1F483}',     // 💃
    breakdance: '\u{1F938}'   // 🤸
  };

  const preview = useMemo(
    () => (img ? img : avatar),
    [img, avatar]
  );

  function upload(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg(r.result);
    r.readAsDataURL(f);
  }

  function play() {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-cyan-900 text-white p-8">
      <div className="max-w-6xl mx-auto grid gap-8">

        <div className="text-center space-y-4">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold"
          >
            👽 VibeTwist PRO
          </motion.h1>
          <p className="text-xl text-zinc-300">
            AI Dancing Alien Generator — Fully Deployable MBA Demo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white/10 p-6 space-y-4 backdrop-blur">
            <h2 className="text-2xl font-semibold">Create Your Alien</h2>

            <input type="file" accept="image/*" onChange={upload} />

            <select
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-3 rounded-xl text-black"
            >
              <option value="👽">Green Alien DJ</option>
              <option value="🛸">Blue Space Queen</option>
              <option value="🤖">Robot Cyborg</option>
              <option value="👑">Gold VIP Alien</option>
            </select>

            <select
              onChange={(e) => setDance(e.target.value)}
              className="w-full p-3 rounded-xl text-black"
            >
              <option value="hipHop">Hip Hop</option>
              <option value="shuffle">Shuffle</option>
              <option value="breakdance">Breakdance</option>
            </select>

            <select
              onChange={(e) => setSong(e.target.value)}
              className="w-full p-3 rounded-xl text-black"
            >
              <option>EDM</option>
              <option>Afrobeats</option>
              <option>Funk Groove</option>
            </select>

            <button
              onClick={play}
              className="w-full py-3 rounded-2xl bg-violet-500 font-bold"
            >
              Play Music Preview
            </button>

            <audio
              ref={audioRef}
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            />
          </div>

          <div className="rounded-3xl bg-white/10 p-6 space-y-4 backdrop-blur">
            <h2 className="text-2xl font-semibold">Live Preview</h2>

            <motion.div
              animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="aspect-square rounded-3xl bg-black/40 flex items-center justify-center text-8xl"
            >
              {img ? <img src={img} className="w-full h-full object-cover" /> : preview}
            </motion.div>

            <p className="text-zinc-300">
              {avatar} performing {dance} to {song} {gifs[dance]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
