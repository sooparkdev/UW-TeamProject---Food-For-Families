# Food For Friends Requirements
Christian Calloway, Jaehoon Choi, Soo Park, Pranav Shekar

# [G] General / Non-Functional Requirements - (Core)
1. All text on the site will have acceptable contrast ratios, as tested by WebAIM’s Contrast Checker 
2. All HTML on the site will be valid, as tested by W3C Markup Validator 
3. _**(Stretch)**_ The application can be accessed on a laptop, desktop, mobile device, and tablet
    1. The application should properly scale for the above devices with responsive design and look appropriate with proper layouts
5. _**(Stretch)**_ Should be able to load all user displays within 1 second (long loading times will lead the user to leave the site before we can even show them anything) 

# [N] Navigation Bar Requirements - (Core)
1. The navigation bar is available on every page of the site
2. Should contain the “Home Page” icon that links the user to the Home page. 
3. Should contain the “Submission Form” icon that links the user to the Submission Form page.
4. Should contain the “Food Near You” icon that links the user to the Food Near You page. 
5. Should contain the name of the webpage, Food For Friends, at the top center of the page.

# [H] Home Page Requirements - (Core)
1. The body of the Home page is composed of child link elements that link to Food Near You page, Favorites, or Submission Form page." 
   1. ‘Food Near You’ should link to the Food Near You page 
   2. ‘Form Submission’ should link to the Form Submission page
2. Should contain stock images of food to provide a friendly user experience and indicate what our service does
3. Should contain a footer section at the bottom of the DOM that shows a simple text displaying information about our Food for Friends organization

# [F] Food Near You Page Requirements
## [L] List - (Core)
1. User is able to see all the food sources in cards without inputting a search
    1. Each card specifies the ‘name’, ‘type’, ‘contact information’ (email and/or phone), ‘operating hours’, and ‘address’ of each food source
    2. Cards are color-coded according to the type of food source
2. User is able to dynamically filter the information they’re seeing:
    1. Contain a dropdown search box that takes in a name of an elementary school in Seattle as a user input
        1. Dropdown appears with a full list of elementary schools when the search box is clicked
        2. Dropdown list dynamically changes based on what the user inputs in the text field (in other words, only show elementary schools with matching letters)
        3. If the user types in something not in the dropdown/preset list, nothing will show in the dropbox. The user will then be able to tell that the elementary school isn't in the system. 
    2. Contain 4  checkboxes for filtering the type of food sources
        1. The 4 checkboxes are Food Banks, Food Pantries, Food Fridges, and Pop-up Events
        2. The checkboxes are all checked (which corresponds to “show”) by default
        3. The food sources displayed on the list dynamically changes according to checkmarks on the checkboxes 
    3. Contain an input box that takes in a decimal number (including integers) in a unit of miles that sets the max distance the food source can be from an elementary school
        1. Highlight the border of the input box in red and note to the user that the input is invalid if there are characters (such as a comma or dollar sign) in the input box
        2. Round to two decimal places in the system if a number goes beyond hundredths
        3. Trim any extra spaces before, after, or in between the input value
        4. Shouldn’t enforce the users to provide an input for this field (If it’s left empty, retrieve all matching results regardless of the distance) 
    4. The retrieved location-specific search results are displayed in cards
        1. Each card specifies the ‘name’, ‘type’, ‘contact information’ (email and/or phone), ‘operating hours’, ‘address’, and now also ‘distance’ of each food source
        2. Distance is calculated based on the difference between the longitude and latitude coordinates of the search result and the selected elementary school 
        3. If a piece of particular information is not available (such as operating hours), note to the users that it’s “Unavailable At The Moment”
        4. If there were no matching results at all, note to the users that there were “No Matching Results” 
        5. Cards are color-coded according to the type of food source

## [M] Map - (Stretch)
_Integrates the ability to view data as a list and also filter the data as outlined above to be viewed as an interactive map_
1. User is able to see an interactive map of food source information
    1. Markers on the map indicating food sources
    2. Floating pop-up box with information about the food source appears when a marker is clicked (disappears when un-clicked)  
    3. The information specifies the `name`, `type`, `contact information` (email and/or phone), `operating hours`, `address`, and `distance` of each food source
    4. Markers and the pop-up boxes are color-coded according to the type of food source
    5. Buttons for zooming in and zooming out

# [S] Submission Form Page Requirements - (Core)
1. The system should present a message at the top of the form that explains the purpose of the Submission Form page for users
2. The system should have an input box for the form submitter’s name
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘John Doe’
3. The system should have an input box for the form submitter’s phone number
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘xxx-xxx-xxxx’
4. The system should have an input box for the form submitter’s email
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘name@gmail.com’
5. The system should have an input box for the organization/group’s name
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘Food for Friends’
6. The system should have an input box for the organization/group’s phone number
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘xxx-xxx-xxxx’
7. The system should have an input box for the organization/group’s email
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘name@gmail.com’
8. The system should have an input box for the type of food source
    1. The ‘Food Source’ box should be a dropdown menu in which the user may select food bank, food pantry, community fridge, pop-up event
    2. If selecting ‘pop-up event,’ another box will appear asking for the dates and the time (PST) of the pop-up event 
9. The system should have an input box for the location of the food resource
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘1st PL SE, Seattle, WA 98105’’
10. The system should have an input box for a description
    1. The system should show the appropriate formats needed in each input box. This text should be gray and indicate what to type: ‘The description should explain a little about the food source and any other additional information you believe is important to know!’
11. The system should have a ‘Submit’ button the user may click after completing the form
    1. After clicking the ‘Submit’ button, the system should have user feedback–present a message that confirms the form was properly submitted
12. Once the user clicks the ‘Submit’ button, the system parses through the information submitted to check that it has all been filled out with the appropriate formats and characters
    1. Trim any extra spaces before, after, or in between the input value
    2. If a box has been filled out with an incorrect format (i.e. special characters used when not appropriate), a red error message encircling the box will be displayed until the user fixes the error
    3. If all the inputs are valid, send an email to the admin with all the inputs for the admin to manually verify the information is true.
        1. The admin will add the information in a correct JSON format to the JSON file within the system.
        2. The database will be repopulated with the updated JSON file.
        3. The new information would now be present on the Food Near You page when performing a search
