const baseUrl = "http://152.67.255.53:8080/api/"
function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url: baseUrl + "Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url: baseUrl + "Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table border = 1>";
        myTable+="<tr>";
        myTable+="<td></td>";
        myTable+="<td><b>Fecha de devolucion</b></td>";
        myTable+="<td><b>Fecha de Inicio</b></td>";
        myTable+="<td><b>Estado</b></td>";
        "</tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
            myTable+="<th>total</th>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
    }

    function traerReporteClientes(){
        $.ajax({
            url:baseUrl + "Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let myTable="<table border = 1>";
        myTable+="<tr>";
        myTable+="<td></td>";
        myTable+="<td><b>N° Reservaciones</b></td>";
        myTable+="<td><b>Nombre del cliente</b></td>";
        myTable+="<td><b>Correo Electronico</b></td>";
        myTable+="<td><b>Edad</b></td>";
        "</tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
            myTable+="<th>total</th>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }
