# Testing Plan
## Testing Types
Manual acceptance testing will be done to validate the functionalities, especially the interactive map retrieving correct search results based on the filter,  of this web application working as intended.

## Testing Process
All team members will work on their own branch and ensure code compiles first, then they will get others to review their code before merging to the main branch. This is to ensure fewer merge conflicts. In the case of a conflict, developers will be responsible for helping resolve and mitigate merge conflicts and communicating with the group chat when features/code has been successfully implemented. After doing this, the team member who worked on a piece of code will approve their Issues and close them as they’re completed. This will ensure that only current Issues and Milestones are open on Github.
 
During development, the member responsible for implementing the code, as assigned in the Issues, will run the relevant acceptance testing script on all supported OS/browser combinations. Testing is expected to be completed within the deadlines assigned for each Milestone. Each Friday, during development, the team will collaboratively test all code pushed within the week to ensure functionality remains and additional bugs do not appear.

## Testing Environments
The entire team will do testing on our local devices and machines. We will particularly be testing our Submission Form page and Food Near You page the most extensively.
 
While we will largely be conducting testing on our laptops, stretch goal G3 specifies that our application can be accessed on a laptop, mobile device, and tablet. Stretch goal G3i further specifies, “the application should properly scale for the above devices with responsive design and look appropriate with proper layouts.” For this reason, we have outlined supported OS/browser combinations for laptops, tablets, and phones in the case that we are able to develop this stretch goal.
 
### Supported OS/Browser Combinations
- Chrome browser on MacOS _(MacBook Air Laptop, iPad Pro)_
- Firefox on Windows _(Dell XPS 13)_
- Safari on Apple _(Macbook Air Laptop, iPad Pro, iPhone XR, 12, 13 Pro Max)_

## Defect Management
Whenever a bug is detected through user testing (someone outside of the team utilizes our website and discovers an issue) it will be communicated to one of the developers through whoever else started the user testing. OR, if a bug is discovered through one of the team members’ testing, it will be communicated to the team first via our group chat. Then, the project manager will create a comment in the associated Github Issue and pin it, thus ensuring the entire team knows of the bug.
 
The person who made the bug will be assigned to fix it, however, if they need help, they can ask a team member for assistance in discovering the source of the bug. Once a bug has been fixed, the code will be tested again to ensure it works without the bug appearing. Then, the team member that fixed the bug will communicate this to the team ensuring everyone knows it’s fixed. The project manager will then close any comments on the associated Github issue, mark them as resolved with a comment, and unpin it.

## User Acceptance Testing Script
### Non-Functional Requirements
All text on our site will be tested through the WebAIM contrast checker by inputting our foreground and background colors to ensure that the contrast ratios are acceptable. `[Requirement G1]`
 
Additionally, all HTML will be checked by W3C markup validation to make sure that it is well-formed and to increase the performance of our site. We will either validate by URI, file upload, or direct input depending on which one we find most convenient. `[Requirement G2]`

### Home Page
Upon visiting the home page, expect to see a title logo or text that shows that the user is on the correct website, and also links to the other pages through a navbar that redirects to the Food Near You page or Submission Form page. `[Requirement H1]`
 
Expect to see a blurb titled “About Us” that tells more about the creators of the application and also why they created the organization and what the organization is about. `[Requirement H2]`

### Food Near You
Go on the _‘Food Near You’_ page of the application by clicking on the corresponding tab in the navigation bar. 
 
Expect to see a form with a search box, an input box, four different-colored checkboxes with checkmarks on all of them, and a “Search” button. Below the form section, expect to see a Google Map of Seattle and a legend box on the left side showing the colors for different Food Sources - Yellow for Food Pantry, Green for Food Bank, Purple for Community Fridge, Blue for Pop-up.  `[Requirement FM1 & FM2]`
 
