# JS-VALI

JS-VALI is a JavaScript library designed to validate forms with a wide range of validations.

## Install
Use the NPM command to install the library:

```bash
npm i js-vali
```
Then import it into your project:

	import  vali  from 'js-vali'

## Use
Let's look at a basic example of how to use the library with a simple form.

```html
<form id="form1">
	<input type="text" id="input">
	<button>Submit</button>
</form>
```

Now in the Javascript.

```javascript
const form1=document.getElementById("form1")
const input=document.getElementById("input")
```

To validate this form, proceed as follows.

## formStart()
The `formStart()` function is used to start the validation process.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
        
	vali.formStart()
})
```

## formVali()
The `formVali()` function performs field validation. It takes two parameters: the input value and an array with the desired validations.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	vali.formStart()
	
	vali.formVali(input.value,["required"])
})
```

## formError()
The `formError()` function displays an error message if `formVali()` fails. It takes two parameters: the name of the validation and the error message.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	vali.formStart()
	
	vali.formVali(input.value,["required"])
	
	let error=vali.formError("required","Empty Field")
    console.log(error)//if it fails it returns "Empty Field", if it is correct it returns nothing
})
```

## resultError()
The `resultError()` function allows you to execute actions if any validation fails.

```javascript
	if(vali.resultError()){ 
        // if there is a failure in validations
        // you could make an input change its border to red
		input.style.borderColor="red"
	}else{
        //if it doesn't fail
        //shows the input without the red border
		input.style.borderColor="black"
	}
```

## formFinal()
The `formFinal()` function checks the entire form for errors.

```javascript
form1.addEventListener("submit",(e)=>{
	e.preventDefault()
	
	vali.formStart()
	
	vali.formVali(input.value,["required"])
	
	let error=vali.formError("required","Empty Field")
    console.log(error)//if it fails it returns "Empty Field", if it is correct it returns nothing
	
	if(vali.resultError()){
        // if there is a failure in validations
        // you could make an input change its border to red
		input.style.borderColor="red"
	}else{
        //if it doesn't fail
        //shows the input without the red border
		input.style.borderColor="black"
	}
	
	if(vali.formFinal()){
		console.log("Fomulario sin errores")
	}else{
		console.log("Formulario con errores")
	}
})
```

If you have multiple inputs, simply repeat the validation structure for each one:
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

        vali.formStart()


        vali.formVali(input.value,["required"])

        let error1=vali.formError("required","Campo Vacio")

        if(vali.resultError()){
            // if there is a failure in validations
            // you could make an input change its border to red
            input.style.borderColor="red"
        }else{
            //if it doesn't fail
            //shows the input without the red border
            input.style.borderColor="black"
        }



        vali.formVali(input2.value,["required","isNumber"])
        let error2

        error2=vali.formError("required","Campo Vacio")
        error2=vali.formError("isNumber","Debe ser un numero")

        if(vali.resultError()){
            input.style.borderColor="red"
        }else{
            input.style.borderColor="black"
        }


        if(vali.formFinal()){
            console.log("Fomulario sin errores")
        }else{
            console.log("Formulario con errores")
        }
    })
```

## customVali()
The `customVali()` function allows you to create custom validations without using formVali(). You must pass it a name, a function that returns true or false, and an optional boolean value.

```javascript
function suma(n1,n2){
            var total=n1+n2

            if(total==10){
                return true
            }else{
                return false
            }
        }

vali.customVali("personalizado",suma(5,5),true)

let custom_error=vali.formError("personalizado","Debe ser 10")


vali.customVali("personalizado",suma(5,5),false)

let custom_error=vali.formError("personalizado","La suma no puede ser 10")
```

Can be combined with `formError()` and `resultError()`.

## globalForm()
The `globalForm()` function is used when we want to perform a validation outside of the submit, for example a change event.

```html
<div>
 	<input type="file" id="file">
</div>
<form id="form_global">
 	<input type="text" id="input"><br>
 	<button>Submit</button>
 </form>
```

If we used `formFinal()` it would only analyze the input text and would not take into account the input file, to get it to take into account the input file `globalForm()` is used, this only needs two parameters, the first is an identifier with which we can locate it and the second a name that describes what it is going to do.

```javascript
const file=document.getElementById("file")
const input=document.getElementById("input")
const form_global=document.getElementById("form_global")

file.addEventListener("change",(e)=>{
       vali.formStart()

      var dataFile=e.target.files[0]

      vali.formVali(dataFile,["uploadFile"])

     var errorFile=vali.formError("uploadFile","No se cargo la imagen")
     console.log(errorFile)

    if(vali.globalForm("firstForm","changeFile")){
    }
})
```

