import "../App.css";
import hero from "../assets/hero.png";

const Home = () => {
  return (
    <div>
      <div>About</div>
      <img src="../favicon.svg" />
      <img src={hero} />
    </div>
  );
};

export default Home;
