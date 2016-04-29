//Variables globales
var ArrayAgenda =  Array();
var LlaveSelecciona =0;

//function core realiza el proceso de Guardar y Lista los objetos del arreglo en el localStorage
//el guardado en el localStorage y listado lo realiza con JSON
var AgendaMantenimiento = function() {
  var tablaAgenda = document.querySelector('#tablaContactos');
  return {
    listar: function(){
      var body = document.getElementsByTagName("body")[0];
      var Datos = JSON.parse(localStorage.getItem("Contactos"));
      var ArrayDatos = Datos.ContactosDeAgenda;
      var tbl     = document.querySelector('#tablaContactos');
      var tblBody = document.createElement("tbody");

      // si existe la tabla con tatos en el DOM las elimino, esto para que no dublique la informacion
      // de las tablas con el proceso siguiente
      var rowCount = tbl.rows.length;
      for(var i=1; i<rowCount; i++) {
           var row = tbl.rows[i];
           var chkbox = row.cells[0].childNodes[0];
           tbl.deleteRow(i);
           rowCount--;
           i--;
      }
      // Utiliza 2 recorrigos, 1 para recoger el Array y el segundo para obtener los valores del Object
      // se agregan los elementos de la tabla al DOM
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
      // Obtengo los datos del localStorage, para validar si existen datos anteriores y asi agregar los nuevos
      // esto para no caerle encima a los datos anteriores
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
      // sustituyo los datos viejos con los modificados, segun la posicion del arreglo que seleciona en la tabla
      ArrayAgenda[Posicion] = objcontacto;
      var contactoAgenda = JSON.stringify({"ContactosDeAgenda": ArrayAgenda});
      localStorage.setItem("Contactos", contactoAgenda);
      return "Contacto Modificado Exitosamente";
    },
    eliminar: function(Posicion){
      // Elimino los datos segun la posicion del arreglo que seleciona en la tabla
      delete ArrayAgenda[Posicion];
      var contactoAgenda = JSON.stringify({"ContactosDeAgenda": ArrayAgenda});
      localStorage.setItem("Contactos", contactoAgenda);
      return "Contacto Eliminado Exitosamente";
    }
  };
}

var agenda = new AgendaMantenimiento();

// Guardar el contrato, realiza un querySelector por id para obtener los texbos del index
// valida que los textbox contengan datos para guardar el nuevo contacto
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

// Recibo la posicion del arreglo donde se encuentra el object del contacto que deseo modificar
// valido si esta dejando algun textbox en blanco, le coloco la data que esta actualmente en localStorage
var registroModificar = function(PosicionArrayAgenda) {
  var MsjRespuesta = "";

  var textonombrecompleto = document.querySelector('#textboxesAgenda [name=InputNombre]');
  var textotelefono = document.querySelector('#textboxesAgenda [name=InputTelefono]');
  var textodireccion = document.querySelector('#textboxesAgenda [name=exampleInputPassword1]');
  var textoemail= document.querySelector('#textboxesAgenda [name=InputEmail]');
  //var textoLlave= document.querySelector('#llavein');
  return {
    ModificarContacto: function()
    {
      if (PosicionArrayAgenda >= 0 && PosicionArrayAgenda <= ArrayAgenda.length){
        var objAgendaExistente = new Object();
        var ObjDatoContact = new Object();

        objAgendaExistente = ArrayAgenda[PosicionArrayAgenda];
        ObjDatoContact.Llave = objAgendaExistente.Llave;
        ObjDatoContact.Nombre = textonombrecompleto.value;
        ObjDatoContact.Telefono = textotelefono.value;
        ObjDatoContact.LugarTrabajo = textodireccion.value;
        ObjDatoContact.Correo = textoemail.value;

        ObjDatoContact.Llave = objAgendaExistente.Llave;
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

// Hace una llamado a la function Agenda.listar que es la encargada de hacer un get a
// los datos del localStorage para pintarlos en la tabla
var registroListar = function() {
  return {
    CancelarContacto: function()
    {
      return agenda.listar();
    }
  }
};

// Recibo la posicion del arreglo donde se encuentra el object del contacto que deseo eliminar
// valido que sea una posicion valida del array
var registroEliminar = function(PosicionArrayAgenda) {
  var MsjRespuesta = "";

  return {
    EliminarContacto: function()
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

// Manejor de evento click de los botones y de la row seleccionada de la tabla del DOM
document.addEventListener('DOMContentLoaded', function(event) {
  var btnGuardar = document.querySelector('#botonesAgenda [name=botonesGuardar]');
  var btnModificar = document.querySelector('#botonesAgenda [name=botonesModificar]');
  var btnEliminar = document.querySelector('#botonesAgenda [name=botonesEliminar]');
  var btnCancelar= document.querySelector('#botonesAgenda [name=botonesCancelar]');
  var tablaContact= document.querySelector('#tablaContactos');
  var PosicionArray = -1;

  // Llama a la function de Guardar
  btnGuardar.addEventListener('click', function(eventoBoton) {
    var Guardar = new registroGuardar();
    Guardar.GuardarContacto();
    eventoBoton.preventDefault();
  });

  // Llama a la function de modificar y le envia la posicion seleccionada
  btnModificar.addEventListener('click', function(eventoBoton) {
    var Modificar = new registroModificar(PosicionArray);
    Modificar.ModificarContacto();
    eventoBoton.preventDefault();
  });

  // Llama a la function de Listar para mostrar los datos del localStorage en la tabla del DOM
  btnCancelar.addEventListener('click', function(eventoBoton) {
    var Cancelar = new registroListar();
    Cancelar.CancelarContacto();
    eventoBoton.preventDefault();
  });

  // Llama a la function de eliminar y le envia la posicion seleccionada
  btnEliminar.addEventListener('click', function(eventoBoton) {
    var Eliminar = new registroEliminar(PosicionArray);
    Eliminar.EliminarContacto();
    eventoBoton.preventDefault();
  });

  // Obtengo la posicion que deseo modificar o eliminar de la tabla
  tablaContact.addEventListener('click', function(eventoBoton){
    $("#tablaContactos tr").click(function() {
      LlaveSelecciona = $(this).children("td").html();
      $("#llavein").val(parseInt(LlaveSelecciona));
    });

    var Datos = JSON.parse(localStorage.getItem("Contactos"));
    ArrayAgenda = Datos.ContactosDeAgenda;

    // Recorro los el array para saber cual objeto selecciono
    // sabiendo el objeto seleccionado cargo los textbox con la respectiva data
    // obtendo la posicion seleccinada
    ArrayAgenda.forEach(function(entry,item,array) {
      if (entry.Llave == LlaveSelecciona){
        $("#nombrein").val(entry.Nombre);
        $("#telin").val(entry.Telefono);
        $("#direccionin").val(entry.LugarTrabajo);
        $("#emailin").val(entry.Correo);
        PosicionArray = item;
      }
    });
  });

});
