import React from "react";
import Button from "../../components/button/button";
import "./homepage.scss";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const Homepage = ({ currentUser }) => {
  return (
    <div className='homepage'>
      <div className='container'>
        <div className='emoji'>👋</div>
        <h1>
          This app is a<b> chat App</b> made by <br />
          <i> Jouda Ayoub</i> and <i>Tassaoui Imad</i>
        </h1>
        <div className='buttons'>
          {currentUser ? (
            <Link to='/chat'>
              <Button white>chat now</Button>
            </Link>
          ) : (
            <Link to='/signin'>
              <Button white>chat now</Button>
            </Link>
          )}
          <Button stroke>about us</Button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Homepage);
