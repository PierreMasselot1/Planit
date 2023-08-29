import Logo from "../images/LogoLarge.svg";

export default function Home() {
  return (
    <div className="text-white justify-center align-middle text-center">
      <div className=" text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold my-auto">
        <img src={Logo} alt="Rainbump Logo" className="mx-auto" />
      </div>
      <div>This is the home menu</div>
    </div>
  );
}
