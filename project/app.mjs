// Imports
import express from 'express';

// Initialise Express Server
const app = express();

// Displays contents of 'webpage' folder, i.e. index.html
app.use(express.static("./project/webpage"));

// Launch server on port
const PORT = 3123;
app.listen(PORT, () => {
    console.log(`Application is listening on http://localhost:${PORT}`)
});