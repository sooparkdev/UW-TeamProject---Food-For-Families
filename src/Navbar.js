import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <span className="material-symbols-outlined store"> storefront</span>            
            <Link to="/" id="websiteName"> <h1>Food For Friends </h1> </Link>
            <div className="links">
                <Link to="/food-near-you"> Food Near You </Link>
                <Link to="/form"> Form </Link>
            </div>
        </nav>       
    );
}
 
export default Navbar;