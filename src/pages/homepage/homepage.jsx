import React from "react";
import Button from "../../components/button/button";
import "./homepage.scss";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="container">
        <div className="emoji">👋</div>
        <h1>
          This app is a<b> chat App</b> made by <br />
          <i> Jouda Ayoub</i> and <i>Tassaoui Imad</i>
        </h1>
        <div className="buttons">
          <Button white>chat now</Button>
          <Button stroke>about us</Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
