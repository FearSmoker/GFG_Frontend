import React, { useEffect, useState } from "react";

const ConnectPage = () => {
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setUser(userData);

    fetch("  ", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error("Failed to fetch socials:", err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-6">
      <div className="text-center text-white w-full max-w-lg">
        <h1 className="text-4xl sm:text-5xl font-bold uppercase neon-title relative inline-block">
          <span className="relative">
            Let’s
            <span className="underline-white"></span>
          </span>
          <span className="text-neonGreen glow-green relative">
            Connect
            <span className="underline-green"></span>
          </span>
        </h1>

        {user && (
          <p className="text-neonGreen mt-4 text-lg">Welcome, {user.username}!</p>
        )}

        <div className="mt-10 grid grid-cols-2 gap-6 place-items-center sm:w-[90%] mx-auto">
          {links.map(({ name, url }) => (
            <a key={name} href={url} className="neon-button" target="_blank" rel="noreferrer">
              {name}
            </a>
          ))}
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

          .neon-title {
            font-family: 'Orbitron', sans-serif;
            display: flex;
            justify-content: center;
            gap: 10px;
          }

          .underline-white {
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 3px;
            background: white;
          }

          .underline-green {
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 3px;
            background: #00ff99;
          }

          .glow-green {
            text-shadow: 0 0 10px #00ff99, 0 0 20px #00ff99, 0 0 30px #00ff99;
          }

          .neon-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 180px;
            height: 50px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            color: #00ccff;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
            border: 3px solid;
            border-image-source: linear-gradient(90deg, #00ccff, #00ff99);
            border-image-slice: 1;
          }

          .neon-button:hover {
            background: linear-gradient(90deg, #00ccff, #00ff99);
            color: black;
            box-shadow: 0 0 20px #00ccff, 0 0 30px #00ff99;
          }
        `}
      </style>
    </div>
  );
};

export default ConnectPage;
