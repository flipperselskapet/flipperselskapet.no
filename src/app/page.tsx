export default function Home() {
  console.log("testing staging");
  return (
    <div
      className="h-screen m-0"
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
    </div>
  );
}
