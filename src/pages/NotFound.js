// Import Libraries
import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h1> 404 </h1>
            <p> Sorry, This page cannot be found </p>
            <div className="link">
                <Link to ="/"> Go to Homepage <span className="material-symbols-outlined">arrow_right_alt</span> </Link>
            </div>
        </div>
    );
}
 
export default NotFound;