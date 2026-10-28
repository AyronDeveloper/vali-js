# JS-VALI

### Una librería de validaciones para JavaScript y TypeScript.
JS-VALI permite validar datos mediante reglas reutilizables, comprobar formularios y definir validaciones personalizadas.


## Instalación
Instala la librería desde npm:

```bash
npm i js-vali
```

Para instalar una versión específica.

```bash
npm i js-vali@2.0.0
```

## Importación

```javascript
import { Rules, Vali, jsVali } from "js-vali";
```

La librería exporta tres elementos principales:
- Rules: contiene los métodos de validación.
- Vali: permite crear instancias independientes.
- jsVali: proporciona una instancia compartida lista para utilizar.


## Uso básico
### Validaciones individuales
Puedes utilizar Rules directamente:

```javascript
import { Rules } from "js-vali";

console.log(Rules.required("Hola")); // true
console.log(Rules.isEmail("correo@ejemplo.com")); // true
console.log(Rules.isNumber("123")); // true
console.log(Rules.isBoolean("true")); // true
```

Cada regla devuelve un booleano que indica si el valor cumple la condición.

## Validación con jsVali

```javascript
import { jsVali } from "js-vali";

jsVali.start();

jsVali.validation("correo@ejemplo.com", {
    required: {
        error: "El correo es obligatorio"
    },
    isEmail: {
        error: "El correo no es válido"
    }
});

console.log(jsVali.getValiError()); // true
console.log(jsVali.getMsgError());  // ""
console.log(jsVali.resultVali());   // true
```

Métodos disponibles en Vali:

| Método | Descripción |
|---|---|
| `start()` | Inicia una validación y reinicia el estado. |
| `validation(value, validations)` | Ejecuta las reglas indicadas. |
| `custom(condition, vali, error)` | Comprueba una condición personalizada. |
| `getValiError()` | Devuelve el resultado de la última validación. |
| `getMsgError()` | Devuelve el último mensaje de error. |
| `resultVali()` | Indica si hubo fallos durante el proceso actual. |
||

Debes llamar a start() antes de ejecutar validation().

## Crear una instancia independiente
Puedes crear validadores separados para gestionar diferentes procesos:

```javascript
import { Vali } from "js-vali";

const validator = new Vali();

validator.start();

validator.validation("usuario123", {
    required: {
        error: "El campo es obligatorio"
    },
    isString: {
        error: "El valor debe ser una cadena"
    }
});

console.log(validator.resultVali());
console.log(validator.getMsgError());
```

Cada instancia mantiene su propio estado.

## Validaciones personalizadas
Utiliza custom() para comprobar condiciones específicas.

```javascript
import { jsVali } from "js-vali";

const password = "abc123";
const confirmPassword = "abc123";

jsVali.start();

jsVali.custom(
    password === confirmPassword,
    true,
    "Las contraseñas no coinciden"
);

console.log(jsVali.getValiError());
console.log(jsVali.getMsgError());
console.log(jsVali.resultVali());
```

El primer argumento es la condición que quieres comprobar, el segundo es el valor esperado y el tercero es el mensaje de error opcional.

## Reglas disponibles
La clase Rules incluye los siguientes métodos:

