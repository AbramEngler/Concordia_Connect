const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());app.use(bodyParser.json());// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myreactdemo', {       useNewUrlParser: true,   useUnifiedTopology: true })  
.then(() => console.log('Connected to MongoDB'))  //promise, will let your know when it happens
.catch(err => console.error('Error connecting to MongoDB', err));// Define API routes (example)

//"restful" API, heven't returned JSON yet
app.get('/', (req, res) => {  
    res.send('Hello from the backend!');
});
app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);
});


//API routes
const User = require('./models/user');
app.get('/users', async (req, res) => { 
    try {    
        const users = await User.find();    
        res.json(users);  
    } catch (err) {    
        res.status(500).json({ error: err.message });  
    }
});// ... (other routes for adding, updating, deleting data)

//Use an HTTP post request to insert a new user object into the user table
//API endpoint
app.post('/newuser', async (req, res) => //accepting post requests. Takes an HTTP request as a parameter
{
    try
    {
        var obj = req.body; //incoming user object (JSON)
        const user = new User(obj); //this is coming from User.js, trying to translate into the schema we made
        //? means it is possible to be null
        //backend validation
        if(user.name === null || user.password === null || user.email === null)
        {
            res.status(400).json(
                {
                    error: "invalid inputs"
                }
            )
            
        }
        else{
            await user.save(); //save the model into MongoDB
            res.json({
            message: "OK"
        });
        
    }
}
    catch(err)
    {
        req.status(500).json({
            error: err
        });
    }
}) 