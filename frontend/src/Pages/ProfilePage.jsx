import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../CSS/Pages/ProfilePage.css';
import '../CSS/Pages/MainPage.css'
import Pouch from '../Props/Pouch';
import ThreadBox from '../Props/ThreadBox';

function ProfilePage(props) {
    const [showModal, setShowModal] = useState(false);

    const handlePfpClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('New profile picture selected:', file.name);
            // Handle file upload logic here
        }
        setShowModal(false);
    };

    return (
        <>
            <Navbar />

            <div className="profile-overview">
                <div
                    className="pfp"
                    onClick={handlePfpClick}
                    title="Click to edit profile picture"
                ></div>
                <h4>{props.name}</h4>
                <p>Member since {props.register_year}</p>
                <p>Likes: {props.likes}</p>
                <p className="bio">{props.bio}</p>
            </div>

            <div className="user-pouches">
                <div className="heading-container">
                    <p>View {props.name}'s content:</p>
                    <select name="Posts">
                        <option value="Pouches">Pouches</option>
                        <option value="Comments">Comments</option>
                    </select>
                </div>
                <ThreadBox
                    name="Quadspy"
                    title="Hello world"
                    timestamp="11/2/3023"
                    commentcount="45"
                    ratingcount="24"
                />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleModalClose}>
                            &times;
                        </span>
                        <h3>Change Profile Picture</h3>
                        <div className="pfp"></div>
                        <div className="pfp"></div>
                        <div className="pfp"></div>
                        <div className="pfp"></div>
                        <div className="pfp"></div>
                        <div className="pfp"></div>
                        <div className="pfp"></div>
                        <div className="pfp"></div>
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
