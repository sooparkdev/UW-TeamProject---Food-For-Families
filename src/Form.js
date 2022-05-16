import React from 'react';

const Form = () => {
    return ( 
        <div className="form">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
          <h1>Food Resource Submission Form</h1>
          <p>Fields marked * are required!</p>

        <form>
          <div class="form-group">
            <div class="form-check form-check-inline">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="foodBank"/>
                <label class="form-check-label" for="foodBank">
                  Food Bank
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="meal"/>
                <label class="form-check-label" for="meal">
                  Meal
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="communityFridge"/>
                <label class="form-check-label" for="communityFridge">
                  Community Fridge
                </label>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="exampleName">Your Full Name*</label>
              <input type="number" class="form-control" id="exampleName" placeholder="John Doe"/>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleNumber">Your Number*</label>
              <input type="number" class="form-control" id="exampleNumber" placeholder="XXX-XXX-XXXX"/>
            </div>
          </div>

          <div class="form-group">
            <label for="exampleEmail">Your Email*</label>
            <input type="email" class="form-control" id="exampleEmail" placeholder="example@gmail.com"/>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="exampleOrgName">Food Resource Name*</label>
              <input type="orgName" class="form-control" id="exampleOrgName" placeholder="Food for Friends"/>
            </div>
            <div class="form-group col-md-6">
            <label for="exampleOrgNumber">Food Resource Number*</label>
            <input type="orgName" class="form-control" id="exampleOrgNumber" placeholder="XXX-XXX-XXXX"/>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="exampleOrgWebsite">Food Resource Website</label>
              <input type="orgName" class="form-control" id="exampleOrgWebsite" placeholder="foodforfriends.com"/>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleOrgEmail">Food Resource Email</label>
              <input type="orgName" class="form-control" id="exampleOrgEmail" placeholder="example@gmail.com"/>
            </div>
          </div>

          <div class="form-group">
            <label for="exampleOrgAddress">Food Resource Address*</label>
            <input type="orgName" class="form-control" id="exampleOrgAddress" placeholder="1st PL SE, Seattle, WA 98105"/>
          </div>

          <div class="form-group">
            <label for="exampleDescription">Additional Information</label>
            <textarea class="form-control" id="exampleDescription" rows="3" placeholder="The description should explain a little about the food source, hours of operation, and any other additional information you believe is important to know!"></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Submit</button>
        </form> 
        </div>
     );
}
export default Form;