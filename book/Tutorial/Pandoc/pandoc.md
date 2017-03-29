# Pandoc

Pandoc es un **conversor** libre y de código abierto, escrito en **Haskell**,  que convierte archivos escritos en un determinado lenguaje de marcado, como MarkDown por ejemplo, a otro tipo de lenguaje. Fue creada por **John MacFarlane**, un profesor de Filosofía de la Universidad de Michigan, y representa una herramienta muy potente a la hora de convertir archivos.

### Funcionamiento

El funcionamiento de Pandoc es bastante sencillo. Se le pasa al programa un fichero escrito en MarkDown o en cualquiera de los formatos de entrada que soporta \(se especificarán más adelante\),  y lo pasa a un formato determinado, de entre los incluídos en formatos de salida.

### Formatos soportados por Pandoc

Pandoc puede convertir los siguientes formatos de entrada a los consiguientes de salida, cualquier combinación de éstos es posible gracias a ésta aplicación

**Entrada**:

* reStructuredText                                          
* textile                                                              
* HTML                                                              
* DocBook                                                         
* LaTeX                                                             
* MediaWiki markup                                        
* TWiki markup                                                
* OPML                                                             
* Emacs Org-Mode                                          
* Txt2Tags
* Microsoft Word docx
* Libre Office ODT
* EPUB
* Haddock markup

**Salida:**

* HTML y todos sus formatos 
* Microsoft Word y sus formatos
* OpenOffice/LibreOffice
* Ebooks
* Formatos de documentación \(DocBook...\)
* InDesign ICML
* OPML
* LaTeX y sus formatos
* PDF
* Lenguajes de marcado \(Markdown, MediaWiki markup...\)

### Instalación y uso

Para instalar Pandoc, debemos descargarnos un paquete para nuestro correspondiente sistema operativo en la página web oficial de Pandoc

[http://pandoc.org/installing.html](http://pandoc.org/installing.html "Enlace de descarga de Pandoc")

Una vez tengamos Pandoc instalado, usar el conversor es bastante sencillo a través de la línea de comandos

Para ello, debemos especificar:

* El formato de entrada, con la opción **-f**
* El formato de salida con la opción **-t**
* El nombre del fichero que queremos convertir \( Debe de estar en el mismo formato que el formato de salida\).
* La opción **-s**, permite que Pandoc añada plantillas y cabeceras al nuevo fichero creado.
* La opción **-o**, nos permite mandar la salida a un determinado fichero y no a la salida estándar.

#### **Ejemplos:**

Formato para la ejecución del comando:

```
pandoc nombreFicheroEntrada -f formatoEntrada -t formatoSalida -s -o nombreficheroSalida
```

Ejemplo de uso para un fichero ejemplo **test.md** y que se quiere pasar a **html**:

```
pandoc test.md -f markdown -t html -s -o test.html
```



