import React from "react";
import { useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";

function Home() {
  const location = useLocation();

  const containerStyle = {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh",
    display: "flex", // Use flex display
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Vertically center content
    color: "#fff",
    fontSize: "24px",
    textAlign: "center",
    padding: "20px",
  };

  const textStyle = {
    marginTop: "75px",
    fontFamily: "YourSelectedFont, sans-serif",
    fontSize: "36px",
    color: "#ffcc00",
    textShadow: "2px 2px 4px #000",
  };

  const additionalContentStyle = {
    marginTop: "20px", // Adjust the spacing
    color: "white",
    fontFamily:"bold",
    // background: "white"
  };

  return (
    <div style={containerStyle} className="homepage">
      <div className="homeinside">
      <h1 style={textStyle}>Hello {location.state.id} and welcome to the home</h1>
      <div style={additionalContentStyle}>
        <p>
          This is your personalized home page. 
        </p>
      </div>
      <SignOutButton />
      </div>
    </div>
  );
}

export default Home;
