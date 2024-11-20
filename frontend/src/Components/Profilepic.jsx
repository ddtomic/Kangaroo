import defaultImage from '../assets/images/ProfilePics/kangaroo.jpg'; // Import the default image


function Profilepic(props) {
  return (
    <>
      <div
        className="pfp-container"
        style={{
            //set pfp, using kangaroo as default
          backgroundImage: `url(${props.imageUrl || defaultImage})`, 
          height: '100px', 
          width: '100px',
          borderRadius: '50%',
          backgroundSize: '100% 100%',
          margin: '10px',
          position: 'relative',
        }}
        onClick={props.onClick}
      >
      </div>
    </>
  );
}

// Setting kangaroo pic as default
Profilepic.defaultProps = {
  imageUrl: defaultImage,
};

export default Profilepic;
