import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../Components/Navbar';
import '../CSS/Pages/ProfilePage.css';
import '../CSS/Pages/MainPage.css';
import ThreadBox from '../Props/ThreadBox';
import Profilepic from '../Components/Profilepic';

//importing all images
import dogImage from '../assets/images/ProfilePics/dog.jpg'; // Import the dog image
import giraffeImage from '../assets/images/ProfilePics/giraffe.jpg';
import hedgehogImage from '../assets/images/ProfilePics/hedgehog.jpg';
import kangarooImage from '../assets/images/ProfilePics/kangaroo.jpg';
import pandaImage from '../assets/images/ProfilePics/panda.jpg';
import squirrelImage from '../assets/images/ProfilePics/squirrel.jpg';
import tigerImage from '../assets/images/ProfilePics/tiger.jpg';
import turtleImage from '../assets/images/ProfilePics/turtle.jpg';



function ProfilePage(props) {
    //get current location
    const location = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState("Pouches");

    const isProfilePage = location.pathname === '/Profile'; // Check if we are on the profile page
    const handlePfpClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    //This is called when a new PFP is clicked
    const handleNewPfpClick = (id) => {
        let pfpName = id.concat(".png");
        console.log('Clicked PFP ID:', pfpName);
        setShowModal(false);
    };

    const handleSelectChange = (event) => {
        setSelectedContent(event.target.value);  // Update  state when dropdown changes
    };

    return (
        <>
         <div className={isProfilePage ? 'profile-page' : ''}>
            <Navbar />

            <div className="profile-overview">
                {/* User PFP */}
                <Profilepic onClick={handlePfpClick} />
                {/* Username */}
                <h4>{props.name}</h4>
                {/* Member since year */}
                <p>Member since {props.register_year}</p>
                {/* Amount of LIkes */}
                <p>Likes: {props.likes}</p>
                {/* Bio */}
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
                        {/* Close Button */}
                        <span className="close" onClick={handleModalClose}>
                            &times;
                        </span>

                        <h3>Change Profile Picture</h3>

                        {/* All PFP Options */}
                        <div className="pfpContainer">
                            <Profilepic imageUrl = {dogImage} onClick={() => handleNewPfpClick('dog')}/>
                            <Profilepic imageUrl = {giraffeImage} onClick={() => handleNewPfpClick('giraffe')} />
                            <Profilepic imageUrl = {hedgehogImage} onClick={() => handleNewPfpClick('hedgehog')}/>
                            <Profilepic imageUrl = {kangarooImage} onClick={() => handleNewPfpClick('kangaroo')}/>
                            <Profilepic imageUrl = {pandaImage} onClick={() => handleNewPfpClick('panda')}/>
                            <Profilepic imageUrl = {squirrelImage} onClick={() => handleNewPfpClick('squirrel')}/>
                            <Profilepic imageUrl = {tigerImage} onClick={() => handleNewPfpClick('tiger')}/>
                            <Profilepic imageUrl = {turtleImage} onClick={() => handleNewPfpClick('turtle')}/>

                        </div>
                    </div>
                </div>
            )}
            </div>
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
