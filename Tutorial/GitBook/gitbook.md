# GitBook

#### ¿Qué es?

[GitBook](/www.gitbook.com "Gitbook") es una plataforma online para la publicación de libros, documentos, manuales y trabajos de investigación en Internet. Lanzado en el 2014, GitBook permite tanto a usuarios individuales como a organizaciones empresariales crear sus publicaciones digitales en Internet empleando el sistema de control de versiones Git, desarrollando los contenidos mediante el uso de la sintaxis en Markdown.

La plataforma ha sido creada bajo código abierto que podemos consultar en los servidores de GitHub. Podremos crear  cuentas de usuarios de  manera tradicional o incluso usando nuestra cuenta de GitHub y dando permisos a la aplicación. Además de GitHub podremos usar cuentas de Twitter, Facebook o Google. GitBook nos permite elegir si queremos que nuestra publicación sea pública o privada, para lo cual tendremos que tener una cuenta de pago.

#### Instalar GitBook

Gitbook esta implementado usando [NodeJS](https://nodejs.org/es/) \(Capítulo 2\) y podremos instalarlo usando [NPM](https://www.npmjs.com/):

```
$npm install gitbook-cli --save-dev
```

#### Como se utiliza GitBook

Una vez tengamos instalado GitBook podremos empezar a crear nuestros libros que estarán alojadas en un repositorio de la plataforma.

Para **crear nuestro libro** tendremos que hacer:

```
$gitbook init nombre_del_libro
```

Esto nos creará una carpeta con el nombre de nuestro libro en la que se encuentran todos los ficheros MarkDown del mismo. También podremos crear un libro desde la propia página web de [Gitbook](https://www.gitbook.com/) y hacer un 'clone' para tenerlo en local.

Una vez nuestro libro haya sido creado en gitbook.com, necesitaremos añadir cierto contenido al mismo. Para ello podremos usar el editor de libros online o la línea de comandos. Si queremos editar nuestro libro desde la línea de comandos podemos usar Git para empujar el contenido.

Cada libro creado en gitbook.com tiene una url HTTPS asociada con el siguiente formato:

```
https://git.gitbook.com/{{UserName}}/{{Book}}.git
```

Llegados a este punto tendremos que crear un nuevo repositorio git en el que se alojará nuestro libro. Crearemos una rama remota al repositorio de gitbook donde se encuentra nuestro libro para así poder empujar el contenido del mismo. Veamoslo en un ejemplo:

```
touch README.md SUMMARY.md
git init
git add README.md SUMMARY.md
git commit -m "first commit"
git remote add gitbook https://git.gitbook.com/{{UserName}}/{{Book}}.git
git push -u -f gitbook master
```



