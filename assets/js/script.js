window.onload = function () {
  //Acciones tras cargar la página
  pantalla = document.getElementById("textoPantalla"); //Elemento pantalla de salida
};

x = "0"; //guardar número en pantalla
xi = 1; //iniciar número en pantalla: 1=si; 0=no;
coma = 0; //estado coma decimal 0 = no, 1=si;

function numero(xx) {
  //recoge el número pulsado en el argumento.
  if (x == "0" || xi == 1) {
    //inicializar un número
    pantalla.innerHTML = xx; //mostrar en pantalla
    x = xx; //guardar el número
    if (xx == ".") {
      //si escribimos una coma al principio del número
      pantalla.innerHTML = "0."; //escribimos 0.
      x = xx; //guardar número
      coma = 1; //cambiar el estado de la coma
    }
  } else {
    //contunuar un número
    if (xx == "." && coma == 0) {
      //si escribimos una coma decimal por primera vez
      pantalla.innerHTML += xx;
      x += xx;
      coma = 1; //cambiar el estado de la coma
    }
    //si intentamos escribir unas segunda coma decimal no realizara ninguna accion.
    else if (xx == "." && coma == 1) {
    }
    //resto de casos: escribir un número del 0 al 9
    else {
      pantalla.innerHTML += xx;
      x += xx;
    }
  }

  xi = 0; //el número está iniciado y podemos ampliarlo
}
