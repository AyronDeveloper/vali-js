# JS-VALI

JS-VALI es una librería de JavaScript diseñada para validar formularios con una amplia gama de validaciones.

Estoy trabajando en un sitio web con más detalles, ¡así que paciencia!

## Instalación
Utiliza el comando NPM para instalar la librería:

```bash
npm i js-vali
```
Luego, impórtala en tu proyecto:

	import  vali  from 'js-vali'

o también puedes importar funciones específicas:

	import { formStart, formVali, formError, formFinal } from 'js-vali'

## Uso
Veamos un ejemplo básico de cómo usar la librería con un formulario simple.

```html
<form id="form1">
	<input type="text" id="input">
	<button>Submit</button>
</form>
```

Ahora en el Javascript.

```javascript
const form1=document.getElementById("form1")
const input=document.getElementById("input")
```

Para validar este formulario se realiza de la siguiente manera.

## formStart()
La función `formStart()` sirve para iniciar el proceso de validación.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
        
	vali.formStart()
})
```

## formVali()
La función `formVali()` realiza la validación de un campo. Toma dos parámetros: el valor del input y un array con las validaciones deseadas.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	vali.formStart()
	
	vali.formVali(input.value,["required"])
})
```

De esta forma analizara lo que introduzca por el input.
`required` es una de las validaciones, este verifica que el input no se encuntre vacio.

## formError()
La función `formError()` muestra un mensaje de error si `formVali()` falla. Recibe dos parámetros: el nombre de la validación y el mensaje de error.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	vali.formStart()
	
	vali.formVali(input.value,["required"])
	
	let error=vali.formError("required","Campo Vacio")
	console.log(error)//en caso falle devuelve "Campo Vacio", si esta correcto no devuelve nada
})
```

## resultError()
La función `resultError()` te permite ejecutar acciones si alguna validación falla.

```javascript
	if(vali.resultError()){ 
        // si hay un fallo en las validaciones 
        // podrias hacer que un input cambie su borde a rojo
		input.style.borderColor="red"
	}else{
         //en caso no falle
        //muestra al input sin el borde rojo
		input.style.borderColor="black"
	}
```

## formFinal()
La función `formFinal()` verifica si no hay errores en el formulario completo.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	vali.formStart()
	
	vali.formVali(input.value,["required"])
	
	let error=vali.formError("required","Campo Vacio")
	console.log(error)//en caso falle devuelve "Campo Vacio", si esta correcto no devuelve nada
	
	if(vali.resultError()){
         //si hay un fallo en las validaciones 
        //podrias hacer que un input cambie su borde a rojo
		input.style.borderColor="red"
	}else{
         //en caso no falle
        //muestra al input sin el borde rojo
		input.style.borderColor="black"
	}
	
	if(vali.formFinal()){
		console.log("Fomulario sin errores")
	}else{
		console.log("Formulario con errores")
	}
})
```

Si tienes varios inputs, simplemente repite la estructura de validación para cada uno:
HTML

```html
    <form id="form1">
        <input type="text" id="input"><br>
        <input type="text" id="input2"><br>
        <button>Submit</button>
    </form>
```

JavaScript

```javascript
form1.addEventListener("submit",(e)=>{
        e.preventDefault()

        //inicia las validaciones
        vali.formStart()


        //valida el primer input
        vali.formVali(input.value,["required"])

        let error1=vali.formError("required","Campo Vacio")

        if(vali.resultError()){
            input.style.borderColor="red"
        }else{
            input.style.borderColor="black"
        }



        // valida el segundo input 
        vali.formVali(input2.value,["required","isNumber"])
        let error2

        error2=vali.formError("required","Campo Vacio")
        error2=vali.formError("isNumber","Debe ser un numero")

        if(vali.resultError()){
            input.style.borderColor="red"
        }else{
            input.style.borderColor="black"
        }


        //se repite la misma estructura si tienen mas inputs
        //las funciones formError() y resultError() son opcionales 
        //no afecta en nada si no estan, solo que no podran mostrar errores


        //verifica que ningun input haya fallado
        if(vali.formFinal()){
            console.log("Fomulario sin errores")
        }else{
            console.log("Formulario con errores")
        }
    })
```

