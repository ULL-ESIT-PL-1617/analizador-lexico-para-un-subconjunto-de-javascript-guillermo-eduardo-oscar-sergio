
---

# Expresiones Regulares en JavaScript

Una expresión regular en Javascript se trata como un tipo de objeto. Las expresiones regulares pueden ser creadas por el constructor de `RegExp` o de manera literal.

```javascript
var exp1 = new RegExp("abc");
var exp2 = /abc/;
```

---

### Test

Las expresiones regulares tienen ciertos métodos para su correcto funcionamiento. El más básico de estos es `test`. A este método le pasaremos una cadena y nos dirá si dicha cadena casa o no con la expresión regular que hemos indicado.

```javascript
console.log(/abc/.test("abcde"));
// → true
```

---

### Atajos

Existen un grupo de caracteres que debido a su gran uso tienen definidos sus propios atajos que están incorporados al lenguaje.

* **\d** Cualquier carácter de dígito.
* **\w** Un carácter alfanumérico.
* **\s** Cualquier carácter de espacio en blanco.
* **\D** Un carácter que no es un dígito.
* **\W** Un carácter no alfanumérico.
* **\S** Un carácter que no sea espacio en blanco.
* **.** Cualquier carácter excepto el retorno de carro.

---

### Repeticiones de parte de una expresión

En este apartado veremos como repetir una parte de nuestra expresión, existen dos operadores principalmente:

* **+** el cierre positivo, este tipo de cierre indica que la expresión se tiene que repetir una o más veces para que se produzca un casamiento.
* __*__ el cierre de kleene funciona de manera similar al cierre positivo pero al contrario que este, para que se produzca un casamiento deben existir 0 o más repeticiones de nuestro patrón.

```javascript
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true
```

Además de estos, existen otros operadores tales como `?` que indica que un carácter o patrón puede aparecer o no.

---

### Match

El método `test` es la forma más sencilla para comprobar si una cadena casa o no con nuestra expresión regular. Pero este método solo da a concer si la cadena coincidió o no. Las expresiones regulares también disponen de otro método llamado `exec` que nos devolverá _null_ en caso de que no se de el casamiento o un objeto con información en caso afirmativo.

```javascript
var match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
```

El objeto retornado por `exec` es un array que contiene información de la parte de la cadena que casó con la expresión regular, a partir de dónde lo hace y con qué subcadena. Tiene un atributo `index` que nos dice en qué posición de la cadena se comenzó a producir el casamiento.

Cuando la expresión regular contiene subexpresiones agrupadas mediante paréntesis, las cadenas que coincidieron con esos grupos serán mostradas en el array detrás de la cadena que contiene la coincidencia entera.

---

### Tipos de operadores

Los operadores de las expresiones regulares más utilizados son los llamados **operadores Greedy**. Estos son los operadores que hemos explicado hasta ahora, voraces, que siempre casan con la cadena más larga posible dentro del String donde se esté buscando un _matching_. Sin embargo, no son el único tipo de operadores de los que disponemos.

Los **operadores lazy** trabajan al revés que los operadores Greedy, es decir, intentan hacer el menor trabajo posible buscando casar con la cadena más corta. En cuanto encuentran una cadena lo bastante pequeña que case con la expresión, no siguen analizando. Todos los operadores Greedy tienen su versión de operador lazy, y se obtienen aplicando una interrogación al operador greedy. `*?` es el cierre de Kleene lazy, `+?` es el cierre positivo lazy... Estos operadores son fundamentales, puesto que por ejemplo el lenguaje de los comentarios no se podría reconocer sin ellos.

---

### Buscar el contenido de una variable por medio de una RegExp

En ocasiones podría ser interesante tratar de incorporar el contenido de una variable a una expresión regular. Por ejemplo, si necesitamos una expresión regular que forme una frase con una palabra determinada, pero dicha palabra se encuentra con una variable. En este caso no podemos recurrir directamente a las expresiones regulares en Javascript, porque en principio los _slashes_ no interpolan bien. No se puede meter una variable dentro de una expresión regular, pero podemos coger la cadena y pasársela al constructor de `RegExp`.

```javascript
var name = "Harry";
var text = "Harry is a suspicious character";  
var regex = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regex, "_$1_"));
// -> _Harry_ is a suspicious character
```

