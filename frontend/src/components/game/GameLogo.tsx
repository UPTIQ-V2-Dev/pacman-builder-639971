export const GameLogo = () => {
  return (
    <div className="text-center mb-8">
      <div className="text-6xl md:text-8xl font-bold text-yellow-400 mb-4 animate-pulse">
        PAC-MAN
      </div>
      <div className="flex justify-center items-center gap-2 text-2xl">
        <span className="text-yellow-400">●</span>
        <span className="text-blue-400">👻</span>
        <span className="text-pink-400">👻</span>
        <span className="text-cyan-400">👻</span>
        <span className="text-orange-400">👻</span>
      </div>
    </div>
  );
};