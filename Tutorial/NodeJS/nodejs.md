# NODEJS

[NodeJS](https://nodejs.org/en/) es un entorno en tiempo de ejecución multiplataforma, de código abierto, pensado para funcionar en el lado del servidor pero no limitándose a ello. Está basado en el motor V8 de Javascript de Google, y por tanto sus ficheros de configuración y prácticamente cualquier forma de interactuar con él se hace mediante Javascript. Sabemos que Javascript es un lenguaje asíncrono: NodeJS utiliza de la misma manera entradas y salidas asíncronas que se ejecutan concurrentemente utilizando únicamente un hilo de ejecución. El resultado es un entorno de ejecución del lado del servidor que compila y ejecuta Javascript a velocidades muy altas.

El motor V8 de Javascript de Google está diseñado para correr en un navegador y ejecutar el código de Javascript de una forma extremadamente rápida. De hecho, la velocidad de este motor a la hora de ejecutar se debe principalmente a que compila Javascript en código máquina nativo, en lugar de interpretarlo y ejecutarlo como bytecode. Posee un amplio conjunto de liberías que lo convierten en una herramienta muy completa.

> Node.js facilita mucho la creación de programas altamente escalables en un servidor

Ya hemos mencionado que Node trabaja con un único hilo de ejecución, encargado de organizar todo el flujo de trabajo, pero, ¿qué sucede si ese hilo se pone a realizar una tarea que lleva X tiempo y queda bloqueado? La respuesta es que esto nunca sucede, pues Node gestiona todas sus tareas de forma asíncrona. Delega todo el trabajo en lo que se llama un pool de threads, y una vez completado, este pool emitirá un evento que será recibido de nuevo por Node. Una función de callback se encarga de terminar de procesarlo.

¿Qué problema resuelve Node? Pues principalmente ahorra la necesidad de utilizar lenguajes como Java o PHP en el lado del servidor, para los que cada conexión genera un nuevo hilo que conlleva un consumo extra de memoria. El cuello de botella deja de ser entonces el número máximo de conexiones concurrentes que puede manejar un servidor. Se cambia la forma en que se realiza la conexión, pasando de ser un nuevo hilo de ejecución a un evento asíncrono dentro de Node.

---

### NODE PACKAGE MANAGER

El [Node Package Manager](https://www.npmjs.com), para abreviar NPM, es un gestor de módulos y aplicaciones para NodeJS, con el cual los desarrolladores pueden crear, compartir y reutilizar módulos en las aplicaciones que se ejecutan en este entorno. Los módulos son desde pequeños objetos hasta aplicaciones completas de un catálogo que ha llegado a ser muy extenso.

Al instalar NodeJS, es bastante probable que NPM se instale también. En cualquier caso, se puede instalar o actualizar NPM con el siguiente comando:

```
$ npm install npm@latest -g
$ npm --para comprobar si está instalado
```

Hay dos formas de instalar módulos en NPM: de forma global o de forma local. Es importante saber cómo funcionan porque dependiendo de las necesidades del programador, conviene utilizar una u otra. La diferencia básica radica en que hay ciertos módulos que permiten ser utilizados mediante la línea de comandos desde cualquier lugar del sistema de archivos. La instalación es exactamente igual que la local, pero añadiendo la opción `-g`.

Con la instalación local, el módulo se instalará localmente en el proyecto, en una carpeta llamada `node_modules`, que se crea automáticamente cuando instalamos nuestro primer módulo:

```
$ npm install [nombre-modulo] --instalacion
$ npm docs [nombre-modulo]    --para ver su documentacion
```

Para utilizar los módulos, desde una aplicación NodeJS, creamos una variable para asociarla al módulo:

```
var modulo = require('modulo');
```

Una tarea fundamental para trabajar con NPM es conocer el archivo `package.json`. Evita instalar módulos uno a uno ya que los descarga de forma automática, facilita la instalación de nuestra aplicación a otros desarrolladores y permite almacenar todos los ficheros y documentación de una determinada aplicación en un solo lugar. Así, la estructura de un proyecto NodeJS se compondría de los ficheros de código fuente, el directorio `node_modules` y el archivo `package.json`.

```
{
    "name": "app",
    "version": "2.77.02",
    "dependencies": {
        "modulo": "version",
        "modulo2": "version"
    }
}
```

Esta es la sintaxis más sencilla de un archivo `package.json`. Desde la raíz de nuestro proyecto, ejecutaríamos el siguiente comando y se instalarían automáticamente los módulos especificados:

```
$ npm install
```

Esto tiene otra ventaja importante, y es que no haría falta copiar el contenido de la carpeta `node_modules`, porque las dependencias ya estarían incluidas en el `package.json`. Por esto, es una buena práctica añadir al fichero .gitignore la carpeta `node_modules`, ya con el `package.json` nos bastaría.

