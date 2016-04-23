var ArrayAgenda =  Array();

var AgendaMantenimiento = function() {
  var tablaAgenda = document.querySelector('#tablaContactos');
  return {
    listar: function(){
      var body = document.getElementsByTagName("body")[0];
      var Datos = JSON.parse(localStorage.getItem("Contactos"));
      var ArrayDatos = Datos.ContactosDeAgenda;
      var tabla = document.querySelector('#tablaContactos');
      var tblBody = document.createElement("tbody");

      ArrayDatos.forEach(function(entry,item,array) {
        var hilera = document.createElement("tr");

        //array.forEach(function(valorObj,itenObj,Obj){
        for (var prop in entry) {
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(entry[prop]);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
        };
        tblBody.appendChild(hilera);
      });
      tabla.appendChild(tblBody);
      body.appendChild(tabla);
      tabla.setAttribute("border", "2");
    },
    nuevo: function(objcontacto){
      var Datos = JSON.parse(localStorage.getItem("Contactos"));
      if (Datos == null){
        ArrayAgenda.push(objcontacto);
        var contactoAgenda = JSON.stringify({"ContactosDeAgenda": ArrayAgenda});
        localStorage.setItem("Contactos", contactoAgenda);
      }
      else{
        Datos.ContactosDeAgenda.push(objcontacto);//ArrayAgenda.push(objcontacto);
        var contactoAgenda = JSON.stringify({"ContactosDeAgenda": Datos.ContactosDeAgenda});//ArrayAgenda});
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

var SeleccionaMenu = function() {
  var MsjRespuesta = "";
  var botones = Array.from(document.querySelectorAll('[class^=botones-]'));
  var textonombrecompleto = document.querySelector('#textboxesAgenda [name=InputNombre]');
  var textotelefono = document.querySelector('#textboxesAgenda [name=InputTelefono]');
  var textodireccion = document.querySelector('#textboxesAgenda [name=exampleInputPassword1]');
  var textoemail= document.querySelector('#textboxesAgenda [name=InputEmail]');
  var textboxesCorrectos = 0;

  return {
    opcion: function(ObjDatoContact,PosicionArrayAgenda)
    {
      botones.forEach(function(boton) {
        boton.addEventListener('click', function(eventoBoton) {
          switch(this.className) {
            case 'botones-guardar':
              //textboxes.forEach(function(textbox) {
                //if (ObjDatoContact.Nombre != "" && ObjDatoContact.LugarTrabajo != "" && ObjDatoContact.Telefono != "" && ObjDatoContact.Correo != ""){
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
              //});
              if (textboxesCorrectos == 4){
                var ObjDatoContact = new Object();
                ObjDatoContact.Nombre = textonombrecompleto.value;
                ObjDatoContact.Telefono = textotelefono.value;
                ObjDatoContact.LugarTrabajo = textodireccion.value;
                ObjDatoContact.Correo = textoemail.value;
                MsjRespuesta = agenda.nuevo(ObjDatoContact);
                return MsjRespuesta;
              }
              else {
                console.log("Debe de ingresar valores validos.");
              }
              break;
            case 'botones-modificar':
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
                return MsjRespuesta;
              }
              else {
                console.log("Debe de ingresar posicion valida para modificar.");
              }
              break;
            case 'botones-eliminar':
              if (PosicionArrayAgenda >= 0 && PosicionArrayAgenda <= ArrayAgenda.length){
                MsjRespuesta = agenda.eliminar(PosicionArrayAgenda);
                return MsjRespuesta;
              }
              else {
                console.log("Debe de ingresar posicion valida para eliminar.");
              }
              break;
            case 'botones-cancelar':
              MsjRespuesta = "";
              return agenda.listar();
              break;
            default:
              console.log("La opcion seleccionada no correspondo a una opcion del menu.");
            };
        });
      });
    }
  };
}

//var menu = new SeleccionaMenu();
var agenda = new AgendaMantenimiento();

document.addEventListener('DOMContentLoaded', function(event) {
  var menu = new SeleccionaMenu();
  menu.opcion();
});
