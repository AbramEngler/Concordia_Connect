const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

//Login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const User = require('./models/user');
const router = express.Router();


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

const loginRouter = require('./models/login');
app.use(loginRouter); // Register the router with the app instance

//Use an HTTP post request to insert a new user object into the user table
//API endpoint

//New User Creation
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

// app.post('/newuser', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ error: 'Invalid inputs' });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         const user = new User({ name, email, password: hashedPassword });

//         await user.save();
//         res.json({ message: 'User created successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
        res.send({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

module.exports = router;