Si nos fijamos, pone `\\b` en lugar de solo `\b`. Eso es porque la expresión va a ser interpretada por el intérprete de Javascript. Este, si solo pusiésemos una barra, la quitaría y tomaría únicamente la `b`. Si ponemos dos barras, quita la primera barra únicamente e interpreta la segunda como literal, usándola para construir la expresión regular. Entonces la expresión regular lee `\b` e interpreta el fin de palabra.

El problema de utilizar este sistema es que nada te asegura que dentro del String que estás utilizando para construir la expresión regular no hay ningún carácter raro. En esos casos, los que hay que hacer es escapar los símbolos, para que actúen como símbolos normales y no como metasímbolos. Lo mejor que se suele hacer es escapar tan solo aquello que no sean letras. Podemos hacerlo así:

```javascript
var escaped = name.replace(/[^\w\s]/g, "\\$&");
// var escaped = name.replace(/[\W\S}/g, "\\$&");
// En el recuadro de código anterior, antes de declarar la regexp
```

---

### Carencias de Javascript

Algunos lenguajes permiten declarar unas macros que hacen que la expresión regular funcione, por ejemplo, con los caracteres de un determinado idioma. Por ejemplo, para que identifiquen la letra ñ española. Sin embargo, Javascript no nos da esta posibilidad.

Otra carencia del Javascript para el manejo de expresiones regulares son las anclas. En Javascript no existe ningún ancla, es decir, que no se puede especificar que se quiera que una expresión case en un _index_ determinado. Para suplir la falta de un ancla en este lenguaje, lo que podemos hacer es añadirle un nuevo método a los objetos de `RegExp` que haga las veces de ancla, como el que escribimos a continuación:

```javascript
RegExp.prototype.bexec = function(str) {
	// this en este método es el objeto expresión regular que invoca al método
	var i = this.lastIndex;
	// Ahora hago un exec normal; el index del matching se guardará en el objeto m
	var m = this.exec(str);
	// Si el index que hay en m es el mismo que el que deseábamos, se devuelve m, y si no se devuelve null
	if (m && m.index == i) 
		return m;
	return null;
}
```


---

### Resumen

* `/abc/` A sequence of characters
* `/[abc]/` Any character from a set of characters
* `/[^abc]/` Any character not in a set of characters
* `/[0-9]/` Any character in a range of characters
* `/x+/` One or more occurrences of the pattern x
* `/x+?/` One or more occurrences, nongreedy
* `/x*/` Zero or more occurrences
* `/x?/` Zero or one occurrence
* `/x{2,4}/` Between two and four occurrences
* `/(abc)/` A group
* `/a|b|c/` Any one of several patterns
* `/\d/` Any digit character
* `/\w/` An alphanumeric character (“word character”)
* `/\s/` Any whitespace character
* `/./` Any character except newlines
* `/\b/` A word boundary
* `/^/` Start of input
* `/$/` End of input

---

### Las expresiones regulares en el análisis léxico

El principal uso que se les da a las expresiones regulares, como ya hemos visto, es el de identificar patrones dentro de una determinada cadena de caracteres. Aunque no es posible especificar absolutamente cualquier lenguaje mediante expresiones regulares, sí que podemos identificar los distintos elementos que aparecen dentro de un código. Las palabras, los símbolos y los números predominan en los lenguajes de programación, lo cual hace de las expresiones regulares una herramienta ideal para examinar códigos.

Debido a esto último, la fase de análisis léxico de una compilación se fundamenta en el uso de expresiones regulares. En esta primera fase de la compilación, el objetivo es identificar los distintos `tokens` del lenguaje y organizarlos en un árbol de análisis léxico. Así, se identifican todos aquellos caracteres desconocidos que no debieran estar en el código, a fin de que el análisis sintáctico pueda despreocuparse de esa tarea y concentrarse en decorar el árbol con una mayor información. 

Hemos elaborado un analizador léxico para un subconjunto de Javascript haciendo uso de expresiones regulares. Se puede ver todo el código [aquí](https://github.com/ULL-ESIT-PL-1617/analizador-lexico-para-un-subconjunto-de-javascript-guillermo-eduardo-oscar-sergio) y el servicio en funcionamiento en [Heroku](https://analizador-lexico-js-egos.herokuapp.com). 











---

















