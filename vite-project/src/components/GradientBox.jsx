const GradientBox = ({ text,color}) => {
  return (
    <div
      className={` flex items-center hover:cursor-pointer justify-center text-lg ${color}  text-white  font-semibold bg-black rounded-full w-fit `}
      style={{
        border: "4px solid transparent",
        backgroundImage:
          "linear-gradient(black, black), linear-gradient(to right, #22c55e, #2563eb)",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
      }}
    >
      {text}
    </div>
  );
};

export default GradientBox;
