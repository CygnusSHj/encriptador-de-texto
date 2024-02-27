/*asigna el valor de texto a un parrafo del html para mostrarlo en la pagina */
let contenidoOriginal = document.querySelector('#texto2-rectangulo').textContent;
function asignarTextoElemento(elemento, texto) {
    document.querySelector(elemento).textContent = texto;
    return;
}

function limpiarPanelDeTexto(){
    document.getElementById("panel-de-texto").value = "";
}

function Des_activarBontonCopiar(tipo){
    document.getElementById("boton-copiar").style.display = tipo;
}

function Des_ActivarTextoRectangulo(tipo){
    document.getElementById("texto-rectangulo").style.display = tipo;
    
}

function Des_activarImgMirando(tipo){
    document.getElementById("imagen-mirando").style.display = tipo;
}

function Des_activarOrgullosa(tipo){
    document.getElementById("imagen-orgullosa").style.display = tipo;
}

function Des_ActivarSusurro(tipo){
    document.getElementById("imagen-susurro").style.display = tipo;
}

function reiniciar(){
    Des_ActivarTextoRectangulo("none");
    Des_activarOrgullosa("none");
    Des_activarImgMirando("inline");
    Des_activarBontonCopiar("none");
    limpiarPanelDeTexto();
    return;
}

function accionRealizada(){
    Des_activarBontonCopiar("inline-block");
    Des_ActivarSusurro("none");
    Des_ActivarTextoRectangulo("block");
    Des_activarImgMirando("none");
    Des_activarOrgullosa("inline");
    limpiarPanelDeTexto();
    return;
}

function cadenaInvalida(){
    asignarTextoElemento('#texto2-rectangulo',"El texto no se puede   encriptar");
    Des_ActivarSusurro("inline");
    reiniciar();
    return;
}

function textoNoEncriptado(){
    asignarTextoElemento('#texto2-rectangulo',"El texto no se puede desencriptar");
    Des_ActivarSusurro("inline");
    reiniciar();
    return;
}

function textoVacio(){
    asignarTextoElemento('#texto2-rectangulo',"Intenta ingresar un texto");
    Des_ActivarSusurro("inline");
    reiniciar();
}

function soloMinusculas(dato){
    for(let i = 0;i < dato.length;i++){
        if((dato[i] >= 'A' && dato[i] <= 'Z') || (dato[i] > 126))return false;
    }
    return true;
}

/* retorna verdadero si alguna comparacion es verdadera de lo contrario retorna falso */
function isValid(letra){
    return letra == 'a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u' || letra == 'ai' || letra == 'enter' || letra == 'imes' || letra == 'ober' || letra == 'ufat'; 
}
/*se salta el texto encriptado aumentando la i del ciclo*/ 
function aumentarI(letra){
    let ans = 0;

    switch(letra){
        case 'a':
            ans = 2;
        break;
        case 'e':
            ans = 5;
        break;
        case 'i':
        case 'o':
        case 'u':
            ans = 4;
        break;
    }
    return ans;
}
/* tranforma letra a la palabra encriptada*/
function convertir(letra){
    let ans = "";

    switch(letra){

        case 'a':
            ans = "ai";
        break;
        case 'e':
            ans = "enter";
        break;
        case 'i':
            ans = "imes";
        break;
        case 'o':
            ans = "ober";
        break;
        case 'u':
            ans = "ufat";
        break;

    }
    return ans;
}
/* toma el texto ingresado por el usuario y lo recorre en busca de las vocales para cambiarlas por las palabras correspondientes */
function encriptar() {
    let dato = document.getElementById('panel-de-texto').value;
    
    if(dato == ""){
        textoVacio();
        return;
    }
    if(!soloMinusculas(dato)){
        cadenaInvalida();
        return;
    }

    let valido = false;
    let resultado = "";
    
    for(let i = 0;i < dato.length;i++){
        if(isValid(dato[i]) == true){
            valido = true;
            resultado += convertir(dato[i]);
        }else{
            resultado += dato[i];
        }
    }

    if(!valido){
        cadenaInvalida();
        return;
    }

    asignarTextoElemento('#texto2-rectangulo',resultado);
    accionRealizada();

    return;
}

/* toma el texto ingresado por el usuario y lo recorre en busca de las vocales con las cuales encontraremos la palabra  */
function desencriptar() {
    let dato = document.getElementById('panel-de-texto').value;

    if(dato == ""){
        textoVacio();
        return;
    }
    if(!soloMinusculas(dato)){
        alert("xd");
        textoNoEncriptado();
        return;
    }
    let encriptado = false;
    let resultado = "";
    
    for(let i = 0;i < dato.length;i++){
        resultado += dato[i];
        if(isValid(dato[i])){
            if( (i + aumentarI(dato[i])) <= dato.length && isValid(dato.substring(i,i + aumentarI(dato[i])))){
                encriptado = true;
                i += aumentarI(dato[i]) - 1;
            }
        }
    }
    
    if(!encriptado){
        textoNoEncriptado();
        return;
    }

    asignarTextoElemento('#texto2-rectangulo',resultado);
    accionRealizada();
    
    return;
}

function copiarTexto(){
    let campoTexto = document.getElementById("texto2-rectangulo");
    navigator.clipboard.writeText(campoTexto.textContent);
    asignarTextoElemento("#texto2-rectangulo",contenidoOriginal);
    reiniciar();
}