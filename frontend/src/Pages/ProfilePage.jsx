import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './ProfilePage.css';
import ThreadBox from '../Props/ThreadBox';

function ProfilePage(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState("Pouches");

    const handlePfpClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };


    const handleNewPfpClick = (id) => {
        let pfpName = id.concat(".png");
        console.log('Clicked PFP ID:', pfpName);
        // Additional logic (if needed)
        setShowModal(false);
    };

    const handleSelectChange = (event) => {
        setSelectedContent(event.target.value);  // Update the state when dropdown changes
    };

    return (
        <>
            <Navbar />

            <div className="profile-overview">
                <div
                    className="pfp"
                    onClick={handlePfpClick}
                    title="Click to edit profile picture">
                    <div className="overlay">
                        <div className="text">Change PFP</div>
                    </div>
                </div>

                <h4>{props.name}</h4>
                <p>Member since {props.register_year}</p>
                <p>Likes: {props.likes}</p>
                <p className="bio">{props.bio}</p>
            </div>

            <div className="user-pouches">
                <div className="heading-container">
                    <p>View {props.name}'s content:</p>
                    <select name="Posts" onChange={handleSelectChange} value={selectedContent}>
                        <option value="Pouches">Pouches</option>
                        <option value="Comments">Comments</option>
                    </select>
                </div>

                {/* Conditionally render ThreadBox or Pouch based on selection */}
                {selectedContent === "Pouches" && (
                    <ThreadBox
                        name="Quadspy"
                        title="Hello world"
                        timestamp="11/2/3023"
                        commentcount="45"
                        ratingcount="24"
                    />
                )}

                {selectedContent === "Comments" && (
<p>We render comments here.</p>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleModalClose}>
                            &times;
                        </span>
                        <h3>Change Profile Picture</h3>
                        <div className="pfpContainer">
                            <div
                                className="pfp"
                                id="kangaroo"
                                onClick={() => handleNewPfpClick('kangaroo')}
                            ></div>
                            <div
                                className="pfp"
                                id="dog"
                                onClick={() => handleNewPfpClick('dog')}
                            ></div>
                            <div
                                className="pfp"
                                id="giraffe"
                                onClick={() => handleNewPfpClick('giraffe')}
                            ></div>
                            <div
                                className="pfp"
                                id="hedgehog"
                                onClick={() => handleNewPfpClick('hedgehog')}
                            ></div>
                            <div
                                className="pfp"
                                id="panda"
                                onClick={() => handleNewPfpClick('panda')}
                            ></div>
                            <div
                                className="pfp"
                                id="squirrel"
                                onClick={() => handleNewPfpClick('squirrel')}
                            ></div>
                            <div
                                className="pfp"
                                id="tiger"
                                onClick={() => handleNewPfpClick('tiger')}
                            ></div>
                            <div
                                className="pfp"
                                id="turtle"
                                onClick={() => handleNewPfpClick('turtle')}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

ProfilePage.defaultProps = {
    name: "Guest",
    register_year: 2024,
    likes: 0,
    bio: "No Bio",
};

export default ProfilePage;
