import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [clicked, setClicked] = useState(true);

    const handleMenuClick = () => {
        setClicked(!clicked); 
    }

    return (
        <nav className="navbar">
            <span className="material-symbols-outlined store"> storefront</span>            
            <Link to="/" id="websiteName"> <h1>Food For Friends </h1> </Link>
            <div className="menu-icon" onClick={handleMenuClick}> 
                <span className="material-symbols-outlined"> 
                    { clicked ? "menu" : "close" } 
                </span>
            </div>
            <div className={ clicked ? "links" : "links active" }>
                <Link to="/food-near-you"> Food Near You </Link>
                <Link to="/form"> Form </Link>
            </div>
        </nav>       
    );
}
 
export default NavBar;