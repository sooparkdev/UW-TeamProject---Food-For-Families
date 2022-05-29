// Import CSS Styles
import '../styles/Form.css'

// Import Libraries
import { Link } from 'react-router-dom';

const NotFound = () => {
    window.scrollTo(0, 0)
    return (
        <div className="form-complete-page">
            <div className="form-complete-section">
                <h1>Form Complete!</h1>
                <p>Thank you for submitting your Food Resource application! The admins have received an email containing all your Food Resource data and it will be approved promptly! If the admins approve of the new food resource, it will be added to our database and map accordingly! You will receive no further confirmation.</p>
                <div className="link">
                    <Link to="/" className='linkText'>Return to Homepage</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;