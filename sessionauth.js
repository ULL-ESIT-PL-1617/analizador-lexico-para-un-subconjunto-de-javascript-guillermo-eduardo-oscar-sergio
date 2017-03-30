"use strict";
let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");

let bcrypt = require("bcrypt-nodejs");
let users = { 
  usuario : bcrypt.hashSync("usuario"), 
};

let instructions = `
Accede como usuario para ver el contenido:
<ul>
  <li> <a href="http://localhost:4000/content/index.html">Apuntes</a> </li>
  <li> <a href="http://localhost:4000/login?username=usuario&password=usuario">Login con usuario</a> </li>
  <li> <a href="http://localhost:4000/logout">Logout</a> </li>
</ul>
`;

let layout = function(x) { return x+"<br />\n"+instructions; };

app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
 
app.use(function(req, res, next) {
  console.log("Cookies :  "+util.inspect(req.cookies));
  console.log("session :  "+util.inspect(req.session));
  next();
});

// Authentication and Authorization Middleware
let auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401); // https://httpstatuses.com/401
};
 
// Login endpoint
app.get('/login', function (req, res) {
  console.log(req.query);
  if (!req.query.username || !req.query.password) {
    console.log('Login fallido');
    res.send('Login fallido');    
  } else if(req.query.username in users  && 
            bcrypt.compareSync(req.query.password, users[req.query.username])) {
    req.session.user = req.query.username;
    req.session.admin = true;
    res.send(layout("Usuario: "+req.session.user + " logueado con éxito"));
  } else {
    console.log(`Login ${util.inspect(req.query)} falló`);    
    res.send(layout(`Login ${util.inspect(req.query)} falló. Tu eres ${req.session.user || 'No estas logueado'}`));    
  }
});
 
app.get('/', function(req, res) {
  res.send(instructions);
});
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send(layout("Logout finalizado"));
});
 
// Get content endpoint
app.get('/content/*?', 
    auth  // Solo sigues si estas autentificado
);
app.use('/content', express.static(path.join(__dirname)));

app.listen(4000);
console.log("Servidor escuchando en http://localhost:4000");