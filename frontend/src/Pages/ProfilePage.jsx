import React from 'react';
import Navbar from '../Components/Navbar';
import './ProfilePage.css';
import Pouch from '../Props/Pouch';

function ProfilePage(props){
    return(
        <>
        <Navbar/>

        <div className="profile-overview">
            <div className="pfp"></div>
                <h4>{props.name}</h4>
                <p>Member since {props.register_year}</p>
        </div>
        
        <div className="user-roos">
        </div>

    </>
    )
   
}
ProfilePage.defaultProps = {
    name: "Guest",
    register_year: 2024,
}

export default ProfilePage;