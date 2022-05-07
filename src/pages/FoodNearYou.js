// Import Components
import FilterBar from '../components/FilterBar';
import Map from "../components/Map";

const FoodNearYou = () => {
    return ( 
        <div className="food-near-you">
            <FilterBar />
            <Map />
        </div>
     );
}

export default FoodNearYou;