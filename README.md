# Práctica: Analizador léxico para un subconjunto de JavaScript
## Descripción
tdop.html contains a description of Vaughn Pratt’s Top Down Operator Precedence, and describes the parser whose lexer we are going to write in this lab. Is a simplified version of JavaScript.
The file index.html parses parse.js and displays its AST.
The page depends on on parse.js and tokens.js.
The file parse.js contains the Simplified JavaScript parser.
tokens.js produces an array of token objects from a string. This is the file we are going to work in this lab.
Douglas Crockford escribió su analizador léxico sin usar expresiones regulares. Eso hace que sea extenso (268 líneas). Su analizador es un subconjunto de JS que no tiene - entre otras cosas - expresiones regulares ya que uno de sus objetivos era que el analizador se analizara a si mismo.
---
## Requisitos
Douglas Crockford escribió su analizador léxico sin usar expresiones regulares. Reescriba el analizador léxico en tokens.js usando expresiones regulares.
No se limite a copiar el fichero tokens.js: estúdielo, entiéndalo y vaya modificando el tokens.js original de Crockford hasta obtener una solución basada en expresiones regulares
Evite que se hagan copias de la cadena siendo procesada. Muévase dentro de la misma cadena usando lastIndex. Tiene una solución dada por el profesor en
https://github.com/crguezl/ull-etsii-grado-pl-minijavascript/blob/gh-pages/tokens.js
Mejore la solución de Crockford usado regexps en tokens.js
Haga el despliegue de su aplicación en Heroku o en la máquina virtual del iaas
Complete los apuntes en su GitBook describiendo las expresiones regulares y lo aprendido en esta práctica
Opcional: Use sessionspara controlar quien accede a sus apuntes. Puede ver un ejemplo de como hacerlo en los ficheros:
ULL-ESIT-PL-1617/evaluar-manejo-de-cookies-y-sessions-en-expressjs
staticauth.js (el servidor)
gbookexample (el libro gitbook)
gbuild (script para compilar el libro)
Cuando haga la entrega indique los enlaces a los repos (apuntes y analizador) así como a los despliegues
---
## Integrantes
* **Eduardo de la Paz González**, [alu0100893267](https://alu0100893267.github.io).
* **Guillermo Esquivel González**, [alu0100881677](https://alu0100881677.github.io).
* **Óscar Darias Plasencia**, [alu0100892833](https://alu0100892833.github.io).
* **Sergio García de la Iglesia**, [alu0100892260](https://sergiogarciadli.github.io).

---
TDOP, Top Down Operator Precedence

Douglas Crockford
douglas@crockford.com

2010-11-12

tdop.html contains a description of Vaughn Pratt's Top Down Operator Precedence,
and describes a parser for Simplified JavaScript in Simplified JavaScript.

index.html parses parse.js and displays its AST. The page depends on json2.js
(which is not included in this project) and on parse.js and tokens.js (which
are).

tdop.js contains a Simplified JavaScript parser. See tdop.html for commentary.

tokens.js produces an array of token objects from a string.
