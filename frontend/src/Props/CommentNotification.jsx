import React from 'react'
import propTypes from 'prop-types'


CommentNotification.propTypes = {
    name: propTypes.string, 
    date: propTypes.string, 
    user: propTypes.string
}



function CommentNotification(props) {
    return(
        <div>
            <li>
                <div className='commented-container'>
                    <div className='commented-top'>
                        <h5>{props.name}</h5>
                        <h5>{props.date}</h5>
                    </div>
                    <div className="commented-bottom">
                        <h5>{props.user} commented on your post!</h5>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default CommentNotification