## customVali()
La función `customVali()`  permite crear validaciones personalizadas sin usar formVali(). Debes pasarle un nombre, una función que retorne true o false, y un valor booleano opcional.

```javascript
function suma(n1,n2){
            var total=n1+n2

            if(total==10){
                return true
            }else{
                return false
            }
        }

//nombre para identificar 
//true o false
//se espera un true o false por defecto viene en true
vali.customVali("personalizado",suma(5,5),true) //por defecto el tercer parametro el true

let custom_error=vali.formError("personalizado","Debe ser 10")


//en caso el terce parametro sea false
vali.customVali("personalizado",suma(5,5),false)

let custom_error=vali.formError("personalizado","La suma no puede ser 10")
```

Se puede conbinar con `formError()` y `resultError()`.


## globalForm()
La función `globalForm()` se utiliza cuando queremos realizar una validacion fuera del submit, por ejemplo un evento change.

```html
<div>
 	<input type="file" id="file">
</div>
<form id="form_global">
 	<input type="text" id="input"><br>
 	<button>Submit</button>
 </form>
```

Si utilizaramos el `formFinal()` solo analizaria el input text y no tomaria en cuenta al input file, para lograr que tome en cuenta al input file se utilza `globalForm()` , este solo necesita dos parametros, el primero es un identificador con el cual podremos ubicarlo y el segundo un nombre que describa lo que va a realizar.

```javascript
const file=document.getElementById("file")
const input=document.getElementById("input")
const form_global=document.getElementById("form_global")

file.addEventListener("change",(e)=>{
       vali.formStart()

      var dataFile=e.target.files[0]

      //VALIDACION PARA VER SI SE SUBIO UN ARCHIVO
      vali.formVali(dataFile,["uploadFile"])

      //MENSAJE QUE QUEREMOS QUE DEVUELVA SI FALLA LA VALIDACION
     var errorFile=vali.formError("uploadFile","No se cargo la imagen")
     console.log(errorFile)

    if(vali.globalForm("firstForm","changeFile")){
        //ejecutamos en caso uploadFile no haya fallado
    }
})
```

## globalFinal()
La función `globalFinal()`  validara y se encargara que todos los eventos o formulario vinculado por el identificador de `globalForm()` no hayan fallado. siguiendo el mismo ejemplo del globalForm()

```javascript
form_global.addEventListener("submit",(e)=>{
        e.preventDefault()

        vali.formStart()

        //VALIDACION PARA COMPROBAR SI UN CAMPO NO ESTA VACIO
        vali.formVali(input.value,["required"])


        if(vali.resultError()){
            input.style.borderColor="red" //EN CASO FALLE EL BORDER SERA ROJO
        }else{
            input.style.borderColor="black" //CASO CONTRARIO EL BORDER SE MANTIENE NEGRO
        }

        //INDICAMOS QUE EL EVENTO CHANGE Y EL SUBMIT ESTAN CONECTADOS
        vali.globalFinal("firstForm")

        
        if(vali.globalFinal("firstForm")){ //SI LOS EVENTOS CHANGE Y SUBMIT NO FALLARON ENTONCES
            console.log("No fallaron los eventos change y submit")
        }else{ //CASO CONTRARIO
            console.log("fallo el evento change o sumbit o los dos eventos")
        }
 })
```

## Validaciones disponibles
A continuación se presenta una lista de las validaciones disponibles en js-vali:

- required: Verifica que el campo no esté vacío.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["required"])
```

------------

- isString: Verifica que el valor sea una cadena de texto.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isString"])
```

------------

- selectRadio: Verifica que al menos una opción de un grupo de botones de radio esté seleccionada.

```javascript
const radio=document.querySelectorAll(".radio")

vali.formVali(radio,["selectRadio"])
```

------------

- selectCheckBox: Verifica que al menos una opción de un grupo de checkboxes esté seleccionada. Puede incluir límites (min y max) para la cantidad de checkboxes seleccionados.

