var ArrayAgenda =  Array();
var LlaveSelecciona =0;

var AgendaMantenimiento = function() {
  var tablaAgenda = document.querySelector('#tablaContactos');
  return {
    listar: function(){
      var body = document.getElementsByTagName("body")[0];
      var Datos = JSON.parse(localStorage.getItem("Contactos"));
      var ArrayDatos = Datos.ContactosDeAgenda;
      var tbl     = document.querySelector('#tablaContactos');
      var tblBody = document.createElement("tbody");

      var rowCount = tbl.rows.length;
      for(var i=1; i<rowCount; i++) {
           var row = tbl.rows[i];
           var chkbox = row.cells[0].childNodes[0];
           tbl.deleteRow(i);
           rowCount--;
           i--;
      }

      ArrayDatos.forEach(function(entry,item,array) {
        var row = document.createElement("tr");
        for (var prop in entry) {
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(entry[prop]);
          celda.appendChild(textoCelda);
          row.appendChild(celda);
        }
        tblBody.appendChild(row);
      })
      tbl.appendChild(tblBody);
      body.appendChild(tbl);

      tbl.setAttribute("border", "2");
    },
    nuevo: function(objcontacto){
      var Datos = JSON.parse(localStorage.getItem("Contactos"));
      if (Datos == null){
        ArrayAgenda.push(objcontacto);
        var contactoAgenda = JSON.stringify({"ContactosDeAgenda": ArrayAgenda});
        localStorage.setItem("Contactos", contactoAgenda);
      }
      else{
        objcontacto.Llave = Datos.ContactosDeAgenda.length +1;
        Datos.ContactosDeAgenda.push(objcontacto);
        var contactoAgenda = JSON.stringify({"ContactosDeAgenda": Datos.ContactosDeAgenda});
        localStorage.setItem("Contactos", contactoAgenda);
      }
      return "Contacto Creado Exitosamente";
    },
    modificar: function(objcontacto,Posicion){
      ArrayAgenda[Posicion] = objcontacto;
      return "Contacto Modificado Exitosamente";
    },
    eliminar: function(Posicion){
      delete ArrayAgenda[Posicion];
      return "Contacto Eliminado Exitosamente";
    }
  };
}

var agenda = new AgendaMantenimiento();

var registroGuardar = function() {
  var MsjRespuesta = "";
  var textboxesCorrectos = 0;
  var textonombrecompleto = document.querySelector('#textboxesAgenda [name=InputNombre]');
  var textotelefono = document.querySelector('#textboxesAgenda [name=InputTelefono]');
  var textodireccion = document.querySelector('#textboxesAgenda [name=exampleInputPassword1]');
  var textoemail= document.querySelector('#textboxesAgenda [name=InputEmail]');

  return {
    GuardarContacto: function()
    {
      if (textonombrecompleto.value != "" ){
        textonombrecompleto.style.borderColor="#F5F5F5";
        textboxesCorrectos = textboxesCorrectos + 1;
      }
      else {
        textonombrecompleto.style.borderColor="#FF0000";
      }
      if (textotelefono.value != "" ){
        textotelefono.style.borderColor="#F5F5F5";
        textboxesCorrectos = textboxesCorrectos + 1;
      }
      else {
        textotelefono.style.borderColor="#FF0000";
      }
      if (textodireccion.value != "" ){
        textodireccion.style.borderColor="#F5F5F5";
        textboxesCorrectos = textboxesCorrectos + 1;
      }
      else {
        textodireccion.style.borderColor="#FF0000";
      }
      if (textoemail.value != "" ){
        textoemail.style.borderColor="#F5F5F5";
        textboxesCorrectos = textboxesCorrectos + 1;
      }
      else {
        textoemail.style.borderColor="#FF0000";
      }

      if (textboxesCorrectos == 4){
        var ObjDatoContact = new Object();
        ObjDatoContact.Llave = 1;
        ObjDatoContact.Nombre = textonombrecompleto.value;
        ObjDatoContact.Telefono = textotelefono.value;
        ObjDatoContact.LugarTrabajo = textodireccion.value;
        ObjDatoContact.Correo = textoemail.value;
        MsjRespuesta = agenda.nuevo(ObjDatoContact);
        return alert(MsjRespuesta);
      }
      else {
        alert("Debe de ingresar valores validos.");
      }
    }
  }
};

