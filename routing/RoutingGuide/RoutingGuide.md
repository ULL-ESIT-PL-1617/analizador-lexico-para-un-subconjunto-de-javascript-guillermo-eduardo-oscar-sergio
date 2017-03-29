# Routing Guide

## Direccionamiento

Hace referencia a la definición de puntos finales de aplicación (URI) y cómo se tiene que responder a las peticiones de los clientes. Si quiere ver lo básico de Direccionamiento vaya a [aquí](../BasicRouting/BasicRouting.md).  
~~~
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

//En caso de que se haga una petición GET a la página de inicio se responderá con un 'hello world'
~~~
---
## Métodos de ruta

Los métodos de ruta de Express derivan de los métodos HTTP, los que Express puede controlar son: *get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify,  subscribe, unsubscribe, patch, search y connect*.

Aparte de estos, existe un tipo de direccionamiento especial, *app.all()*, que no deriva de ningún método HTTP sino que se utiliza para cargar funciones de [Middleware](../UsingMiddleware/UsingMiddleware.md) en una vía de acceso para todos métodos de solicitud. A continuación se pone un ejemplo.

~~~
app.all('/private', function (req, res, next) {
  console.log('Accediendo a la zona privada...');
  next();
});

//El next() realiza una operación de pasarle el control al siguiente controlador
~~~


## Vías de acceso a la ruta

Las vías de acceso a la ruta definen los puntos finales en los que se pueden realizar las solicitudes. Las vías de acceso de ruta pueden ser series, patrones de serie o expresiones regulares.

### Tipos de vías de acceso

#### Series

~~~
app.get('/', function (req, res) {
  res.send('Página de inicio');
});

// Esta vía de acceso coincidirá con las solicitudes a la ruta raíz (/)
~~~
---
~~~
app.get('/about', function (req, res) {
  res.send('Página about');
});

// Esta vía de acceso coincidirá con las solicitudes a la ruta /about
~~~
---
~~~
app.get('/random.text', function (req, res) {
  res.send('random.text');
});

// Es similar a las anteriores, la vía de acceso coincidirá con las solicitudes a la ruta /random.text
~~~

#### Patrones de serie

~~~
app.get('/PL?', function(req, res) {
  res.send('PL?');
});

// Esta vía de acceso coincidirá con las solicitudes PL o P
// El símbolo *?* indica que el carácter anterior puede o no aparecer.
~~~

---
~~~
app.get('/Procesadores+', function(req, res) {
  res.send('Procesadores+');
});

// Esta vía de acceso coincidirá con las solicitudes "Procesadores", "Procesadoress", "Procesadoresss", ..., etc.
// El símbolo *+* indica que el carácter anterior debe aparecer como mínimo una vez y no tiene número máximo.
~~~
---
~~~
app.get('abo*ut', function(req, res) {
  res.send('abo*ut');
});

// Esta vía de acceso coincidirá con las solicitudes "about", "abotttttut", "abo652438ut", ..., etc.
// El símbolo *\** indica que en su posición puede aparecer cualquier cosa, incluso un espacio vacío.
~~~
---
~~~
app.get('/abb(ou)?t', function(req, res) {
 res.send('abb(ou)?t');
});

// Está vía de acceso coincidirá con las solicitudes "abbt" o "abbout".
// En este caso el símbolo *?* afecta a los paréntesis anteriores.
~~~

#### Expresiones regulares

~~~
app.get(/z/, function(req, res) {
  res.send('/z/');
});

// Está vía de acceso coincidirá con cualquier valor que contenga una z
~~~
---
~~~
app.get(/.*ot$/, function(req, res) {
  res.send('/.*ot$/');
});

// Esta vía de acceso coincidirá con cualquier valor que termine por "*ot".
~~~


## Manejadores de rutas

Puede proporcionar varias funciones de devolución de llamada que se comportan como [Middleware](../UsingMiddleware/UsingMiddleware.md) para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar *next('route')* para omitir el resto de las devoluciones de llamada de ruta. Puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

Los manejadores de rutas pueden tener la forma de una función, una matriz de funciones o combinaciones de ambas, como se muestra en los siguientes ejemplos.

Una función de devolución de llamada individual puede manejar una ruta.
~~~
app.get('/about/sergio', function (req, res) {
  res.send('Hola de parte de sergio!');
});
~~~
---
Más de una función de devolución de llamada puede manejar una ruta (asegúrese de especificar el objeto next).
~~~
app.get('/about/sergio2', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hola de parte de sergio2!');
});
~~~
---
Una matriz de funciones de devolución de llamada puede manejar una ruta.
~~~
var a1 = function (req, res, next) {
  console.log('a1');
  next();
}

var a2 = function (req, res, next) {
  console.log('a2');
  next();
}

var a3 = function (req, res) {
  res.send('Hola de parte de sergio3!');
}

app.get('/about/sergio3', [a1, a2, a3]);

// Se busca en el orden de la matriz de funciones
~~~
---
Una combinación de funciones independientes y matrices de funciones puede manejar una ruta.
~~~
var b1 = function (req, res, next) {
  console.log('b1');
  next();
}

var b2 = function (req, res, next) {
  console.log('b2');
  next();
}

app.get('/about/sergio4', [b1, b2], function (req, res, next) {
  console.log('La respuesta no estaba en la matriz, sino en la función siguiente ...');
  next();
}, function (req, res) {
  res.send('Hola de parte de sergio4!');
});
~~~
---

## Métodos de respuesta

Hasta ahora hemos visto el método de respuesta *send*, sin embargo existen bastante más con sus propias funcionalidades. Es vital que exista un método de respuesta ya que sino la petición se queda colgada. A continuación se ponen los métodos de respuesta.

__res.download()__: Solicita un archivo para descargarlo.  

__res.end()__: Finaliza el proceso de respuesta.  

__res.json()__: Envía una respuesta JSON.  

__res.jsonp()__: Envía una respuesta JSON con soporte JSONP.  

__res.redirect()__: Redirecciona una solicitud.  

__res.render()__: Representa una plantilla de vista.  

__res.send()__: Envía una respuesta de varios tipos.  

__res.sendFile()__: Envía un archivo como una secuencia de octetos.  

__res.sendStatus()__: Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta.
