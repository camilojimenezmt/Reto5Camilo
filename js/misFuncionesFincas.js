const baseUrl = "http://152.67.255.53:8080/api/"

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url: baseUrl + "Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionFincas() {
    $.ajax({
        url: baseUrl + "Farm/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaFinca(response);
        }

    });

}

function pintarRespuestaFinca(response){

    let myTable="<table  border = 1>"
    myTable+="<tr>";
        myTable+="<th>Nombre</th>";
        myTable+="<th>Direccion</th>";
        myTable+="<th>Extension</th>";
        myTable+="<th>Descripcion</th>";
        myTable+="<th>Categoria</th>";
        myTable+="<th colspan = 3> Acciones </th>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].address + "</td>";
        myTable+="<td>" + response[i].extension + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button onclick="borrar(' + response[i].id + ')">Borrar Finca!</button></td>';
        myTable+='<td><button onclick="cargarDatosFinca(' + response[i].id + ')">Llenar Campos!</button></td>';
        myTable+='<td><button onclick="actualizar(' + response[i].id + ')">Actualizar Finca!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListafinca").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosFinca(id) {
    $.ajax({
        dataType: 'json',
        url: baseUrl + "Farm/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#address").val(item.address);
            $("#extension").val(item.extension);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarFinca() {

  /*  if($("#name2").val().length == 0 || $("#address").val().length == 0 || $("#extension").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{*/

            let elemento = {
                name: $("#name2").val(),
                address: $("#address").val(),
                extension: $("#extension").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: baseUrl + "Farm/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#address").val("");
                    $("#extension").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
//}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: baseUrl + "Farm/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListafinca").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#address").val().length == 0 || $("#extension").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            address: $("#address").val(),
            extension: $("#extension").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: baseUrl + "Farm/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListafinca").empty();
                listarfinca();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#address").val("");
                $("#extension").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
