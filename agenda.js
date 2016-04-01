var  NuevoContacto = 1;
var  ModificarContacto = 2;
var  EliminarContacto = 3;
var  ListarContacto = 4;

var objAgenda = new Object();
objAgenda.Nombre = "";
objAgenda.LugarTrabajo = "";
objAgenda.Telefono = "";
objAgenda.Correo = "";

var ArrayAgenda =  new Array();

var AgendaMantenimiento = function() {
  return {
    listar: function(){
      for (var x = 0; x < ArrayAgenda.length; x++) {
        console.log(ArrayAgenda[x]);
      }
    },
    nuevo: function(objcontacto){
      var objnewcontacto = new Object();

      objnewcontacto.Nombre = objcontacto.Nombre;
      objnewcontacto.LugarTrabajo = objcontacto.LugarTrabajo;
      objnewcontacto.Telefono = objcontacto.Telefono;
      objnewcontacto.Correo = objcontacto.Correo;

      ArrayAgenda.push(objnewcontacto);
      return "Contacto Creado Exitosamente";
    },
    modificar: function(objcontacto,Posicion){
      var objModcontacto = new Object();

      objModcontacto.Nombre = objcontacto.Nombre;
      objModcontacto.LugarTrabajo = objcontacto.LugarTrabajo;
      objModcontacto.Telefono = objcontacto.Telefono;
      objModcontacto.Correo = objcontacto.Correo;
      ArrayAgenda[Posicion] = objModcontacto;
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
  return {
    opcion: function(SeleccionOpcion,ObjDatoContact,PosicionArrayAgenda)
    {
      switch(SeleccionOpcion) {
        case NuevoContacto:
          if (ObjDatoContact.Nombre != "" && ObjDatoContact.LugarTrabajo != "" && ObjDatoContact.Telefono != "" && ObjDatoContact.Correo != ""){
            MsjRespuesta = agenda.nuevo(ObjDatoContact);
            return MsjRespuesta;
          }
          else {
            console.log("Debe de ingresar Nombre, Lugar Trabajo, Telefono y Correo validos.");
          }
          break;
        case ModificarContacto:
          if (PosicionArrayAgenda >= 0 && PosicionArrayAgenda <= ArrayAgenda.length){
            var objAgendaExistente = new Object();
            objAgendaExistente = ArrayAgenda[PosicionArrayAgenda];

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
        case EliminarContacto:
          if (PosicionArrayAgenda >= 0 && PosicionArrayAgenda <= ArrayAgenda.length){
            MsjRespuesta = agenda.eliminar(PosicionArrayAgenda);
            return MsjRespuesta;
          }
          else {
            console.log("Debe de ingresar posicion valida para eliminar.");
          }
          break;
        case ListarContacto:
          MsjRespuesta = "";
          return agenda.listar();
          break;
        default:
          console.log("La opcion seleccionada no correspondo a una opcion del menu.");
        };
    }
  };
}

var menu = new SeleccionaMenu();
var agenda = new AgendaMantenimiento();

//Arranque
//  objAgenda.Nombre = "";
//  objAgenda.LugarTrabajo = "";
//  objAgenda.Telefono = "";
//  objAgenda.Correo = "";
//  menu.opcion(OpcionMenu,objAgenda,NumeroAgendado);
