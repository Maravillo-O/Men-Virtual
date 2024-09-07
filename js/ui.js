let bd;
const abrir =indexedDB.open("recetas",5);
var base64;
abrir.onupgradeneeded = function(event){
  bd = event.target.result;
    if(!bd.objectStoreNames.contains("platillos")){
    const almacenPlatillos = bd.createObjectStore("platillos",{keyPath: "id"});
    almacenPlatillos.createIndex("nameIndex","name", {unique: false});
  }
  if(!bd.objectStoreNames.contains("pedidos")){
    const almacenPedidos = bd.createObjectStore("pedidos",{keyPath: "id"});
    almacenPedidos.createIndex("clienteIndex","name", {unique: false});
    almacenPedidos.createIndex("platilloIndex","name", {unique: false});
  }
  if(!bd.objectStoreNames.contains("imagen")){
    const almacenImagen = bd.createObjectStore("imagen",{keyPath: "id"});
    almacenImagen.createIndex("fotoIndex", "idPlatillo",{unique:false})
  }
};





abrir.onsuccess =function(event){
  bd = event.target.result;
  leerPedidos();
  leerPlatillos();
 
} 


abrir.onerror=function(event){
  console.dir(event);
}


document.addEventListener('DOMContentLoaded', function() { //document: toda la aplicacion, addEventListener: monitorea eventos que paan dentro de la aplicacion*/
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});


document.getElementById("agregarPlatillo").addEventListener("click",function(e){
  e.preventDefault();
 //const transaccion = bd.transaction("platillos", "readwrite");
//const operacion =transaccion.objectStore("platillos");
let idP=Date.now();
//operacion.add({id: idP,platillo: document.getElementById("tittle").value,ingredientes:document.getElementById("ingredients").value});


//const avisoimag = bd.transaction("imagen", "readwrite");
//const leerimag =avisoimag.objectStore("imagen","platillo");
//leerimag.add({id: Date.now(),imagen:base64, idPlatillo: idP});

var tarjeta = `
<div id="elem1" class="card-panel recipe white row"> 
  <img src="data:image/jpg;base64,${base64}" alt="recipe thumb">
  <div class="recipe-details">
    <div class="recipe-title">${document.getElementById("tittle").value}</div>
    <div class="recipe-ingredients">${document.getElementById("ingredients").value}</div> 
  </div>
  <div class="recipe-delete">
    <i id="${idP}" data-accion='borrar' class="material-icons">delete_outline</i>
  </div>
</div>
</div>`
//document.getElementById("recetas").innerHTML += tarjeta;
//Instrucciones para guardar en la base de datos



/*operacion.onsuccess = function(e){
  alert("platillo guardado");
}*/

agregarPlatillo(idP, document.getElementById("tittle").value, document.getElementById("ingredients").value,base64);

});


document.getElementById("agregarPedido").addEventListener("click",function(e){
  e.preventDefault();
 

var texto=document.getElementById("platillo");
var texto1=texto.options[texto.selectedIndex].text;
let idP2=Date.now();
var tarjeta = `
<div id="elem1" class="card-panel recipe white row"> 
  <img src="" alt="recipe thumb">
  <div class="recipe-details">
    <div class="recipe-PEDIDO">${texto1}</div>
    <div class="recipe-CLIENTE">${document.getElementById("CLIENTE").value}</div> 
    <div class="recipe-CANTIDAD">${document.getElementById("CANTIDAD").value}</div> 
  </div>
  <div class="recipe-delete">
    <i id="${idP2}}" data-accion1='borrar' class="material-icons">delete_outline</i>
  </div>
</div>
</div>`
//document.getElementById("PED").innerHTML += tarjeta;
//Instrucciones para guardar en la base de datos
/*const transaccion = bd.transaction("pedidos", "readwrite");
const operacion =transaccion.objectStore("pedidos");
operacion.add({id:idP2,platillo: texto1,CLIENTE:document.getElementById("CLIENTE").value,CANTIDAD: document.getElementById("CANTIDAD").value});
operacion.onsuccess = function(e){
  alert("platillo guardado");
}*/
agregarPedido(idP2, texto1, document.getElementById("CLIENTE").value,document.getElementById("CANTIDAD").value);

});


//instruccion para guardar en la base de datos
  /*let transaccion = recetas.transaction("recetas", "readwrite");
  let operacion = transaccion.objectStore("recetas");

  let datos = {id: Date.now(), platillo:document.getElementById("tittle").value, ingredientes:document.getElementById("ingredients").value};
  let agregar = operacion.add(datos);
  agregar.onsucces = function(e){

    alert("Se agrego correctamente")
  }
});*/ //addEventListener los eventos que le ocurren a un objeto y en (e)se guarda el objeto que genero el evento en este caaso el click
//${} introduce valores de variables dentro de un string 


