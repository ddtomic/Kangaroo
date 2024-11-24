import React, { useState, useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../CSS/Pages/ProfilePage.css";
import "../CSS/Pages/MainPage.css";
import ThreadBox from "../Props/ThreadBox";
import Profilepic from "../Components/Profilepic";
import propTypes from "prop-types";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function ProfilePage(props) {
  ProfilePage.propTypes = {
    name: propTypes.string,
    register_year: propTypes.string,
    likes: propTypes.number,
    bio: propTypes.string,
    pfp: propTypes.string,
    userID: propTypes.number,
  };
  const { authState } = useContext(AuthContext);
  const { authUser, profileRefresh } = props;

  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState("Pouches");

  const handlePfpClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const postPFP = async (pfp) => {
    //updates users pfp value
    await axios
      .post("http://18.119.120.175:3002/auth/pfp", {
        userID: props.userID,
        pfp: pfp,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    profileRefresh();
  };

  //This is called when a new PFP is clicked
  const handleNewPfpClick = (id) => {
    postPFP(id);
    setShowModal(false);
  };

  const handleSelectChange = (event) => {
    setSelectedContent(event.target.value); // Update state when dropdown changes
  };

  return (
    <>
      {props.userID === authState.id ? (
        <div className={"profile-page"}>
          <Navbar />

          <div className="profile-overview">
            {/* User PFP */}
            <Profilepic pfpUrl={props.pfp} onClick={handlePfpClick} />
            {/* Username */}
            <h4>{props.name}</h4>
            {/* Member since year */}
            <p>Member since {props.register_year}</p>
            {/* Amount of LIkes */}
            <p>Score: {props.likes}</p>
            {/* Bio */}
            <p className="bio">{props.bio}</p>
          </div>

          <div className="user-pouches">
            <div className="heading-container">
              <p>View {props.name}'s content:</p>
              <select
                name="Posts"
                onChange={handleSelectChange}
                value={selectedContent}
              >
                <option value="Pouches">Pouches</option>
                <option value="Comments">Comments</option>
              </select>
            </div>

            {selectedContent === "Pouches" && (
              <ThreadBox
                name="Quadspy"
                title="Hello world"
                timestamp="11/2/3023"
                commentcount="45"
                ratingcount="13"
              />
            )}

            {selectedContent === "Comments" && <p>We render comments here.</p>}
          </div>

          {/* Modal */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                {/* Close Button */}
                <span className="close" onClick={handleModalClose}>
                  &times;
                </span>

                <h3>Change Profile Picture</h3>

                {/* All PFP Options */}
                <div className="pfpContainer">
                  <Profilepic
                    pfpUrl={"/assets/1.jpg"}
                    onClick={() => handleNewPfpClick(1)}
                  />
                  <Profilepic
                    pfpUrl={"/assets/2.jpg"}
                    onClick={() => handleNewPfpClick(2)}
                  />
                  <Profilepic
                    pfpUrl={"/assets/3.jpg"}
                    onClick={() => handleNewPfpClick(3)}
                  />
                  <Profilepic
                    pfpUrl={"/assets/0.jpg"}
                    onClick={() => handleNewPfpClick(0)}
                  />
                  <Profilepic
                    pfpUrl={"/assets/4.jpg"}
                    onClick={() => handleNewPfpClick(4)}
                  />
                  <Profilepic
                    pfpUrl={"/assets/5.jpg"}
                    onClick={() => handleNewPfpClick(5)}
                  />
                  <Profilepic
                    pfpUrl={"/assets/6.jpg"}
                    onClick={() => handleNewPfpClick(6)}
                  />
                  <Profilepic
                    pfpUrl={"/assets/7.jpg"}
                    onClick={() => handleNewPfpClick(7)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={"profile-page"}>
          <Navbar />

          <div className="profile-overview">
            {/* User PFP */}
            <Profilepic pfpUrl={props.pfp} />
            {/* Username */}
            <h4>{props.name}</h4>
            {/* Member since year */}
            <p>Member since {props.register_year}</p>
            {/* Amount of LIkes */}
            <p>Score: {props.likes}</p>
            {/* Bio */}
            <p className="bio">{props.bio}</p>
          </div>

          <div className="user-pouches">
            <div className="heading-container">
              <p>View {props.name}'s content:</p>
              <select
                name="Posts"
                onChange={handleSelectChange}
                value={selectedContent}
              >
                <option value="Pouches">Pouches</option>
                <option value="Comments">Comments</option>
              </select>
            </div>

            {selectedContent === "Pouches" && (
              <ThreadBox
                name="Quadspy"
                title="Hello world"
                timestamp="11/2/3023"
                commentcount="45"
                ratingcount="13"
              />
            )}

            {selectedContent === "Comments" && <p>We render comments here.</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
