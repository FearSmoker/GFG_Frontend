const NeonTextSmall = ({ text, color }) => {
  return (
    <span
      className={`font-kode  font-bold ${color} drop-shadow-[0_0_5px]`}
    >
      {text}
      <span className={`block w-full h-1 mt-2 ${color}`}></span>
    </span>
  );
};
export default NeonTextSmall;