document.addEventListener("click",(e) => {//document.addEventListener todos los click que se den, =>: un evento en especifico
  if(e.target.getAttribute("data-accion")=="borrar"){
    e.target.parentNode.parentNode.remove();
    //const borrar = bd.transaction("platillos", "readwrite").objectStore("platillos").delete(Number(e.target.getAttribute("id")));
    //const borrar1 = bd.transaction("imagen", "readwrite").objectStore("imagen").delete(Number(e.target.getAttribute("id")));
    
    nubeBD.collection("platillos").doc(e.target.getAttribute("id")).delete();
    nubeBD.collection("imagen").doc(e.target.getAttribute("idPlatillo")).delete();
    document.getElementById("recetas").innerHTML = "";
  }
  if(e.target.getAttribute("data-accion1")=="borrar"){
    e.target.parentNode.parentNode.remove();
    //const borrar = bd.transaction("pedidos", "readwrite").objectStore("pedidos").delete(Number(e.target.getAttribute("id")));
    nubeBD.collection("pedidos").doc(e.target.getAttribute("id")).delete();
    borrar.onsuccess = function(){

      alert("Pedido Eliminado");
    }
    borrar.onerror = function(){

      alert("Pedido no Eliminado");
    }

  }
  
}); 



function leerPedidos(){
  document.getElementById("PED").innerHTML="";
  const leer = bd.transaction("pedidos").objectStore("pedidos").openCursor();

  leer.onsuccess = function(event){
    const cursor = leer.result;

    if(cursor){
      var tarjeta = `
      <div  class="card-panel recipe white row"> 
        <img src="/img/dish.png)" alt="recipe thumb">
        <div class="recipe-details">
          <div class="recipe-title">${cursor.value.platillo}</div>
          <div class="recipe-ingredients">${cursor.value.CLIENTE}</div> 
            <div class="recipe-ingredients">${cursor.value.CANTIDAD}</div> 
        </div>
        <div class="recipe-delete">
          <i id="${cursor.value.id}" data-accion1='borrar' class="material-icons">delete_outline</i>
       
      </div>
      </div>`;
      document.getElementById("PED").innerHTML+=tarjeta;
      cursor.continue();
      
    }
   
  }
}


    //INDEX 
  function buscaImagen(idPlatillo){
    let transaccion = bd.transaction("imagen","readonly");
    let objeto=transaccion.objectStore("imagen");
    //console.log(objeto);
    let indice = objeto.index("fotoIndex");
    let info = indice.get(idPlatillo);

    info.onsuccess = function(e){
      foto99 = "data:imagen/png;base64,"+ info.result.imagen;
      document.getElementById("foto" + idPlatillo).src=foto99;
      
      
    }
    info.onerror = function(e){
      foto99 = '/img/dish.png';
      document.getElementById("foto"+idPlatillo).src=foto99;
    }

   
  }

 function leerPlatillos(){
    document.getElementById("recetas").innerHTML="";
    const leer = bd.transaction("platillos").objectStore("platillos").openCursor();
  
    leer.onsuccess = function(event){
      const cursor = leer.result;
  
      if(cursor){
       
        var tarjeta = `
        <div  class="card-panel recipe white row"> 
          <img id="foto${cursor.value.id}" src="" alt="recipe thumb">
          <div class="recipe-details">
            <div class="recipe-title">${cursor.value.platillo}</div>
            <div class="recipe-ingredients">${cursor.value.ingredientes}</div> 
          </div>
          <div class="recipe-delete">
            <i id="${cursor.value.id}" data-accion='borrar' class="material-icons">delete_outline</i>
         
        </div>
        </div>`;
        document.getElementById("recetas").innerHTML+=tarjeta;
        var opt =document.createElement("option");
        opt.value=cursor.value.id;
        opt.innerHTML=cursor.value.platillo;
        document.getElementById("platillo").appendChild(opt); 
        buscaImagen(cursor.value.id);
        cursor.continue();
        
      }
      else{
        console.log("se acabo");
      }
    }
  /*leer.onerror=function(e){
    alert("error");
  }*/
 
  
}

function Depuracion(){
  

  if(confirm("¿Esta seguro?")==true){
    //const transaccion = bd.transaction("platillos", "readwrite");
    //transaccion.objectStore("platillos").clear();

    //const transaccion1 = bd.transaction("pedidos", "readwrite");
    //transaccion1.objectStore("pedidos").clear();

    //const transaccion2 = bd.transaction("imagen", "readwrite");
    //transaccion2.objectStore("imagen").clear();
    DepuracionNB();

  
  }else{

   
  }
  }
  document.getElementById("depurar").addEventListener("click",function(e){
    e.preventDefault();
Depuracion();
leerPedidos();

leerPlatillos();

DepuracionNB();

});

function clic_foto(){
  document.getElementById("camera").click();
}
document.getElementById("camera").addEventListener("change",function(e){
let ruta= URL.createObjectURL(e.target.files[0]);
document.getElementById("foto").src=ruta;

reader=new FileReader();
reader.onloadend=function(){
   base64=reader.result.replace(/^data:.+;base64,/,'');
  console.log("Ruta",base64);
}
reader.readAsDataURL(e.target.files[0]);
/*let link=document.createElement("a");
link.download="foto.jpg";
link.href=ruta;
link.click();*/
});



/*let bd=indexedDB.open("recetas", 1); //let: manera de declarar varible
bd.onupgradeneeded = function(e){ //onupgradeneeded: si la bd necesita ser creada o actualizada 
  let base = e.target.result;
  let recetas = base.createObjectStore("recetas", {keyPath: "id"});
  recetas.createIndex("indice", "platillo", {unique: false});*/


