const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
  users,
  profile,
  posts
} = require('./routes/api/index');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// Connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world'));

// use routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
