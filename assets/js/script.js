window.onload = function () {
  //Acciones tras cargar la página
  pantalla = document.getElementById("textoPantalla"); //Elemento pantalla de salida
  document.onkeydown = teclado; // funcion teclado disponible
};

let x = "0"; //guardar número en pantalla
let xi = 1; //iniciar número en pantalla: 1=si; 0=no;
let coma = 0; //estado coma decimal 0 = no, 1=si;
let ni = 0; //número oculto o en espera.
let op = "no"; //operación en curso; "no" = sin operación

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

function operar(S) {
  ni = x; //ponemos el 1° número en "número en espera" para poder escribir el segundp
  op = S; //guardamos tipo de operación.
  xi = 1; //inicializar pantalla.
}

function igualar() {
  if (op == "no") {
    //no hay ninguna operación pendiente.
    pantalla.innerHTML = x; //mostramos el mismo número
  } else {
    //con operación pendiente resolvemos
    sl = ni + op + x; //escribimos la operación en una cadena
    sol = eval(sl); //convertimos la cadena a código y resolvemos
    pantalla.innerHTML = sol; //mostramos la solución
    x = sol; //guardamos la solución
    op = "no"; //ya no hay operaciones pendientes
    xi = 1; //se puede reiniciar la pantalla.
  }
}

function raizc() {
  x = Math.sqrt(x); //resolver raíz cuadrada.
  pantalla.innerHTML = x; //mostrar en pantalla resultado
  op = "no"; //quitar operaciones pendientes
  xi = 1; //se puede reiniciar la pantalla
}

function porcent() {
  x = x / 100; //dividir por 100 el número
  pantalla.innerHTML = x; //mostrar en pantalla
  igualar(); //resolver y mostrar operaciones pendientes
  xi = 1; //reininiar la pantalla
}

function opuest() {
  nx = Number(x); //convertir en número
  nx = -nx; //cambiar de signo
  x = String(nx); //volver a convertir a cadena
  pantalla.innerHTML = x; //mostrar en pantalla
}

function inve() {
  nx = Number(x);
  nx = 1 / nx;
  x = String(nx);
  pantalla.innerHTML = x;
  xi = 1; //reiniciar pantalla al pulsar otro numero
}

function retro() {
  //borrar sólo el último número escrito
  cifras = x.length; //hallar número de caracteres en pantalla
  br = x.substring(cifras - 1, cifras); //info del ultimo caracter
  x = x.substring(0, cifras - 1); //quitar el ultimo caracter
  if (x == "") {
    x = "0";
  } //si ya no quedan caracteres, pondremos el 0
  if (br == ".") {
    coma = 0;
  } //si hemos quitado la coma, se permite escribirla nuevamente
  pantalla.innerHTML = x; //mostrar en pantalla
}

function borradorParcial() {
  pantalla.innerHTML = 0; //Borrado de pantalla;
  x = 0; //Borrado indicador número pantalla;
  coma = 0; //reiniciamos tambien la coma
}

function borradorTotal() {
  pantalla.innerHTML = 0; //poner pantalla a 0
  x = "0"; //reiniciar número en pantalla
  coma = 0; //reiniciar estado coma decimal
  ni = 0; //indicador de número oculto a 0
  op = "no"; //borrar operación en curso.
}

function teclado(elEvento) {
  evento = elEvento || window.event;
  k = evento.keyCode; //número de código de la tecla.
  //teclas númericas del teclado alfanúmerico
  if (k > 47 && k < 58) {
    p = k - 48; //buscar número a mostrar.
    p = String(p); //convertir a cadena para poder añadir en pantalla.
    numero(p); //enviar para mostrar en pantalla
  }
  //teclas del teclado númerico. seguimos el mismo procedimiento que en el anterior.
  if (k > 95 && k < 106) {
    p = k - 96;
    p = String(p);
    numero (p);
  }
  if (k == 110 || k == 190) {
    numero(".");
  } //teclas de coma decimal
  if (k == 106) {
    operar("*");
  } //tecla multiplicación
  if (k == 107) {
    operar("+");
  } //tecla suma
  if (k == 109) {
    operar("-");
  } //tecla resta
  if (k == 111) {
    operar("/");
  } //tecla división
  if (k == 32 || k == 13) {
    igualar();
  } //tecla igual: intro o barra espaciadora
  if (k == 46) {
    borradorTotal();
  } //tecla borrado total: "supr"
  if (k == 8) {
    retro();
  } //retro en escritura: tecla retroceso.
  if (k == 36) {
    borradorParcial();
  } //tecla borrado parcial: tecla de inicio.
}
