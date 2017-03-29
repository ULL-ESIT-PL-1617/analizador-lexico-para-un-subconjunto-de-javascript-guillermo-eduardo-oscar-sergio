# Basic Routing

#### ¿Qué es?

Se refiere a la determinación de cómo una aplicación responde a una petición de cliente a un punto final particular, que es un URI \(o ruta\) y un método de solicitud HTTP específico \(GET, POST, y así sucesivamente\).

Cada ruta puede tener una o más funciones de controlador, que se ejecutan cuando se compara la ruta.

La definición de ruta tiene la siguiente estructura:

```js
app.METHOD(PATH, HANDLER)
```

* app es una instancia de _express._
* METHOD es un método de petición HTTP.
* PATH es una ruta en el servidor.
* HANDLER es una función ejecutada cuando se compara la ruta.

#### 

#### Ejemplos

Responder con`Hello World!`en la página principal:

```js
app.get('/', function (req, res){
    res.send('Hello World!')
})
```

Responder a POST solicitud en la ruta raíz \(`/`\), la página principal de la aplicación:

```js
app.post('/', function(req, res){
    res.send('Got a POST request')
})
```

Responder a una solicitud PUT a la`/user`ruta:

```js
app.put('/user', function (req, res){
    res.send('Got a PUT request at /user')
})
```

Respuesta a una petición de borrado al`/user`recorrido:

```js
app.delete('/user', function(req, res){
    res.send('Got a DELETE request at /user')
})
```



