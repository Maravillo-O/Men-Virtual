nubeBD.collection("platillos").onSnapshot((info)=>{

    info.docChanges().forEach(elemento => {
        //console.log(elemento.doc.data().id);
        var tarjeta = `
        <div  class="card-panel recipe white row"> 
          <img id="foto${(elemento.doc.data().id)}" src="" alt="recipe thumb">
          <div class="recipe-details">
            <div class="recipe-title">${(elemento.doc.data().platillo)}</div>
            <div class="recipe-ingredients">${(elemento.doc.data().ingredientes)}</div> 
          </div>
          <div class="recipe-delete">
            <i id="${(elemento.doc.data().id)}" data-accion='borrar' class="material-icons">delete_outline</i>
         
        </div>
        </div>`;
         document.getElementById("recetas").innerHTML+=tarjeta;
         var opt =document.createElement("option");
         opt.value=elemento.doc.data().id;
         opt.innerHTML=elemento.doc.data().platillo;
         document.getElementById("platillo").appendChild(opt); 
       
    });
});
function agregarPlatillo(idPlatillo,platillo,ingredientes,imagen){
  const nuevoPlatillo={
    id:idPlatillo,
    ingredientes:ingredientes,
    platillo:platillo,
     
   
  }
  nubeBD.collection("platillos").doc(`${idPlatillo}`).set(nuevoPlatillo)
  .catch(error => console.log(error));

  const nuevoimagen={
    id:Date.now(),
    idPlatillo: idPlatillo,
    imagen:imagen
  

  }
  nubeBD.collection("imagen").doc(`${Date.now()}`).set(nuevoimagen)
  .catch(error => console.log(error));
}






nubeBD.collection("pedidos").onSnapshot((info)=>{
    info.docChanges().forEach(elemento => {


        
 
        var tarjeta = `
      <div  class="card-panel recipe white row"> 
        <img src="/img/dish.png" alt="recipe thumb">
        <div class="recipe-details">
          <div class="recipe-title">${(elemento.doc.data().platillo)}</div>
          <div class="recipe-ingredients">${(elemento.doc.data().CLIENTE)}</div> 
            <div class="recipe-ingredients">${(elemento.doc.data().CANTIDAD)}</div> 
        </div>
        <div class="recipe-delete">
          <i id="${(elemento.doc.data().id)}" data-accion1='borrar' class="material-icons">delete_outline</i>
       
      </div>
      </div>`;
      document.getElementById("PED").innerHTML+=tarjeta;
    
   


    });
});
function agregarPedido(idP2,texto1,CLIENTE,CANTIDAD){
  const nuevoPedido={
    id:idP2,
    platillo:texto1,
    CLIENTE:CLIENTE,
    CANTIDAD:CANTIDAD
  }
  nubeBD.collection("pedidos").doc(`${idP2}`).set(nuevoPedido)
  .catch(error => console.log(error));
}






nubeBD.collection("imagen").onSnapshot((info)=>{
    info.docChanges().forEach(elemento => {
        
        let foto99 = "data:imagen/png;base64" + elemento.doc.data().imagen;
        document.getElementById("foto"+ elemento.doc.data().idPlatillo).src = foto99;
    });
});



function DepuracionNB(){
  
  document.getElementById("recetas").innerHTML = "";
    nubeBD.collection("platillos").get().then(colecciones =>{
   colecciones.docs.forEach(coleccion =>{
    coleccion.ref.delete();
   });
  });
  document.getElementById("PED").innerHTML = "";
  nubeBD.collection("pedidos").get().then(colecciones =>{
    colecciones.docs.forEach(coleccion =>{
     coleccion.ref.delete();
    });
   });
   nubeBD.collection("imagen").get().then(colecciones =>{
    colecciones.docs.forEach(coleccion =>{
     coleccion.ref.delete();
    });
   });
}

    nubeBD.collection("imagen").onSnapshot((info)=>{


    info.docChanges().forEach(elemento => {

    foto99 = "data:image/png;base64," + elemento.doc.data().imagen;
    document.getElementById("foto" + elemento.doc.data().idPlatillo).src = foto99;
  });
});
  
