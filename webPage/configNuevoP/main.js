var arregloDatosAQ = Array();

function guardar (){
    let AQ = document.getElementById("AQ").value;
    let CA = document.getElementById("CA").value;
    
    console.log("AQ: " + AQ + " " + "CA: " + CA);
    resp = confirm("¿Desea guardar los datos?");
    
    if(resp){
        let nuevoElemento = Array();
        nuevoElemento.push(AQ);

        arregloDatosAQ.push(nuevoElemento);
        document.getElementById("formulario").reset();
        alert("Datos guardados");
    }
    return false;
    
}

function visualizar(){
    console.log("En la funcion visualizar");
}

