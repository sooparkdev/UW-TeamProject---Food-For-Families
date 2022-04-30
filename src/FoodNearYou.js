import Filterbar from "./Filterbar";
import Map from "./Map";

const FoodNearYou = () => {
    return ( 
        <div className="food-near-you">
            <Filterbar />
            <Map />
        </div>
     );
}
 
export default FoodNearYou;