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
    const databaseName = "food_for_friends"
    
    // The connection string using the databaseName constant
    const connectString = `mongodb+srv://admin:KH5HK6kUjs9ApiOT@cmarq07db.siuga.mongodb.net/${databaseName}?retryWrites=true&w=majority`

    // Connect to MongoDB database using the above constants.
    await mongoose.connect(connectString)
    console.log("Successfully connected to the database!")

    // Create any schemas here!
    const exampleSchema = new mongoose.Schema({
        exampleField: String,
        exampleField2: String,
    })

    db.Example = mongoose.model("Example", exampleSchema)
    
    console.log("Successfully created database schemas and models!")
}

export default db;
