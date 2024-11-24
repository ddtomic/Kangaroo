import React from "react";
import propTypes from "prop-types";

function Profilepic(props) {
  Profilepic.propTypes = {
    pfpUrl: propTypes.string,
    classname: propTypes.string,
  };

  return (
    <>
      <div
        className={props.classname}
        style={{
          height: "100px",
          width: "100px",
          margin: "10px",
          position: "relative",
        }}
        onClick={props.onClick}
      >
        <img
          src={props.pfpUrl}
          alt="error"
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    </>
  );
}

export default Profilepic;
