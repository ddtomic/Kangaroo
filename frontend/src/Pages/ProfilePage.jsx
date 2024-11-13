import React from 'react';
import Navbar from '../Components/Navbar';
import './ProfilePage.css';
import Pouch from '../Props/Pouch';
import ThreadBox from '../Props/ThreadBox';
function ProfilePage(props){
    return(
        <>
        <Navbar/>

        <div className="profile-overview">
            <div className="pfp"></div>
                <h4>{props.name}</h4>
                <p>Member since {props.register_year}</p>
        </div>
        
        <div className="user-pouches">
        
        <div className="heading-container">
            <p>View {props.name}'s content:</p>
            <select name = "Posts">
                <option value = "Pouches">Pouches</option>
                <option value = "Comments">Comments</option>
            </select>
        </div>
        <ThreadBox name='Quadspy' title='Hello world' timestamp='11/2/3023' commentcount='45' ratingcount='24'></ThreadBox>

        </div>

    </>
    )
   
}
ProfilePage.defaultProps = {
    name: "Guest",
    register_year: 2024,
}

export default ProfilePage;