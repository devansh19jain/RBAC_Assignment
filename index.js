const express = require("express");
const path = require('path');
const cors = require('cors');
const http = require('http'); 

const app = express();
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;

// Create an HTTP server
const server = http.createServer(app);

// for chrome related issues in cors
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use(cookieParser());

app.use(errorHandler);

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/rbac', require('./routes/rbac'));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));