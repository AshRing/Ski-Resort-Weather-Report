const express = require('express');
const app = express(); //created express application
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;  //if this variable exists, we are on heroku, if it doesn't we can default to port 3000 on our local machine

app.use(express.static(publicPath)); //Express application that serves up all assets from the specified 'public' directory

app.get('*', (req, res) => { //if what the user requested isn't in the public folder, just give them index.html
    res.sendFile(path.join(publicPath, 'index.html'));
}); //sets up a function to run when someone makes a get request

app.listen(port, () => {   //port 3000 is OK for local machine, but it won't work on heroku. Heroku provides us with an Environment Variable, which changes every time we deploy our app. If the app is running through heroku, use the PORT value from heroku. If not, default to 3000
    console.log('Server is up!');
});