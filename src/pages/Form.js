// Import CSS Styles
import '../styles/Form.css'

// Import Libraries
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

// HTML to return
const Form = () => {

  let navigate = useNavigate()

  // State variables
  const [hasFullNameError, setHasFullNameError] = useState(false)
  const [hasNumberError, setHasNumberError] = useState(false)
  const [hasEmailError, setHasEmailError] = useState(false)
  const [hasResourceNameError, setHasResourceNameError] = useState(false)
  const [hasResourceNumberError, setHasResourceNumberError] = useState(false)
  const [hasResourceWebsiteError, setHasResourceWebsiteError] = useState(false)
  const [hasResourceEmailError, setHasResourceEmailError] = useState(false)
  const [hasResourceAddressError, setHasResourceAddressError] = useState(false)

  let form = useRef(null)

  // Handle submission of the form
  const handleSubmit = (e) => {
    e.preventDefault()

    let checkboxes = document.getElementById("checkboxes")

    if ((hasFullNameError || hasNumberError || hasEmailError || hasResourceNameError || hasResourceNumberError || hasResourceEmailError || hasResourceAddressError || checkOneChecked(checkboxes) === false)) {
      console.log("There was errors")
    } else {
      // No errors, send email to database!
      console.log("success")
      emailjs.sendForm('service_i1wxbrl', 'template_7wxqaxj', form.current, '5J8e5mCQYgoVxJ5yr')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
      navigate('/formComplete')
    }
  }

  //
  // Functions for checking inputs
  //
  // - Full Name Input
  let fullNameRef = useRef(null)
  const handleFullNameInput = (e) => {
    let fullNameInput = e.target.value

    let result = checkFullNameInput(fullNameInput)

    // Check if the name is invalid
    if (result.status === "error") {
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

    if (checkPhoneNumber(numberInput).status === "error") {
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

    if (checkEmail(emailInput).status === "error") {
      // Invalid
      emailRef.current.style.border = "2px solid rgb(241, 77, 77)";
      emailRef.current.style.backgroundColor = "rgb(255, 237, 237)";
      setHasEmailError(true)
    } else {
      // No errors
      emailRef.current.style.border = "none";
      emailRef.current.style.backgroundColor = "white";
      setHasEmailError(false);
    }
  }

  // - Resource Name Input
  let resourceNameRef = useRef(null)
  const handleResourceNameInput = (e) => {
    //let resourceNameInput = e.target.value

    setHasResourceNameError(false)
  }

  // - Resource Number Input
  let resourceNumberRef = useRef(null)
  const handleResourceNumberInput = (e) => {
    let numberInput = e.target.value

    if (checkResourcePhoneNumber(numberInput).status === "error") {
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
    //let resourceWebsiteInput = e.target.value

    setHasResourceWebsiteError(false)
  }

  // - Resource Email Input
  let resourceEmailRef = useRef(null)
  const handleResourceEmailInput = (e) => {
    let resourceEmailInput = e.target.value

    if (checkEmail(resourceEmailInput).status === "error") {
      // Invalid
      resourceEmailRef.current.style.border = "2px solid rgb(241, 77, 77)";
      resourceEmailRef.current.style.backgroundColor = "rgb(255, 237, 237)";
      setHasResourceEmailError(true)
    } else {
      // No errors
      resourceEmailRef.current.style.border = "none";
      resourceEmailRef.current.style.backgroundColor = "white";
      setHasResourceEmailError(false);
    }
  }

  // - Address Input
  let resourceAddressRef = useRef(null)
  const handleResourceAddressInput = (e) => {
    let resourceAddressInput = e.target.value

    if (checkAddress(resourceAddressInput).status === "error") {
      // Invalid
      resourceAddressRef.current.style.border = "2px solid rgb(241, 77, 77)";
      resourceAddressRef.current.style.backgroundColor = "rgb(255, 237, 237)";
      setHasResourceAddressError(true)
    } else {
      // No errors
      resourceAddressRef.current.style.border = "none";
      resourceAddressRef.current.style.backgroundColor = "white";
      setHasResourceAddressError(false);
    }
  }

  return (
    <div className='page'>
      <h1>Food Resource Submission Form</h1>
      <p>Fields marked <span className='required'>*</span> are required!</p>

      {/* Form */}
      <form onSubmit={handleSubmit} ref={form}>
        {/* Personal Info */}
        <div className="form-group">
          <h2 style={{ marginBottom: '10px' }}>Personal Information</h2>
          <div className='form-items'>
            <div className="form-item">
              <label for="exampleName">Your Full Name <span className='required'>*</span></label>
              <input type="text" onChange={handleFullNameInput} ref={fullNameRef} className="form-control" id="exampleName" placeholder="John Doe" maxLength={50} required />
              {
                hasFullNameError &&
                <div className="alert">
                  <i className="gg-info"></i>
                  <p style={{ color: 'red' }}> Invalid input: Bad name </p>
                </div>
              }
              <p className='form-item-description'>Names must be between 5 and 50 characters</p>
            </div>
            <div className="form-item">
              <label for="exampleNumber">Your Number <span className='required'>*</span></label>
              <input type="tel" onChange={handleNumberInput} ref={numberRef} className="form-control" id="exampleNumber" placeholder="XXX-XXX-XXXX" required />
              {
                hasNumberError &&
                <div className="alert">
                  <i className="gg-info"></i>
                  <p style={{ color: 'red' }}> Invalid input: Bad number </p>
                </div>
              }
              <p className='form-item-description'>U.S or international numbers accepted</p>
            </div>
          </div>
        </div>

        <div className="form-item">
          <label for="exampleEmail">Your Email <span className='required'>*</span></label>
          <input type="email" onChange={handleEmailInput} ref={emailRef} className="form-control" id="exampleEmail" placeholder="example@gmail.com" required />
          {
            hasEmailError &&
            <div className="alert">
              <i className="gg-info"></i>
              <p style={{ color: 'red' }}> Invalid input: Email must contain @ </p>
            </div>
          }
        </div>

        <hr className='divider' />

        {/* Food Resource Info */}
        <div className='form-group'>
          <h2 style={{ marginBottom: '10px' }}>Food Resource Information</h2>
          <h3>Food Resource Type <span className='required'>*</span></h3>
          <div className='form-group'>
            <div className='form-checkboxes' id='checkboxes'>
              <div className='form-checkbox' required>
                <input className="form-check-input" type="checkbox" value="" id="foodBank" />
                <label className="form-check-label" for="foodBank">
                  Food Bank
                </label>
              </div>
              <div className='form-checkbox' required>
                <input className="form-check-input" type="checkbox" value="" id="meal" />
                <label className="form-check-label" for="meal">
                  Meal
                </label>
              </div>
              <div className='form-checkbox' required>
                <input className="form-check-input" type="checkbox" value="" id="communityFridge" />
                <label className="form-check-label" for="communityFridge">
                  Community Fridge
                </label>
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <p className='form-item-description'>Please select <span style={{ textDecoration: 'underline' }}>at least one</span> food resource type:</p>
              <ul className='form-item-description' style={{ margin: '5px', marginBottom: '20px' }}>
                <li><strong>Food Banks: </strong>Provides food stocks, provisions, or non-perishables </li>
                <li><strong>Meals: </strong>Provides ready-to-serve meals</li>
                <li><strong>Community Fridges: </strong>Provides a community fridge for people to store/retrieve food</li>
              </ul>
            </div>

            <div className='form-items'>
              <div className="form-item">
                <label for="exampleOrgName">Food Resource Name <span className='required'>*</span></label>
                <input type="text" onChange={handleResourceNameInput} ref={resourceNameRef} className="form-control" id="exampleOrgName" placeholder="Food for Friends Food Bank" required />
                {
                  hasResourceNameError &&
                  <div className="alert">
                    <i className="gg-info"></i>
                    <p style={{ color: 'red' }}> Invalid input: Bad name </p>
                  </div>
                }
                <p className='form-item-description'>Input the name of the food resource</p>
              </div>
              <div className="form-item">
                <label for="exampleOrgNumber">Food Resource Number <span className='required'>*</span></label>
                <input type="tel" onChange={handleResourceNumberInput} ref={resourceNumberRef} className="form-control" id="exampleOrgNumber" placeholder="XXX-XXX-XXXX" required />
                {
                  hasResourceNumberError &&
                  <div className="alert">
                    <i className="gg-info"></i>
                    <p style={{ color: 'red' }}> Invalid input: Bad number </p>
                  </div>
                }
                <p className='form-item-description'>U.S Seattle-area addresses only</p>
              </div>
              <div className="form-item">
                <label for="exampleOrgWebsite">Food Resource Website</label>
                <input type="website" onChange={handleResourceWebsiteInput} ref={resourceWebsiteRef} className="form-control" id="exampleOrgWebsite" placeholder="foodforfriends.com" />
                {
                  hasResourceWebsiteError &&
                  <div className="alert">
                    <i className="gg-info"></i>
                    <p style={{ color: 'red' }}> Invalid input: Bad website </p>
                  </div>
                }
                <p className='form-item-description'>Input the website for the food resource {"(if applicable)"}</p>
              </div>
            </div>
            <div className="form-item">
              <label for="exampleOrgEmail">Food Resource Email</label>
              <input type="email" onChange={handleResourceEmailInput} ref={resourceEmailRef} className="form-control" id="exampleOrgEmail" placeholder="exampleOrg@gmail.com" />
              {
                hasResourceEmailError &&
                <div className="alert">
                  <i className="gg-info"></i>
                  <p style={{ color: 'red' }}> Invalid input: Email must contain @ </p>
                </div>
              }
            </div>
            <div className='form-item'>
              <label for="exampleOrgAddress">Food Resource Address <span className='required'>*</span></label>
              <input type="address" onChange={handleResourceAddressInput} ref={resourceAddressRef} className="form-control" id="exampleOrgAddress" placeholder="11111 St, Seattle, WA 98105" required />
              {
                hasResourceAddressError &&
                <div className="alert">
                  <i className="gg-info"></i>
                  <p style={{ color: 'red' }}> Invalid input: Bad address </p>
                </div>
              }
              <p className='form-item-description'>Input a valid Seattle-area address</p>
            </div>
            <div className='form-textarea'>
              <label className='form-textarea-label' for="exampleDescription">Additional Information</label>
              <textarea className='form-textarea-text' id="exampleDescription" rows="3" placeholder="The description should explain a little about the food source, hours of operation, and any other additional information you believe is important to know!"></textarea>
            </div>
          </div>
        </div>
        <div className='submitButtonDiv'>
          <button type="submit" className="submitButton">Submit</button>
        </div>
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

function checkPhoneNumber(text) {
  if (text == null) {
    return {
      "status": "error",
      "error": "Phone number cannot be empty"
    }
  }

  var regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
  if (regex.test(text)) {
    return {
      "status": "success"
    }
  } else {
    return {
      "status": "error",
      "error": "Phone number does not match criteria"
    }
  }
}

function checkResourcePhoneNumber(text) {
  if (text == null) {
    return {
      "status": "error",
      "error": "Phone number cannot be empty"
    }
  }

  var regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
  if (regex.test(text) && text.includes("206")) {
    return {
      "status": "success"
    }
  } else {
    return {
      "status": "error",
      "error": "Phone number does not match criteria"
    }
  }
}

function checkEmail(email) {
  if (email == null) {
    return {
      "status": "error",
      "error": "Email cannot be empty"
    }
  }

  if (!email.includes("@")) {
    return {
      "status": "error",
      "error": "Email must contain an @"
    }
  } else {
    return {
      "status": "success"
    }
  }
}

function checkAddress(address) {
  if (address == null) {
    return {
      "status": "error",
      "error": "Address cannot be empty"
    }
  }

  if (!(address.includes("Seattle")) || !(address.includes("98105"))) {
    return {
      "status": "error",
      "error": "Address must be a 98105-code Seattle address"
    }
  } else {
    return {
      "status": "success"
    }
  }
}

function checkOneChecked(checkboxes) {
  let oneIsChecked = false
  checkboxes = checkboxes.children
  for (let i = 0; i < checkboxes.length; i++) {
    let checkbox = checkboxes[i].children[0]
    if (checkbox.checked) {
      oneIsChecked = true
    }
  }
  return oneIsChecked
}


export default Form;