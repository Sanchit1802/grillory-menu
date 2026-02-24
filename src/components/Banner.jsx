import grilloryLogo from "../../public/images/grillory-logo.jpg";
import "./Banner.css";

export default function Banner() {
  return (
    <header className="banner">
      <img src={grilloryLogo} alt="Grillory Logo" />
    </header>
  );
}
