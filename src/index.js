let count=0
let countGlobal=[]
let result=true
let validators=""

let error=false
let errorMessage=""
const voidMessage=(msg)=>{
    if(msg==null || msg.trim()==""){
        return true
    }else{
        return false
    }
}


/* */
const required=(value)=>{
    if(value.trim()!=""){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const isString=(value)=>{
    if(typeof value == "string"){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const selectRadio=(value)=>{
        
    const radio=(array)=>{
        var arrayLen

        if(isNaN(array)){
            arrayLen=array.length
        }else{
            arrayLen=array
        }

        for(var i=0;i<arrayLen;i++){
            if(array[i].checked){
                return true
            }
        }
        return false
    }

    if(radio(value)){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const selectCheckBox=(value,limit=null,len=null)=>{
    //console.log(limit)
    //console.log(len)
    //console.log(value)

    const check=(array)=>{
        var arrayLen
        var count=0

        if(isNaN(array)){
            arrayLen=array.length
        }else{
            arrayLen=array
        }

        if(limit!=null && len!=null){
            //console.log(arrayLen)
            //console.log("No estan vacio limit ni len")
            for(var i=0;i<arrayLen;i++){
                if(array[i].checked){
                    count++
                }
            }
            if(limit=="min"){
                return count>=len?true:false
            }else if(limit=="max"){
                return count<=len?true:false
            }
        }else{
            //console.log("Estan vacio limit ni len")
            for(var i=0;i<arrayLen;i++){
                if(array[i].checked){
                    return true
                }
            }
            return false
        }
    }

    if(check(value)){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }

}
const isNumber=(value)=>{
    if(!isNaN(value)){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const isInteger=(value)=>{
    if(Number.isInteger(parseInt(value)) && !value.includes(".")){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const isFloat=(value)=>{
    if(!isNaN(value) && value.includes(".")){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const isBoolean=(value,result=null)=>{
    if(typeof value=="boolean"){
        result=true
        error=false

        if(result!=null){
            const boolean=JSON.parse(result)
            if(boolean){
                if(value){
                    result=true
                    error=false
                }else{
                    count++
                    result=false
                    error=true
                }
            }else{
                if(!value){
                    result=true
                    error=false
                }else{
                    count++
                    result=false
                    error=true
                }
            }
        }
    }else{
        count++
        result=false
        error=true
    }
}
const lenMin=(value, min)=>{
        
    if(value.length>=min){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const lenMax=(value, max)=>{
    if(value.length<=max){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const isArray=(value,limit=null,len=null)=>{
    if(Array.isArray(value)){
        result=true
        error=false

        if(limit!=null && len!=null){
            console.log(value)
            if(limit=="min"){
                if(value.length>=len){
                    result=true
                    error=false
                }else{
                    count++
                    result=false
                    error=true
                }

            }else if(limit=="max"){
                if(value.length<=len){
                    result=true
                    error=false
                }else{
                    count++
                    result=false
                    error=true
                }
            }

        }
    }else{
        count++
        result=false
        error=true
    }
}
const differentTo=(value, different)=>{
    if(value!=different){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const equalTo=(value, equal)=>{
    if(value==equal){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const isEmail=(value)=>{
    const email=(email)=>{
        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    if(email(value)){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const valitedDate=(value)=>{
    const formatDate=/^\d{4}-\d{2}-\d{2}$/

    if(formatDate.test(value)){
        const date=new Date(value)
        if(!isNaN(date) || date.toString()!="Invalid Date"){
            //console.log(date.toString())
            result=true
            error=false
        }else{
            //console.log(date.toString())
            count++
            result=false
            error=true
        }

    }else{
        count++
        result=false
        error=true
    }
}
const uploadFile=(value)=>{
    if(value instanceof FileList){
        if(value.length>0){
            result=true
            error=false
        }else{
            count++
            result=false
            error=true
        }

    }else if(value instanceof File){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}
const sizeFile=(value, more, size, UA=null)=>{
    let FileSize

    if(value instanceof  FileList){
        FileSize=value[0].size
    }else if(value instanceof File){
        FileSize=value.size
    }else{
        count++
        result=false
        error=true
        return
    }

    let bytes=1024
    if(UA=="KB"){
            let sizeKB=FileSize/bytes

        if(more=="min"){
            if(size<=sizeKB){
                result=true
                error=false
            }else{
                count++
                result=false
                error=true
            }
        }
        else if(more=="max"){
            if(size>=sizeKB){
                result=true
                error=false
            }else{
                count++
                result=false
                error=true
            }
        }
    }else{
        if(more=="min"){
            if(size<=FileSize){
                result=true
                error=false
            }else{
                count++
                result=false
                error=true
            }
        }
        else if(more=="max"){
            if(size>=FileSize){
                result=true
                error=false
            }else{
                count++
                result=false
                error=true
            }
        }
    }
}
const typeFile=(value,mine)=>{
    let FileType
    if(value instanceof  FileList){
        FileType=value[0].type
    }else if(value instanceof File){
        FileType=value.type
    }else{
        count++
        result=false
        error=true
        return
    }

    if(mine.includes(FileType)){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}    
const isURL=(value)=>{
    try{
        new URL(value)
        result=true
        error=false
    }catch(_){
        count++
        result=false
        error=true
    }
}
const isAlpha=(value)=>{
    const regex=/^[A-Za-z]+$/
    if(regex.test(value)){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }

}
const notUse=(value, invalid)=>{
    //console.log(invalid)
    const escaped=invalid.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
    const regex=new RegExp(`[${escaped}]`)
    if(!regex.test(value)){
        //console.log("No tiene lo solcitado")
        result=true
        error=false
    }else{
        //console.log("Tiene lo solcitado")
        count++
        result=false
        error=true
    }
}
const isColor=(value)=>{
    //console.log(value)
    const regex=/^#[0-9A-Fa-f]{6}$/
    if(regex.test(value)){
        result=true
        error=false
    }else{
        count++
        result=false
        error=true
    }
}

/* */


const formStart=()=>{
    count=0
}
/**
 * 
 * @param {any} val 
 * @param {array} validations 
 */
const formVali=(val,validations)=>{
    result=true
    errorMessage=""
    error=false

    let params=[]

    validations.forEach((validate)=>{

        if(result){
            if(validate.search(/\|/)!= -1){
                let array=validate.split(/\|/)

                validate=array[0]

                params=array.slice(1)
            }

            validators=validate


            switch(validate){
                //COMPRUEBA SI UN INPUT ESTA VACIO
                case "required":
                    required(val)
                    break;

                //VALIDA QUE SOLO SEA CADENAS
                case "isString":
                    isString(val)
                    break;

                //VERIFICA SI SELECCIONO UN INPUT RADIO
                case "selectRadio":
                    selectRadio(val)
                    break;
                
                case "selectCheckBox":
                    selectCheckBox(val,params[0]?params[0]:null,params[1]?params[1]:null)

                //VERIFICA SI ES UN NUMERO
                case "isNumber":
                    isNumber(val)
                    break;
                    
                //VERIFICA QUE SEA UN NUMERO ENTERO
                case "isInteger":
                    isInteger(val)
                    break;

                //VERIFICA QUE SEA UN DECIMAL
                case "isFloat":
                    isFloat(val)
                    break;

                //VERIFICA SI ES UN VALOR BOOLEANO
                case "isBoolean":
                    isBoolean(val,params[0]?params[0]:null)
                    break;

                //MINIMA CANTIDAD DE CARACTERES
                case "lenMin":
                    lenMin(val, params[0])
                    break;

                //MAXIMO CANTIDAD DE CARACTERES
                case "lenMax":
                    lenMax(val, params[0])
                    break;
                    
                //VERIFICA SI ES UN ARRAY
                case "isArray":
                    isArray(val,params[0]?params[0]:null,params[1]?params[1]:null)
                    break;

                //VERIFICA QUE SEA DIFERENTE AL VALOR PREDETERMINADO
                case "differentTo":
                    differentTo(val, params[0])
                    break;

                //VERIFICA QUE SE IGUAL A VALOR PREDETERMINADO
                case "equalTo":
                    equalTo(val, params[0])
                    break;

                //VERIFICA SI ES UN EMAIL Y SE SIGUE SU FORMATO
                case "isEmail":
                    isEmail(val)
                    break;

                //VALIDA QUE LA FECHA ESTE EN EL FORMATO YYYY-MM-DD
                case "valitedDate":
                    valitedDate(val)
                    break;

                //VALIDA SI SE CARGO UN ARCHIVO
                case "uploadFile":
                    uploadFile(val)
                    break;

                //VALIDA EL PESO DE UN ARCHIVO EN KB O bytes
                case "sizeFile":
                    sizeFile(val,params[0],params[1],params[2]?params[2]:null)
                    break;
                    
                //VALIDA EL TIPO DE ARCHIVO QUE SE SOLICITA
                case "typeFile":
                    typeFile(val,params)
                    break;
                    
                //VALIDA SI EL FORMATO DE URL ES CORRECTO
                case "isURL":
                    isURL(val)
                    break;

                //VALIDA CARACTERES ALFABETICOS
                case "isAlpha":
                    isAlpha(val)
                    break;
                    
                case "notUse":
                    notUse(val,params[0])
                    break;

                //VALIDA QUE TENGA EL FORMATO DE COLOR #000000
                case "isColor":
                    isColor(val)
                    break;
            }

        }

    })
}

const customVali=(name,validation,result=true)=>{
    //console.log(validation)
    
    validators=name

    if(result){
        if(validation){
            result=true
            error=false
        }else{
            count++
            result=false
            error=true
        }
    }else{
        if(!validation){
            result=true
            error=false
        }else{
            count++
            result=false
            error=true
        }
    }
}

const formError=(vali, message=null)=>{
    if(error){

        if(!result && validators==vali){
            error=false
            return errorMessage=voidMessage(message)?`${vali} Error`:message
        }else{
            errorMessage=""
            error=true
            return errorMessage
        }

    }else{
        return errorMessage
    }
}

const resultError=(functionFailed=null,functionSucces=null)=>{
    if(functionFailed!=null && functionFailed!=null){
        if(result){
            //SOLO QUIERO QUE SE EJECUTE LA PRIMERA FUNCION CALLBACK
            functionFailed()
        }else{
            //SOLO QUIERO QUE SE EJECUTE LA SEGUNDA FUNCION CALLBACK
            functionSucces()
        }

    }else{
        return result?false:true
    }
}

const formFinal=()=>{
    if(count==0){
        //this.#countGlobal.push(true)
        return true
    }else{
        //this.#countGlobal.push(false)
        return false
    }

}

const globalForm=(identifier=null, name="")=>{
    if(identifier!=null){
        let arrayExists=countGlobal.find(data=>data[0]==identifier)

        if(arrayExists){
            let deleteIndice

            if(name!=""){
                if(arrayExists.includes(`${name} true`)){
                    deleteIndice=`${name} true`
                }else if(arrayExists.includes(`${name} false`)){
                    deleteIndice=`${name} false`
                }
                
                let indice=arrayExists.indexOf(deleteIndice)
                arrayExists.splice(indice, 1)
                //console.log(arrayExists)

                arrayExists.push(count==0?(`${name} true`).trim():(`${name} false`).trim())
                //console.log(arrayExists)

            }else{
                arrayExists.push(count==0?(`true`).trim():(`false`).trim())
            }
        }else{
            countGlobal.push([identifier,count==0?(`${name} true`).trim():(`${name} false`).trim()])
        }
        //console.log(this.#countGlobal)

        if(count==0){
            //this.#countGlobal.push(true)
            return true
        }else{
            //this.#countGlobal.push(false)
            return false
        }

    }
}

const globalFinal=(identifier)=>{
    //console.log(this.#countGlobal)

    const arrayFind=countGlobal.find(data=>data[0]==identifier)

    if(!arrayFind.some(array=>array.includes("false"))){
        countGlobal=countGlobal.filter(data=>data[0]!=identifier)
        //console.log(this.#countGlobal)
        return true
    }else{
        var findFalse=[]
        var findTrue=[]

        arrayFind.forEach((array, index)=>{
            if(array=="false"){
                findFalse.push(index)
            }
            if(array=="true"){
                findTrue.push(index)
            }
        })

        if(findFalse!=0){
            findFalse.forEach(array=>{
                arrayFind.splice(array, 1)
            })
        }

        if(findTrue.length!=0){
            findTrue.forEach(array=>{
                arrayFind.splice(array, 1)
            })
        }

        //this.#countGlobal=this.#countGlobal.filter(data=>data[0]!=identifier)
        //console.log(this.#countGlobal)
        return false
    }
}


export default{
    formStart,
    formVali,
    customVali,
    formError,
    resultError,
    formFinal,
    globalForm,
    globalFinal
}