```javascript
const checkbox=document.querySelectorAll(".checkbox")
// min o max : indica el minimo o maximo de casillas marcadas
// 3 : si es minimo 3 casillas o si maximo 3 casillas
vali.formVali(checkbox,["selectCheckBox|min|3"])
// o 
vali.formVali(checkbox,["selectCheckBox"])
```

------------

- isNumber: Verifica que el valor sea un número.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isNumber"])
```

------------

- isInteger: Verifica que el valor sea un número entero.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isInteger"])
```

------------

- isFloat: Verifica que el valor sea un número decimal.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isFloat"])
```

------------

- isBoolean: Verifica que el valor sea un booleano (true o false). También permite verificar si el valor es igual a un booleano específico.

```javascript
vali.formVali(true,["isBoolean"])
// o
vali.formVali(true,["isBoolean|true"]) // correcto
// o
vali.formVali(true,["isBoolean|false"]) // error
```

------------

- lenMin: Verifica que la longitud del valor sea mayor o igual a un mínimo especificado.

```javascript
const select=document.getElementById("select")

vali.formVali(select.value,["lenMin|10"])
```

------------

- lenMax: Verifica que la longitud del valor sea menor o igual a un máximo especificado.

```javascript
const select=document.getElementById("select")

vali.formVali(select.value,["lenMax|5"])
```

------------

- isArray: Verifica que el valor sea un array. También puede verificar la cantidad mínima o máxima de elementos en el array.

```javascript
vali.formVali([1,2,3,4,5],["isArray"])
// o 
vali.formVali([1,2,3,4,5],["isArray|min|5"]) // mínimo
// o
vali.formVali([1,2,3,4,5],["isArray|max|5"]) // máximo
```

------------

- differentTo: Verifica que el valor sea diferente a un valor especificado.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["differentTo|default"])
```

------------

- equalTo: Verifica que el valor sea igual a un valor especificado.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["equalTo|password"])
```

------------

- isEmail: Verifica que el valor sea una dirección de correo electrónico válida.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isEmail"])
```

------------

- valitedDate: Verifica que el valor sea una fecha válida en formato YYYY-MM-DD.

```javascript
const date=document.getElementById("date")

vali.formVali(date.value,["valitedDate"])
```

------------

- uploadFile: Verifica que un archivo haya sido seleccionado y que pertenezca a la clase File o FileList.

```javascript
const file=document.getElementById("file")

vali.formVali(e.target.files[0],["uploadFile"])
//o
vali.formVali(file.files,["uploadFile"])
```

------------

- sizeFile: Verifica que el tamaño del archivo esté dentro de los límites especificados. Permite especificar si el tamaño debe ser mínimo o máximo y la unidad de medida (KB).

```javascript
const file=document.getElementById("file")

vali.formVali(e.target.files[0],["sizeFile|min|1|KB"])
//es lo mismo solo que uno esta con KB
vali.formVali(e.target.files[0],["sizeFile|min|1024"])
//o
vali.formVali(e.target.files[0],["sizeFile|max|2|KB"])
//es lo mismo solo que uno esta con KB
vali.formVali(e.target.files[0],["sizeFile|max|2048"])
```

------------

- typeFile: Verifica que el tipo MIME del archivo sea uno de los tipos permitidos.

```javascript
const file=document.getElementById("file")

vali.formVali(e.target.files[0],["typeFile|image/jpeg|image/png"])
//o
vali.formVali(file.files,["typeFile|image/jpeg|image/png"])
```

------------

- isURL: Verifica que el valor sea una URL válida.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isURL"])
```

------------

- isAlpha: Verifica que el valor contenga solo letras (mayúsculas o minúsculas).

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isAlpha"])
```

------------

- notUse: Verifica que el valor no contenga ningún carácter de una lista especificada.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["notUse|áéíóú0123456789ÁÉÍÓÚ"])
```

------------

- isColor: Verifica que el valor sea un color válido en formato hexadecimal (#FFFFFF).

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isColor"])
```

------------