const baseUrl = "http://152.67.255.53:8080/api/"

function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:baseUrl + "Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    
    })

}
function pintarRespuesta2(respuesta){

    let myTable="<table  border = 1>";
    myTable+="<tr>";
    myTable+="<th>Correo Electronico</th>";
    myTable+="<th>Contraseña</th>";
    myTable+="<th>Nombre</th>";
    myTable+="<th>Edad</th>";
    myTable+="<th colspan = 2> Acciones </th>";
    "</tr>";    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente(){
    let var2 = {
        
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:baseUrl + "Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:baseUrl + "Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            autoInicioCliente();
            alert("se ha Actualizado correctamente Cliente")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: baseUrl + "Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")
        }
    });

}