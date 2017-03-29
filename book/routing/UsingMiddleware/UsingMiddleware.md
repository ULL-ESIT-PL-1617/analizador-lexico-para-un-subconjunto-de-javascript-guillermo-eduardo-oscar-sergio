#Using middleware

Una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

###¿Qué es middleware?

Middleware son funciones que tienen acceso al objeto de solicitud __req__, al objeto de respuesta __res__ y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación, la cual se suele denotar por la variable __next__. Si la función middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar __next()__ para pasar el control a la siguiente función de middleware o la solicitud quedará colgada.

Una aplicación Express puede utilizar diferentes tipos de middleware. A con
tinuación se verán todos estos tipos con algunos ejemplos.

###Middleware de nivel de aplicación

Los middlware de nivel de aplicación, se enlazan a una instancia del objeto de aplicación utilizando las funciones __app.use()__ y __app.METHOD()__, donde METHOD es el método HTTP de la solicitud que maneja la función de middleware.

A continuación, se muestra un ejemplo de una función middleware montada en /user/:id.

```js
 app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

Ejemplo que muestra una ruta y su manejo por parte del middleware para las solicitudes GET en /user/:id

```js
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

Los manejadores de rutas permiten definir varias rutas para una vía de acceso.Para omitir el resto de las funciones middleware de una pila de middlware, se invoca __next('route')__ para pasar el control a la siguiente ruta.

```js
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});
```

###Middleware de nivel de direccionador

El middleware de nivel de direccionador funciona de la misma manera que el middleware de nivel de aplicación, con la diferencia de que se enlaza a una instancia de __express.Router()__.

```js
var router = express.Router();
```
Para usar el middleware de nivel de direccionador, se utilizan las funciones __router.use()__ y __router.METHOD()__. A continuación, se muestra un ejemplo de la utilización de router con el mismo ejemplo que se mostró anteriormente, utilizando ahora el middleware de nivel de direccionador:

```js
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
```

###Middlware de manejo de errores

El middleware de manejo de errores, siempre utiliza __cuatro__ argumentos. Se deben __insertar siempre los 4 argumentos__ para que se pueda identificar bien que es una función middleware de manejo de errores. Se debe de incluir el objeto next, aunque no se necesite su uso, para fijar los 4 argumentos y que no se tome como un middleware normal.

El argumento adicional que lleva un middleware de manejo de errores es el argumento __err__ que se suele indicar al principio de los 4:

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('¡Algo falló!');
});
```

El middleware de manejo de errores se define al final, después de otras llamadas de __rutas__ y __app.use()__. Las respuestas de una función middleware pueden estar en el formato que se prefiera, como por ejemplo, una página de errores HTML.

El siguiente ejemplo, muestra la ejecución de un código con middlewares como los que se han visto hasta ahora, y un middleware de manejo de errores definido debajo:

```js
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(clientErrorHandler);
app.use(errorHandler);
```

Donde __clientErrorHandler__ es un middleware de manejo de errores que podría estar definido de la siguiente manera:

```js
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
```

Y __errorHandler__ sería la función final que detecta todos los errores:

```js
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
```

###Middleware incorporado

Excepto __express.static__, todas las funciones de middlware que se incluían previamente con Express están ahora en módulos diferentes. La única función de middleware incorporada en Express es __express.static__. Esta función es responsable del servicio de activos estáticos de una aplicación.

El argumento __root__ especifica el directorio raíz desde el que se realizan los servicios.

El objeto __options__ opcional puede tener las siguientes propiedades:

* dotfiles: Opción para el servicio de dotfiles. Posibles valores: "allow", "deny" e "ignore".

* etag: Habilitar o inhabilitar la generación de etag. Posibles valores: true o false.

* extension: Establece las reservas de extensiones de archivos. (Matriz).

* index: Envía el archivo de índices de directorios.

* lastModified: Se establece en la última fecha de modificación del archivo en el sistema operativo. Posibles valores: true o false.

* maxAge: Se establece la cabecera Cache-Control en milisegundos.

* redirect: Redirecciona a la "/" final cuando el nombre de vía de acceso es un directorio.

* setHeaders: Función para establecer las cabeceras HTTP que se sirven con el archivo.

A continuación se expone un ejemplo de una función de middleware __express.static__ con un objeto options especificado:

```js
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```
###Middleware de terceros

El middleware de terceros es muy útil a la hora de añadir funcionalidad a las aplicaciones Express. Se ha de tener instalado __npm__ para poder añadir dichos paquetes.

Por ejemplo para la utilización de una función muy utilizada como es el análisis de cookies con __cookie-parser__ se deberán de seguir los siguientes pasos:

```sh
$ npm install cookie-parser
```

Y una vez instalado, ya podremos usarlo en nuestro código:

```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
```

Hay muchas más funciones de middleware de terceros que se utilizan con Express.

En el siguiente enlace puede consultar una lista con las principales funciones y sus utlidades: [Funciones de middleware de terceros](http://expressjs.com/es/resources/middleware.html)

