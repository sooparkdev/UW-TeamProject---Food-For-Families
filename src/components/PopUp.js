

const PopUp = ( {foodResource} ) => {
    // console.log("pop up triggered")
    // console.log(foodResource)
    console.log()
    return (
          <div className="marker-popup">
            <h1> Type: </h1> 
            <p> {foodResource.food_resource_type? foodResource.food_resource_type.join(', ') : "N/A" } </p> 
            <h1> Description: </h1> 
            <p> {foodResource.description? foodResource.description : "N/A" } </p> 
            <h1> Address: </h1> 
            <address> {foodResource.address? foodResource.address : "N/A" } </address>
            <h1> Phone Number: </h1> 
            <a href={"tel:" + foodResource.phone_number? foodResource.phone_number : "N/A" }> {foodResource.phone_number? foodResource.phone_number : "N/A"} </a>
            <h1> Operating Hours: </h1> 
            {/* <p> {foodResource.operating_hours.food_bank_hours? "Food Bank: " + foodResource.operating_hours.food_bank_hours[0] : "N/A"} </p> */}
            <h1> Distance: </h1> 
            <p> { foodResource.distance? foodResource.distance + " miles" : "N/A"  }</p>
          </div>
    )
}

export default PopUp;