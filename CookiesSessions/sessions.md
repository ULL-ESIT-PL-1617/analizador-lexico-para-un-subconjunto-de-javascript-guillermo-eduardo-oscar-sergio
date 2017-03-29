
---

# Sessions en ExpressJS

En primer lugar, a modo de introducción debemos de conocer brevemente los terminos de autenticación y autorización. Autenticación es el proceso de verificar si el usuario es el mismo que el declara ser. Autorización es el proceso de determinar si un usuario tiene los privilegios para acceder a un cierto recurso al que ha solicitado acceder. A continuación mostraremos un pequeño fragmento de código Node.js en el que se ilustra de una manera muy simple el proceso de autenticación y autorización mediante sesiones de express.js. Como era de esperar, hay un punto de inicio de sesión, un punto de cierre de sesión. Para ver la página que está posteada debemos autetinficarnos previamente, de esta forma nuestra identidad será verificada y guardada durante la sesión. Cuando cerremos la sesión lo que se producirá internamente es un borrado de nuestra identidad en dicha sesión.

```js
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.listen(3000);
console.log("app running at http://localhost:3000");
```

Este código se encuentra en la carpeta /src.

Para poder poner en funcionamiento el código desde la linea de comando tendrems que instalar algunas dependencias.

```
npm install express
npm install express-session
node session_auth.js &
```

### Explicación del código

```
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
```

Importamos los modulos express y express-session. Creamos una aplicación express a la cual le añadimos nuesto middleware session.

```
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
```

Pasamos al siguiente paso si el usuario es Amy y si ella tiene el acceso de administrado. En este caso por simplicidad y comprensión del lector, hemos establecido que el usuario tiene que ser amy, en una aplicación real los datos de session serían comparados  con los usuarios de una base de datos de la aplicación.

```
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
```

**localhost:3000/login?username=amy&password=amyspassword**, la URL de inicio de sesión para comprobar el usuario inicie sesión en guardando el nivel de acceso del usuario y usuario en una sesión.

La sesión será diferente para cada usuario, y también sera única para el mismo usuario utilizando diferentes navegadores.

Por ejemplo, si el mismo usuario ha iniciado sesión en  Chrome, y el abrir Firefox, el usuario tendrá que volver a iniciar sesión en Firefox con el fin de obtener los recursos protegidos.

Para fines de demostración, se trata de una petición de obtención y de cruce en la información a través de los parámetros de consulta.

Una aplicación web real, por lo general se usa una solicitud posterior y pasando los datos en el formulario de envío.

Una vez más el usuario y las contraseñas están codificados aquí con fines de demostración.

Una aplicación web real, se compruebe que el usuario y la contraseña de entrada contra el usuario y la contraseña almacenada en una base de datos de la existencia del servidor.

```
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
```

hacemos el logout 'destruyendo' la sesión

```
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
```

pasamos la autenticación como segundo parametro, en caso de que la autenticación no sea valida no se llamará  a la callback por lo tanto esto solo funciona si estamos logueados.

---

Existen dos formas generales de implementar sesiones en Express: utilizar cookies y utilizar un almacén de sesiones en el backend. Ambos añaden un nuevo objeto en el objeto request denominado session, que contiene las variables de sesión.

No importa el método que utilice, Express proporciona una interfaz coherente para trabajar con los datos de la sesión.

---

### Sesión basada en cookies

Utilizando el hecho de que las cookies pueden almacenar datos en el navegador de los usuarios, se puede implementar una API de sesiones mediante cookies. Express viene con un middleware integrado llamado cookieSession, que hace precisamente eso.

Cargue el middleware cookieParser con un secreto, seguido por el middleware cookieSession, antes del middleware del enrutador. El middleware cookieSession depende del cookieParser middlware porque utiliza una cookie para almacenar los datos de la sesión.

El middleware cookieParser debe inicializarse con un secreto, ya que cookieSession necesita generar una cookie HttpOnly firmada para almacenar los datos de la sesión. Si no especifica un secreto para cookieParser, deberá especificar la opción secreta de cookieSsession.

El siguiente es el código para habilitar sesiones en Express utilizando el middleware cookieSession.

```
app.use(express.cookieParser('S3CRE7'));
app.use(express.cookieSession());
app.use(app.router);
```

Aunque el middleware cookieSession se puede inicializar sin opciones, el middleware acepta un objeto de opciones con las siguientes opciones posibles:

* Key: Nombre de la cookie. Por defecto connect.sess.
* secret: contraseña para firmar la sesión. Es requerido si CookieParser no se inicializa con uno.
* cookie: Configuración de la cookie de sesión. Se aplican los valores predeterminados de las cookies.
* proxy: Para confiar en el proxy inverso o no. El valor predeterminado es false.

A continuación un ejemplo:

```
app.use(express.cookieSession({
  key: 'app.sess',
  secret: 'SUPERsekret'
}));
```

---

### Sesión basada en Session-store

Una Session-store es una provisión para almacenar datos de sesión en el backend. Las sesiones basadas en almacenes de sesiones pueden almacenar una gran cantidad de datos que están bien ocultos al usuario.

El middleware de sesión proporciona una forma de crear sesiones utilizando los almacenes de sesiones. Al igual que cookieSession, el middleware de sesión depende del middleware cookieParser para crear una cookie HttpOnly firmada.

Inicializar la sesión middlware es mucho como inicializar cookieSession - primero cargar cookieParser con un secreto, y cargar el middleware de la sesión, antes de que el middleware del enrutador.

```
app.use(express.cookieParser('S3CRE7'));
app.use(express.session());
app.use(app.router);
```

El middleware de sesión acepta un objeto de opciones que se puede utilizar para definir las opciones del middleware. Las siguientes son las opciones compatibles:

* Key: Nombre de la cookie. Por defecto connect.sess.
* secret: contraseña para firmar la sesión. Es requerido si CookieParser no se inicializa con uno.
* cookie: Configuración de la cookie de sesión. Se aplican los valores predeterminados de las cookies.
* proxy: Para confiar en el proxy inverso o no. El valor predeterminado es false.

A continuación un ejemplo:

```
app.use(express.session({
  key: 'app.sess',
  store: new RedisStore,
  secret: 'SEKR37'
}));
```



