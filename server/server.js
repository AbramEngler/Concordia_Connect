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

//Posts
const Post = require('./models/post');

//Direct Messaging
const Message = require('./models/message');

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
//app.use(loginRouter); // Register the router with the app instance

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
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');
        console.log(user.email);
        console.log(user.password);

        // const saltRounds = 10;
        // const hashInputPassword = await bcrypt.hash(password, saltRounds);
        // console.log(hashInputPassword);
        //const isPasswordValid = bcrypt.compare(password, user.password); //removed "await", made login successful
        if (password != user.password) return res.status(400).send( //wrote our own conditional to check if input password and stored password is the same
            { message: 'Invalid password',
                password: password,
                crypted: user.password
            }
            );

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
        res.send({ token, userName: user.name, userId: user._id  });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

//BuyAndSell

app.post('/post', async (req, res) => {
    const { title, body, authorId, authorName } = req.body;

    if (!title || !body || !authorId || !authorName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newPost = new Post({ title, body, authorId, authorName });
        await newPost.save();  // Save the post to MongoDB

        res.status(200).json({ message: 'Post created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save post' });
    }
});

//GET a specific post with its replies
app.get('/post/:postId', async (req, res) => {
    console.log('Fetching post with ID:', req.params.postId);
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//POST to handle adding replies
app.post('/post/:postId/reply', async (req, res) => {
    const { body, authorId, authorName } = req.body;
    
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).send('Post not found');

        post.replies.push({ body, authorId, authorName });
        await post.save();

        res.json({ message: 'Reply added successfully', post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// GET endpoint to retrieve all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from the database
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});


// Get messages for a user (either sent or received)
app.get('/messages/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Find all messages where the user is either the sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    })
      .populate('senderId', 'name') // Populate sender's name
      .populate('receiverId', 'name') // Populate receiver's name
      .sort({ createdAt: -1 }); // Sort by most recent message

    // Return only messages relevant to the logged-in user
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

//send messages
app.post('/message', async (req, res) => {
    const { senderId, receiverId, senderName, receiverName, body } = req.body;
    try {
      // Create a new message
      const newMessage = new Message({
        senderId,
        receiverId,
        senderName,
        receiverName,
        body,
      });
  
      const savedMessage = await newMessage.save();
      res.status(201).json(savedMessage);
      //res.status(200).send({ message: 'Message sent successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error sending message' });
    }
  });

  // Get messages for a user
app.get('/messages/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      // Find all messages where the user is either the sender or receiver
      const messages = await Message.find({
        $or: [
          { senderId: userId },
          { receiverId: userId },
        ],
      })
        .populate('senderId', 'name') // Populate sender's name
        .populate('receiverId', 'name') // Populate receiver's name
        .sort({ createdAt: -1 }); // Sort by most recent message
  
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching messages' });
    }
  });

  //search for users to send message to
  app.get('/users/search', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ error: 'Query parameter is required' });

    try {
        const users = await User.find({ name: { $regex: query, $options: 'i' } }).select('_id name');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//adding replies
app.post('/message/:messageId/reply', async (req, res) => {
    const { messageId } = req.params;
    const { senderId, senderName, body } = req.body;

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        const reply = { senderId, senderName, body };
        message.replies.push(reply);
        await message.save();

        res.status(201).json(reply);
    } catch (err) {
        console.error('Error adding reply:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//mark message as read
app.patch('/message/:messageId/read', async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findByIdAndUpdate(
            messageId,
            { status: 'read' },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json(message);
    } catch (err) {
        console.error('Error marking message as read:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//open message
// Fetch a specific message by its ID
app.get('/message/:messageId', async (req, res) => {
    try {
        const { messageId } = req.params; // Extract messageId from the URL
        const message = await Message.findById(messageId); // Fetch the message from MongoDB

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Update the message status to "read" when accessed
        message.status = 'read';
        await message.save();

        res.json(message);
    } catch (err) {
        console.error('Error fetching message:', err);
        res.status(500).json({ error: 'Server error' });
    }
});