import app from "./src/app.js";
import 'dotenv/config';
import connectDB from "./src/config/database.js";

const port = process.env.PORT || 3001

//check if port is available  or not 
if (!port) {
    throw new Error("Port is not defined");
}

// db and server 
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port http://localhost:${port}`);
    })
})