## globalFinal()
The `globalFinal()` function will validate and ensure that all events or forms linked by the `globalForm()` identifier have not failed, following the same example as globalForm()

```javascript
form_global.addEventListener("submit",(e)=>{
        e.preventDefault()

        vali.formStart()

        vali.formVali(input.value,["required"])


        if(vali.resultError()){
            input.style.borderColor="red"
        }else{
            input.style.borderColor="black"
        }

        vali.globalFinal("firstForm")

        
        if(vali.globalFinal("firstForm")){
            console.log("No fallaron los eventos change y submit")
        }else{
            console.log("fallo el evento change o sumbit o los dos eventos")
        }
 })
```

## Validations available
Below is a list of the validations available in js-vali:

- required: Please check that the field is not empty.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["required"])
```

------------

- isString: Verifies that the value is a text string.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isString"])
```

------------

- selectRadio: Checks that at least one option in a group of radio buttons is selected.

```javascript
const radio=document.querySelectorAll(".radio")

vali.formVali(radio,["selectRadio"])
```

------------

- selectCheckBox: Checks that at least one option in a group of checkboxes is selected. You can include limits (min and max) for the number of checkboxes selected.

```javascript
const checkbox=document.querySelectorAll(".checkbox")
// min o max : indica el minimo o maximo de casillas marcadas
// 3 : si es minimo 3 casillas o si maximo 3 casillas
vali.formVali(checkbox,["selectCheckBox|min|3"])
// o 
vali.formVali(checkbox,["selectCheckBox"])
```

------------

- isNumber: Verifies that the value is a number.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isNumber"])
```

------------

- isInteger: Verifies that the value is an integer.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isInteger"])
```

------------

- isFloat: Verifies that the value is a decimal number.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isFloat"])
```

------------

- isBoolean: Checks that the value is a boolean (true or false). It also allows you to check if the value is equal to a specific boolean.

```javascript
vali.formVali(true,["isBoolean"])
// o
vali.formVali(true,["isBoolean|true"]) // success
// o
vali.formVali(true,["isBoolean|false"]) // fail
```

------------

- lenMin: Checks that the length of the value is greater than or equal to a specified minimum.

```javascript
const select=document.getElementById("select")

vali.formVali(select.value,["lenMin|10"])
```

------------

- lenMax: Checks that the length of the value is less than or equal to a specified maximum.

```javascript
const select=document.getElementById("select")

vali.formVali(select.value,["lenMax|5"])
```

------------

- isArray: Checks that the value is an array. You can also check the minimum or maximum number of elements in the array.

```javascript
vali.formVali([1,2,3,4,5],["isArray"])
// o 
vali.formVali([1,2,3,4,5],["isArray|min|5"]) // mínimo
// o
vali.formVali([1,2,3,4,5],["isArray|max|5"]) // máximo
```

------------

- differentTo: Checks that the value is different from a specified value.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["differentTo|default"])
```

------------

- equalTo: Checks that the value is equal to a specified value.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["equalTo|password"])
```

------------

- isEmail: Verifies that the value is a valid email address.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isEmail"])
```

------------

- validatedDate: Verifies that the value is a valid date in YYYY-MM-DD format.

```javascript
const date=document.getElementById("date")

vali.formVali(date.value,["valitedDate"])
```

------------

- uploadFile: Verifies that a file has been selected and that it belongs to the File or FileList class.

```javascript
const file=document.getElementById("file")

vali.formVali(e.target.files[0],["uploadFile"])
//o
vali.formVali(file.files,["uploadFile"])
```

------------

- sizeFile: Checks that the file size is within the specified limits. Allows you to specify whether the size should be minimum or maximum and the unit of measurement (KB).

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

- typeFile: Verifies that the MIME type of the file is one of the allowed types.

```javascript
const file=document.getElementById("file")

vali.formVali(e.target.files[0],["typeFile|image/jpeg|image/png"])
//o
vali.formVali(file.files,["typeFile|image/jpeg|image/png"])
```

------------

- isURL: Verifies that the value is a valid URL.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isURL"])
```

------------

- notUse: Checks that the value does not contain any characters from a specified list.

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["notUse|áéíóú0123456789ÁÉÍÓÚ"])
```

------------

- isColor: Verifies that the value is a valid color in hexadecimal format (#FFFFFF).

```javascript
const input=document.getElementById("input")

vali.formVali(input.value,["isColor"])
```

------------