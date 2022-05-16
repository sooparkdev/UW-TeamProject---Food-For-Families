// Import Libraries
import mongoose from 'mongoose';

// -----------------

// Connect to the database -- log any potential errors
dbConnect().catch(err => console.log(err))

// The database to be exported for use in other files
let db = {}

// The function to connect to the MongoDB database. Any keys or connection strings should be encrypted!
async function dbConnect() {
    // DO NOT CHANGE. The database to be transacting data to/from
    const databaseName = "foodForFriends"
    
    // The connection string using the databaseName constant
    const connectString = `mongodb+srv://admin:KH5HK6kUjs9ApiOT@cmarq07db.siuga.mongodb.net/${databaseName}?retryWrites=true&w=majority`

    // Connect to MongoDB database using the above constants.
    await mongoose.connect(connectString)
    console.log("[Food for Friends API] Successfully connected to the database!")

    // Create any schemas here!
    // Food Resources
    const foodResourceSchema = new mongoose.Schema({
        type: [{ 
            type: String
        }],
        description: String,
        address: String, 
        latitude: Number,
        longitude: Number,
        phone_number: String,
        website_url: String,
        operating_hours: {
            food_bank_hours: [{
                day: String,
                open: String,
                close: String
            }],
            meal_hours: [{
                day: String,
                open: String,
                close: String
            }],
            community_fridge_hours: [{
                day: String,
                open: String,
                close: String
            }]
        }
    })
    db.FoodResource = mongoose.model("foodresources", foodResourceSchema)
    
    // Schools
    const elementarySchoolSchema = new mongoose.Schema({
        name: String,
        latitude: Number,
        longitude: Number,
    })
    db.School = mongoose.model("schools", elementarySchoolSchema)

    // Form Submissions
    const formSubmissionSchema = new mongoose.Schema({
        name: String,
        phone_number: String,
        email: String,
        food_resource_info: {
            name: String,
            phone_number: String,
            website: String,
            email: String,
            type: [{ 
                type: String
            }],
            address: String,
            additional_info: String
        }
    })

    db.FormSubmission = mongoose.model("formsubmissions", formSubmissionSchema)


    console.log("[Food for Friends API] Successfully created database schemas and models!")
}

export default db;
