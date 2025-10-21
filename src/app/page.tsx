export default function Home() {
  return (
    <div
      className="h-screen m-0 relative"
      style={{
        background: "#112 url(/wall.jpg) center no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center h-[250px] m-auto absolute top-0 left-0 right-0 bottom-0">
        <b className="neon-logo">
          Kri<span>s</span>tian<span>ia</span> flipp<span>er</span>sel
          <span>sk</span>ap
        </b>
      </div>
      <div className="absolute bottom-8 left-8">
        <a
          href="/xmas"
          className="text-gray-400 hover:text-gray-200 text-sm transition-colors opacity-50 hover:opacity-100"
        >
          XMAS 2025
        </a>
      </div>
      <div className="absolute bottom-8 right-8">
        <a
          href="/machines"
          className="text-gray-400 hover:text-gray-200 text-sm transition-colors opacity-50 hover:opacity-100"
        >
          Maskiner
        </a>
      </div>
    </div>
  );
}