Expect to see a placeholder, _“Search Elementary School by name”_, inside the dropdown search box. Click on the search box, and expect to see a dropdown list of elementary school names. Expect to be able to scroll through the list. Expect to be able to type in letters in the search box and see the elementary school names in the dropdown list dynamically changing according to matching letters. Expect to see the background of each elementary school changing as the tester hovers over it. `[Requirement FM1]`
 
Click on the input box and type in a positive number (including decimals), expect the border color of the input box to remain the same. This time, type in a negative number. Expect the border color of the input box highlighted in red and a red-colored message noting to the tester what valid inputs are. Again, type in a character. Similarly, expect to see the same error again.  `[Requirement FM1ic]`
 
Click on any checkboxes, and expect to see the checkmark removed. Click on the same checkbox again, and expect to see the checkmark back.  `[Requirement FM1iiib]`
 
Hover over the _“Search”_ button, and expect to see the opacity of the button change. Click on the _“Search”_ button, and expect to see markers (in one-color or different colors) on the map. `[Requirement FM1d]`
 
Expect to see a _“Notice”_ box below the form section if there were no food sources that satisfied the search criteria. (This can be tested by unchecking all the checkmarks on the checkboxes or inputting a value of  0 in the input box.) `[Requirement FM2ivb]`
 
Once the tester sees markers on the map, click on any of the markers, and expect to see a pop-up box on the right-bottom corner of the page, listing the name, type, contact information, operating hours, address, and distance of that food resource. Click on a different marker on the map, and expect to see the corresponding information of the newly clicked food resource in the pop-up box. `[Requirement FM2b]`
 
Refresh the page. Expect to see all the settings back to the beginning - with no inputs in the boxes, all checkboxes marked, and no markers on the map. `[Requirement FM1 &  FM2]`

### Submission Form Page
Go on the _‘Submission Form Page’_ page of the application by clicking on the corresponding tab in the navigation bar. 
 
Visit the Submission Form Page and. Expect to see a title, text about what the page is for, 9 input boxes that are marked required, the expected formats for the input boxes, and a Submit button `[Requirements S1-S11]`

Don’t fill out one of the required boxes and click the Submit button. An error message should pop-up highlighting the box that has not been filled out `[Requirement S12i]`

Fill out the submitter’s name with an improper format and click Submit. An error message encircling the box should appear `[Requirements S2, S12i]`

Fill out the submitter’s phone number box with an improper format and click Submit. An error message encircling the box should appear `[Requirements S3, S12i]`

Fill out the submitter’s email box with an improper format and click Submit. An error message encircling the box should appear `[Requirements S4, S12i]`

Fill out the organization/group’s name with an improper format and click Submit. An error message encircling the box should appear `[Requirements S5, S12i]`

Fill out the organization/group’s phone number with an improper format and click Submit. An error message encircling the box should appear `[Requirements S6, S12i]`

Fill out the organization/group’s email with an improper format and click Submit. An error message encircling the box should appear `[Requirements S7, S12i]`

Don’t select an input for the type of food source and click Submit. An error message encircling the box should appear `[Requirements S8, S12i]`

Select pop-up for the type of food source and select dates that have already occured and click Submit. An error message encircling the box should appear `[Requirements S8i, S8ii S12i]`

Fill out the location of the food source with an improper format and click Submit. An error message encircling the box should appear `[Requirements S9, S12i]`

Don’t fill out the Description box and click Submit. An error message encircling the box should appear `[Requirements S10, S12i]`

Fill out the form correctly and click Submit. A message confirming you have successfully submitted your information should appear. `[Requirements S12, S12ii]`

Fill out the form correctly and click Submit. An administrator should check to see that they’ve received an email confirming the submission form was submitted. They should be able to review the information submitted, populate it into the JSON file and see the information reflected on the Food Near You page when searching `[Requirement S12ii]`

Refresh the page. Expect to see all the input boxes empty - with no inputs in the boxes. `[Requirements S1-S11]`