| Regla | Descripción |
|---|---|
| `required(value)` | Comprueba que el valor no sea nulo, indefinido o una cadena vacía. |
| `isString(value)` | Comprueba si el valor es una cadena. |
| `isAlpha(value)` | Comprueba si contiene letras y espacios simples entre palabras. |
| `selectRadio(value)` | Comprueba si hay un botón de opción seleccionado. |
| `selectCheckBox(boxes, params)` | Valida la cantidad de casillas seleccionadas. |
| `isNumber(value)` | Comprueba si el valor representa un número finito. |
| `isInteger(value)` | Comprueba si el valor representa un entero. |
| `isDecimal(value)` | Comprueba si el valor representa un número no entero. |
| `isBoolean(value)` | ComAcepta booleanos y las cadenas "true" o "false". |
| `lenMin(value, params)` | Comprueba la longitud mínima. |
| `lenMax(value, params)` | Comprueba la longitud máxima. |
| `isArray(value)` | Comprueba si el valor es un array. |
| `differentTo(value, params)` | Comprueba si el valor es diferente del indicado. |
| `equalTo(value, params)` | Comprueba si el valor es igual al indicado. |
| `isEmail(value)` | Comprueba el formato básico de un correo electrónico. |
| `valitedDate(value))` | Comprueba una fecha válida en formato YYYY-MM-DD. |
| `uploadFile(value)` | Comprueba si se ha proporcionado un archivo o una colección válida. |
| `sizeFile(value, params)` | Comprueba el tamaño de los archivos. |
| `typeFile(value, params)` | Comprueba los tipos MIME permitidos. |
| `isURL(value)` | Comprueba si es una URL HTTP o HTTPS válida. |
| `notUse(value, params)` | Comprueba que el texto no contenga expresiones prohibidas. |
| `isColor(value)` | Comprueba si el navegador reconoce el valor como un color CSS. |
||

Consulta las declaraciones TypeScript incluidas en el paquete para conocer los parámetros disponibles para cada regla.

## Ejemplos de validaciones
### Longitud mínima y máxima

```javascript
import { Rules } from "js-vali";

console.log(Rules.lenMin("usuario", { min: 3 }));
console.log(Rules.lenMax("usuario", { max: 20 }));
```

### Comparar valores
```javascript
import { Rules } from "js-vali";

console.log(Rules.equalTo("123", { to: 123 }));
console.log(Rules.differentTo("admin", { to: "usuario" }));
```

Estas dos reglas utilizan comparaciones no estrictas (== y !=).

### Seleccionar casillas
```javascript
import { Rules } from "js-vali";

const boxes = document.querySelectorAll<HTMLInputElement>(
    'input[name="intereses"]'
);

const valid = Rules.selectCheckBox(boxes, {
    min: 1,
    max: 3
});

console.log(valid);
```

### Validar archivos
```javascript
import { Rules } from "js-vali";

const input = document.querySelector<HTMLInputElement>("#archivo");

if (input?.files) {
    console.log(Rules.uploadFile(input.files));

    console.log(
        Rules.sizeFile(input.files, {
            max: 2,
            unit: "MB"
        })
    );

    console.log(
        Rules.typeFile(input.files, {
            types: ["image/png", "image/jpeg"]
        })
    );
}
```

Las validaciones de archivos necesitan las APIs correspondientes del navegador

## Uso en el navegador
La distribución UMD puede utilizarse mediante una etiqueta script:

```html
<script src="node_modules/js-vali/dist/js-vali.min.js"></script>

<script>
    const { Rules, Vali, jsVali } = JsVali;

    console.log(Rules.required("Hola"));
</script>
```

Este ejemplo presupone que el archivo UMD expone el objeto global JsVali.

En producción, asegúrate de servir el archivo desde una ruta pública válida.


## TypeScript
La librería incluye declaraciones de tipos para mejorar el autocompletado y detectar errores durante el desarrollo.z

```typescript
import { Rules, Vali, jsVali } from "js-vali";
import type { Validation } from "js-vali";

const validations: Validation = {
    required: {
        error: "El campo es obligatorio"
    }
};
```

## Consideraciones
- Las reglas de archivos y colores dependen de APIs del navegador.
- selectRadio() y selectCheckBox() trabajan con elementos HTMLInputElement.
- Las reglas deben recibir valores y parámetros compatibles con sus definiciones.
- Algunas configuraciones inválidas pueden provocar errores.
- jsVali es una instancia compartida. Utiliza new Vali() cuando necesites estados independientes.

## Autor
### Ayron Developer
- GitHub: https://github.com/AyronDeveloper/vali-js
- Sitio web: https://vali.ayrondeveloper.com/

## Licencia
Este proyecto está bajo la licencia MIT.