const NeonText = ({ text, color }) => {
  return (
    <h1
      className={`font-kode text-4xl md:text-6xl font-bold ${color} drop-shadow-[0_0_5px]`}
    >
      {text}
      <span className={`block w-full h-1 mt-2 ${color}`}></span>
    </h1>
  );
};
export default NeonText;
