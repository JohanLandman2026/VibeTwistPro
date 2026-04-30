import { useState } from "react";

export default function VibeTwistPro() {
  const [avatar, setAvatar] = useState("alien1");
  const [dance, setDance] = useState("dance1");
  const [photo, setPhoto] = useState(null);
  const [showGIF, setShowGIF] = useState(false);

  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  const aliens = {
    alien1: "/aliens/alien1.png",
    alien2: "/aliens/alien2.png",
    alien3: "/aliens/alien3.png",
    alien4: "/aliens/alien4.png"
  };

  const dances = {
    dance1: "/gifs/dance1.gif",
    dance2: "/gifs/dance2.gif",
    dance3: "/gifs/dance3.gif"
  };

  return (
    <main className="app">

      <h1>👽 VibeTwist PRO</h1>

      <div className="controls">
        <input type="file" accept="image/*" onChange={upload} />

        <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
          <option value="alien1">Green Alien DJ</option>
          <option value="alien2">Space Diva</option>
          <option value="alien3">Cyborg Alien</option>
          <option value="alien4">Boss Alien</option>
        </select>

        <select value={dance} onChange={(e) => setDance(e.target.value)}>
          <option value="dance1">Hip Hop</option>
          <option value="dance2">Shuffle</option>
          <option value="dance3">Disco</option>
        </select>

        <button onClick={() => setShowGIF(true)}>
          Generate Dancing GIF
        </button>
      </div>

      <div className="stage">

        {/* Alien */}
        <div className="alien-wrapper">
          <img src={aliens[avatar]} className="alien-body" />

          {photo && (
            <div className="face-overlay">
              <img src={photo} />
            </div>
          )}
        </div>

        {/* GIF overlay */}
        {showGIF && (
          <img src={dances[dance]} className="dance-gif" />
        )}

      </div>

    </main>
  );
}
