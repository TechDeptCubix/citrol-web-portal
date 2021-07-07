import "../css/Loading.css";
import loadingImage from "../img/Loading_icon.gif";

function LoadingScreen() {
  return (
    <div className="LoadingScreen-main-content">
      <img src={loadingImage} />
      <p>Loading data ...</p>
    </div>
  );
}

export default LoadingScreen;
