const baseUrl = "http://152.67.255.53:8080/api/"

function autoInicioRelacionCliente(){
    
    $.ajax({
        url:baseUrl + "Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoIniciofinca(){

    $.ajax({
        url:baseUrl + "Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-finca");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}


function consultarInformacionMensajes(){
    console.log("se esta ejecutando")
    $.ajax({
        url: baseUrl + "Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    
    })

}

function pintarRespuestaMensajes(respuesta){

    let myTable="<table border = 1>";
    myTable+="<tr>";
    myTable+="<th>Mensaje</th>";
    myTable+="<th>Finca</th>";
    myTable+="<th>Cliente</th>";
    myTable+="<th colspan = 2> Acciones </th>";
    "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].farm.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMensaje("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}

function guardarInformacionMensajes(){
    if ($("#messagetext").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{   
    let var2 = {     
        messageText:$("#messagetext").val(),
        farm:{id: +$("#select-finca").val()},
        client:{idClient: +$("#select-client").val()},   
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url: baseUrl + "Message/save",
       
        
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
}

function actualizarInformacionMensaje(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messagetext").val(),
        farm:{id: +$("#select-finca").val()},
        client:{idClient: +$("#select-client").val()},

    


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: baseUrl + "Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            $("#messagetext").val("");
           
            consultarInformacionMensajes();
            alert("se ha Actualizado correctamente el Mensaje")
        }
    });

}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: baseUrl + "Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            consultarInformacionMensajes();
            alert("Se ha Eliminado.")
        }
    });

}