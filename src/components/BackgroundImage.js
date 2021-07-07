import image_8_login from "../img/image_8_login.png";
import "../css/BackgroundImage.css";

function BackgroundImage() {
  return (
    <div>
      <img
        alt="background"
        src={image_8_login}
        className="BackgroundImage-bg-image"
      />
      <div className="BackgroundImage-bg-image-gradient-overlay"></div>
      <div className="BackgroundImage-bg-image-gradient-overlay-two"></div>
    </div>
  );
}

export default BackgroundImage;
