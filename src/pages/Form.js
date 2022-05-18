// Import Libraries
import React, { useState, useRef } from 'react';

// HTML to return
const Form = () => {

  // State variables
  const [hasFullNameError, setHasFullNameError] = useState(false)
  const [hasNumberError, setHasNumberError] = useState(false)
  const [hasEmailError, setHasEmailError] = useState(false)
  const [hasResourceNameError, setHasResourceNameError] = useState(false)
  const [hasResourceNumberError, setHasResourceNumberError] = useState(false)
  const [hasResourceWebsiteError, setHasResourceWebsiteError] = useState(false)
  const [hasResourceEmailError, setHasResourceEmailError] = useState(false)
  const [hasResourceAddressError, setHasResourceAddressError] = useState(false)

  // Handle submission of the form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (hasFullNameError || hasNumberError || hasEmailError || hasResourceNameError || hasResourceNumberError || hasResourceEmailError || hasResourceAddressError ) {
      console.log("There was errors")
    } else if(checkboxesAreUnchecked) {
      console.log("Checkboxes bad")
    } else {
      console.log("Good")
    }
  }

  //
  // Functions for checking inputs
  //
  // - Full Name Input
  let fullNameRef = useRef(null)
  const handleFullNameInput = (e) => {
    let fullNameInput = e.target.value

    // Check if the name is invalid
    if (checkFullNameInput(fullNameInput).status === "error") {
      // Invalid
      fullNameRef.current.style.border = "2px solid rgb(241, 77, 77)";
      fullNameRef.current.style.backgroundColor = "rgb(255, 237, 237)";
      setHasFullNameError(true)
    } else {
      // No errors
      fullNameRef.current.style.border = "none";
      fullNameRef.current.style.backgroundColor = "white";
      setHasFullNameError(false);
    }
  }

  // - Number Input
  let numberRef = useRef(null)
  const handleNumberInput = (e) => {
    let numberInput = e.target.value

    if(!(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(numberInput))) {
      // Invalid
      numberRef.current.style.border = "2px solid rgb(241, 77, 77)";
      numberRef.current.style.backgroundColor = "rgb(255, 237, 237)";
      setHasNumberError(true)
    } else {
      // No errors
      numberRef.current.style.border = "none";
      numberRef.current.style.backgroundColor = "white";
      setHasNumberError(false);
    }
  }

  // - Email Input
  let emailRef = useRef(null)
  const handleEmailInput = (e) => {
    let emailInput = e.target.value
  }

  // - Resource Name Input
  let resourceNameRef = useRef(null)
  const handleResourceNameInput = (e) => {
    let resourceNameInput = e.target.value
  }

  // - Resource Number Input
  let resourceNumberRef = useRef(null)
  const handleResourceNumberInput = (e) => {
    let resourceNumberInput = e.target.value

    if(!(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(resourceNumberInput))) {
      // Invalid
      resourceNumberRef.current.style.border = "2px solid rgb(241, 77, 77)";
      resourceNumberRef.current.style.backgroundColor = "rgb(255, 237, 237)";
      setHasResourceNumberError(true)
    } else {
      // No errors
      resourceNumberRef.current.style.border = "none";
      resourceNumberRef.current.style.backgroundColor = "white";
      setHasResourceNumberError(false);
    }
  }

  // - Resource Website Input
  let resourceWebsiteRef = useRef(null)
  const handleResourceWebsiteInput = (e) => {
    let resourceWebsiteInput = e.target.value
  }

  // - Resource Email Input
  let resourceEmailRef = useRef(null)
  const handleResourceEmailInput = (e) => {
    let resourceEmailInput = e.target.value
  }

  // - Address Input
  let resourceAddressRef = useRef(null)
  const handleResourceAddressInput = (e) => {
    let resourceAddressInput = e.target.value
  }

  return (
    <div className="form">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
      <h1>Food Resource Submission Form</h1>
      <p>Fields marked <span className='required'>*</span> are required!</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <div className="form-check" required>
              <input className="form-check-input" type="checkbox" value="" id="foodBank" />
              <label className="form-check-label" for="foodBank">
                Food Bank
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="meal" />
              <label className="form-check-label" for="meal">
                Meal
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="communityFridge" />
              <label className="form-check-label" for="communityFridge">
                Community Fridge
              </label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="exampleName">Your Full Name <span className='required'>*</span></label>
            <input type="text" onChange={handleFullNameInput} ref={fullNameRef} className="form-control" id="exampleName" placeholder="John Doe" maxLength={50} required />
            {
              hasFullNameError &&
              <div className="alert">
                <i className="gg-info"></i>
                <p style={{ color: 'red' }}> Invalid input: Bad name </p>
              </div>
            }
          </div>
          <div className="form-group col-md-6">
            <label for="exampleNumber">Your Number <span className='required'>*</span></label>
            <input type="tel" onChange={handleNumberInput} ref={numberRef} className="form-control" id="exampleNumber" placeholder="XXX-XXX-XXXX" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
            {
              hasNumberError &&
              <div className="alert">
                <i className="gg-info"></i>
                <p style={{ color: 'red' }}> Invalid input: Bad number </p>
              </div>
            }
          </div>
        </div>

        <div className="form-group">
          <label for="exampleEmail">Your Email <span className='required'>*</span></label>
          <input type="email" onChange={handleEmailInput} ref={emailRef} className="form-control" id="exampleEmail" placeholder="example@gmail.com" required />
          {
            hasEmailError &&
            <div className="alert">
              <i className="gg-info"></i>
              <p style={{ color: 'red' }}> Invalid input: Bad email </p>
            </div>
          }
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="exampleOrgName">Food Resource Name <span className='required'>*</span></label>
            <input type="text" onChange={handleResourceNameInput} ref={resourceNameRef} className="form-control" id="exampleOrgName" placeholder="Food for Friends Food Bank" required />
            {
              hasResourceNameError &&
              <div className="alert">
                <i className="gg-info"></i>
                <p style={{ color: 'red' }}> Invalid input: Bad name </p>
              </div>
            }
          </div>
          <div className="form-group col-md-6">
            <label for="exampleOrgNumber">Food Resource Number <span className='required'>*</span></label>
            <input type="tel" onChange={handleResourceNumberInput} ref={resourceNumberRef} className="form-control" id="exampleOrgNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="XXX-XXX-XXXX" required />
            {
              hasResourceNumberError &&
              <div className="alert">
                <i className="gg-info"></i>
                <p style={{ color: 'red' }}> Invalid input: Bad number </p>
              </div>
            }
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="exampleOrgWebsite">Food Resource Website</label>
            <input type="website" onChange={handleResourceWebsiteInput} ref={resourceWebsiteRef} className="form-control" id="exampleOrgWebsite" placeholder="foodforfriends.com" />
            {
              hasResourceWebsiteError &&
              <div className="alert">
                <i className="gg-info"></i>
                <p style={{ color: 'red' }}> Invalid input: Bad name </p>
              </div>
            }
          </div>
          <div className="form-group col-md-6">
            <label for="exampleOrgEmail">Food Resource Email</label>
            <input type="email" onChange={handleResourceEmailInput} ref={resourceEmailRef} className="form-control" id="exampleOrgEmail" placeholder="exampleOrg@gmail.com" />
            {
              hasResourceEmailError &&
              <div className="alert">
                <i className="gg-info"></i>
                <p style={{ color: 'red' }}> Invalid input: Bad email </p>
              </div>
            }
          </div>
        </div>

        <div className="form-group">
          <label for="exampleOrgAddress">Food Resource Address <span className='required'>*</span></label>
          <input type="address" onChange={handleResourceAddressInput} ref={resourceAddressRef} className="form-control" id="exampleOrgAddress" placeholder="11111 St, Seattle, WA 98105" required />
          {
            hasResourceAddressError &&
            <div className="alert">
              <i className="gg-info"></i>
              <p style={{ color: 'red' }}> Invalid input: Bad name </p>
            </div>
          }
        </div>

        <div className="form-group">
          <label for="exampleDescription">Additional Information</label>
          <textarea className="form-control" id="exampleDescription" rows="3" placeholder="The description should explain a little about the food source, hours of operation, and any other additional information you believe is important to know!"></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

// Helper methods to check input validation
function checkFullNameInput(name) {
  // Check if its empty
  if (name == null) {
    return {
      "status": "error",
      "error": "Cannot have an empty name"
    }
  }

  // Check if it is longer than 50 characters or shorter than 5 characters
  // This is unlikely for a person's name
  if (name.length > 50 || name.length < 5) {
    return {
      "status": "error",
      "error": "Name cannot be longer than 50 characters or shorter than 5"
    }
  }

  // Check if it contains any non-alphabetical or non-space characters
  // Not possible
  if (!/^[a-zA-Z ]+$/.test(name)) {
    return {
      "status": "error",
      "error": "Name can only contain characters a-z or A-Z"
    }
  }

  // Name is valid
  return {
    "status": "success",
  }
}

function checkboxesAreUnchecked() {
  var allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
  console.log(allCheckboxes)
  var oneIsChecked = Array.prototype.slice.call(allCheckboxes).some(x => x.checked)

  if(oneIsChecked) {
    return false
  } else {
    return true
  }
}


export default Form;