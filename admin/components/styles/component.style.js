const bubbleInStyle = {
    backgroundColor: '#81B74E',
    color: 'white',
    /*borderRadius: '15px',*/
    borderRadius: '20px 20px 20px 3px',
    padding: '7px 15px',
    maxWidth: '60%', /* Adjust as needed */
    position: 'relative',
    top: '50%',
    left: '-10px',
    borderWidth: '10px 0 10px 10px',
    borderColor: 'transparent transparent transparent #81B74E',
    display: 'inline-block', /* This allows the span to respect width */
    wordWrap: 'break-word',
    content: '',
    borderStyle: 'solid',
    marginLeft: 'auto',
};

const bubbleOutStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    /*borderRadius: '15px',*/
    borderRadius: '20px 20px 3px 20px',
    padding: '7px 15px',
    maxWidth: '60%', /* Adjust as needed */
    position: 'relative',
    top: '50%',
    right: '-10px',
    borderWidth: '10px 10px 10px 0',
    borderColor: 'transparent #007bff transparent transparent',
    display: 'inline-block', /* This allows the span to respect width */
    wordWrap: 'break-word',
    content: '',
    borderStyle: 'solid',
    marginRight: 'auto',
};

const bubbleOutlineStartStyle = {
    fontFamily:'sans-serif',
    fontSize:'16px',
    padding:'10px 10px',
    textAlign:'start',
};

const bubbleOutlineEndStyle = {
    fontFamily:'sans-serif',
    fontSize:'16px',
    padding:'10px 10px',
    textAlign:'end',
};

const boxStyle = {
    overflowY: 'scroll',
    maxHeight: '50vh',
    scrollBehavior: 'smooth',
    position: 'relative',
    display:'flex',
    flexDirection: 'column-reverse',  
};

const spanTimeStyle = {
    fontFamily:'sans-serif',
    fontSize:'10px',
    padding:'10px 10px',
}

module.exports = {
    bubbleInStyle,
    bubbleOutStyle,
    boxStyle,
    bubbleOutlineStartStyle,
    bubbleOutlineEndStyle,
    spanTimeStyle,
};