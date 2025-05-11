const LetsConnect = () => {
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
        <div className="mt-10 grid grid-cols-2 gap-6 place-items-center sm:w-[90%] mx-auto">
          <a href="https://instagram.com" className="neon-button">Instagram</a>
          <a href="https://linkedin.com" className="neon-button">LinkedIn</a>
          <a href="https://twitter.com" className="neon-button col-span-2">X</a>
          <a href="https://discord.com" className="neon-button">Discord</a>
          <a href="https://facebook.com" className="neon-button">Facebook</a>
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

export default LetsConnect;