var registroModificar = function() {
  var MsjRespuesta = "";

  var textonombrecompleto = document.querySelector('#textboxesAgenda [name=InputNombre]');
  var textotelefono = document.querySelector('#textboxesAgenda [name=InputTelefono]');
  var textodireccion = document.querySelector('#textboxesAgenda [name=exampleInputPassword1]');
  var textoemail= document.querySelector('#textboxesAgenda [name=InputEmail]');
  return {
    ModificarContacto: function()
    {
      if (PosicionArrayAgenda >= 0 && PosicionArrayAgenda <= ArrayAgenda.length){
        var objAgendaExistente = new Object();
        var ObjDatoContact = new Object();

        objAgendaExistente = ArrayAgenda[PosicionArrayAgenda];

        ObjDatoContact.Nombre = textonombrecompleto.value;
        ObjDatoContact.Telefono = textotelefono.value;
        ObjDatoContact.LugarTrabajo = textodireccion.value;
        ObjDatoContact.Correo = textoemail.value;

        ObjDatoContact.Nombre = (ObjDatoContact.Nombre == "") ? objAgendaExistente.Nombre : ObjDatoContact.Nombre;
        ObjDatoContact.LugarTrabajo =(ObjDatoContact.LugarTrabajo == "") ? objAgendaExistente.LugarTrabajo : ObjDatoContact.LugarTrabajo;
        ObjDatoContact.Telefono =(ObjDatoContact.Telefono == "") ? objAgendaExistente.Telefono : ObjDatoContact.Telefono;
        ObjDatoContact.Correo =(ObjDatoContact.Correo == "") ? objAgendaExistente.Correo : ObjDatoContact.Correo;
        MsjRespuesta = agenda.modificar(ObjDatoContact,PosicionArrayAgenda);
        return alert(MsjRespuesta);
      }
      else {
        alert("Debe de ingresar posicion valida para modificar.");
      }
    }
  }
};

var registroListar = function() {
  return {
    CancelarContacto: function()
    {
      return agenda.listar();
    }
  }
};

var registroEliminar = function() {
  var MsjRespuesta = "";

  return {
    EliminarContacto: function(PosicionArrayAgenda)
    {
        if (PosicionArrayAgenda >= 0 && PosicionArrayAgenda <= ArrayAgenda.length){
          MsjRespuesta = agenda.eliminar(PosicionArrayAgenda);
          return alert(MsjRespuesta);
        }
        else {
          alert("Debe de ingresar posicion valida para eliminar.");
        }
    }
  }
};

document.addEventListener('DOMContentLoaded', function(event) {
  //var menu = new SeleccionaMenu();
  //menu.opcion();
  var btnGuardar = document.querySelector('#botonesAgenda [name=botonesGuardar]');
  var btnModificar = document.querySelector('#botonesAgenda [name=botonesModificar]');
  var btnEliminar = document.querySelector('#botonesAgenda [name=botonesEliminar]');
  var btnCancelar= document.querySelector('#botonesAgenda [name=botonesCancelar]');
  var tablaContact= document.querySelector('#tablaContactos');

  btnGuardar.addEventListener('click', function(eventoBoton) {
    var Guardar = new registroGuardar();
    Guardar.GuardarContacto();
    eventoBoton.preventDefault();
  });

  btnModificar.addEventListener('click', function(eventoBoton) {
    var Modificar = new registroModificar();
    Modificar.ModificarContacto();
    eventoBoton.preventDefault();
  });

  btnCancelar.addEventListener('click', function(eventoBoton) {
    var Cancelar = new registroListar();
    Cancelar.CancelarContacto();
    eventoBoton.preventDefault();
  });

  btnEliminar.addEventListener('click', function(eventoBoton) {
    var Eliminar = new registroEliminar();
    Eliminar.EliminarContacto();
    eventoBoton.preventDefault();
  });

  tablaContact.addEventListener('click', function(eventoBoton){
    //alert(document.getElementById('tablaContactos').tBodies[0].rows[0].cells[0].innerHTML);
    //alert(document.getElementById('tablaContactos').tBodies[0].rows[2].cells[0].innerHTML);

    $("#tablaContactos tr").click(function() {
      LlaveSelecciona = $(this).children("td").html();
      $("#llavein").val(parseInt(LlaveSelecciona));
    });

    $("#nombrein").val(document.getElementById('tablaContactos').tBodies[1].rows[1].cells[1].innerHTML);
    $("#telin").val(document.getElementById('tablaContactos').tBodies[1].rows[1].cells[2].innerHTML);
    $("#direccionin").val(document.getElementById('tablaContactos').tBodies[1].rows[1].cells[3].innerHTML);
    $("#emailin").val(document.getElementById('tablaContactos').tBodies[1].rows[parseInt(LlaveSelecciona)].cells[4].innerHTML);


    //eventoBoton.preventDefault();
  });

});
