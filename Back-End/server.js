// Import Express
const express = require('express');
require('dotenv').config();
const {  generatePresignedUrl } = require('./get-url');

const cors = require('cors');


// Create an Express app
const app = express();

app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Define a simple route
app.get('/upload',async (req, res) => {

  try {
    console.log(req,'req');
    
    let key = 'images/' + new Date().getTime() + '/image';
 
    // Await the presigned URL generation
    const url = await generatePresignedUrl(key, req.query.fileType);

    // Send the response with the URL
    return res.status(200).json({ url : url});;
  } catch (error) {
    console.error('Error generating presigned URL:', error);

    // Send an error response if something goes wrong
    return res.status(500).send({ error: true, message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
