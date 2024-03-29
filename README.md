# Práctica: Analizador léxico para un subconjunto de JavaScript

## Despliegue

* [Heroku](https://analizador-lexico-js-egos.herokuapp.com)
* [IAAS](http://10.6.128.161:8081/)


## Descripción
* tdop.html contains a description of Vaughn Pratt’s Top Down Operator Precedence, and describes the parser whose lexer we are going to write in this lab. Is a simplified version of JavaScript.
* The file index.html parses parse.js and displays its AST.
* The page depends on on parse.js and tokens.js.
* The file parse.js contains the Simplified JavaScript parser.
* tokens.js produces an array of token objects from a string. This is the file we are going to work in this lab.
* Douglas Crockford escribió su analizador léxico sin usar expresiones regulares. Eso hace que sea extenso (268 líneas). Su analizador es un subconjunto de JS que no tiene - entre otras cosas - expresiones regulares ya que uno de sus objetivos era que el analizador se analizara a si mismo.
---
## Requisitos
1. Douglas Crockford escribió su analizador léxico sin usar expresiones regulares. Reescriba el analizador léxico en `tokens.js` usando expresiones regulares.
2. No se limite a copiar el fichero `tokens.js`: estúdielo, entiéndalo y vaya modificando el `tokens.js` original de Crockford hasta obtener una solución basada en expresiones regulares
3. Evite que se hagan copias de la cadena siendo procesada. Muévase dentro de la misma cadena usando lastIndex. Tiene una solución dada por el profesor en [link](https://github.com/crguezl/ull-etsii-grado-pl-minijavascript/blob/gh-pages/tokens.js).
4. Mejore la solución de Crockford usado regexps en `tokens.js`
5. Haga el despliegue de su aplicación en Heroku o en la máquina virtual del IAAS.
6. Complete los apuntes en su GitBook describiendo las expresiones regulares y lo aprendido en esta práctica
7. Opcional: Use sessions para controlar quien accede a sus apuntes. Puede ver un ejemplo de como hacerlo en [este repositorio.](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples)
8. Cuando haga la entrega indique los enlaces a los repos (apuntes y analizador) así como a los despliegues
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
