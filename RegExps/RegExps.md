
---

# Expresiones Regulares en JavaScript

Una expresión regular en javascript es un tipo de objeto. Las expresiones regulares pueden ser creadas por el constructor de RedExp o de manera literal.

```
var exp1 = new RegExp("abc");
var exp2 = /abc/;
```

#### Test

las expresiones regulares tienen ciertos métodos para su correcto funcionamiento. El más básico de estos es test. A este método le pasaremos una cadena y nos dirá si dicha cadena casa o no con la expresión regular que hemos indicado.

```
console.log(/abc/.test("abcde"));
// → true
```

#### Atajos

Existen un grupo de caracteres que debido a su gran uso tienen definidos sus propios atajos que están incorporados al lenguaje.

* **\d** Cualquier carácter de dígito.
* **\w** Un carácter alfanumérico.
* **\s** Cualquier carácter de espacio en blanco.
* **\D** Un carácter que no es un dígito.
* **\W** Un carácter no alfanumérico.
* **\S** Un carácter que no sea espacio en blanco.
* **.** Cualquier carácter excepto el retorno de carro.

#### Repeticiones de parte de una expresión.

En este apartado veremos como repetir una parte de nuestra expresión, existen dos operadores principalmente:

* **+** el cierre positivo, este tipo de cierre indica que la expresión se tiene que repetir una o más veces para que se produzca un casamiento.
* **\* **el cierre de kleene funciona de manera similar al cierre positivo pero al contrario que este, para que se produzca un casamiento deben existir 0 o más repeticiones de nuestro patrón.

```
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true
```

Además de estos, existen otros operadores tales como '?' que indica que un caracter o patron puede aparecer o no.

#### Match

El método test es la forma más sencilla para comprobar si una cadena casa o no con nuestra expresión regular. Pero este método solo da a concer si la cadena coincidió o no. Las expresiones regulares también disponen de otro método llamado exec que nos devolverá null en caso de que no se de el casamiento o un objeto con información en caso afirmativo.

```
var match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
```

El objeto retornado por exec tiene un atributo index que nos dice en que posición de la cadena se comenzó a producir el casamiento.

Cuando la expresión regular contiene subexpresiones agrupadas mediante paréntesis, las cadenas que coincidieron con esos grupos serán mostradas en el array detrás de la cadena que contiene la coincidencia entera.





















