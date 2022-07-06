/// =========================================================================== ///
/// =============================== HENRY-DOGS ================================ ///
/// =========================================================================== ///
'use strict'

let dogs = ['ovejero']
let accessories = []
const { response } = require('express');
//import fetch from 'node-fetch';
const fetch = require('node-fetch');
const url = "https://api.thedogapi.com/v1/breeds"; 
  

//module.export = {getBreeds,dogs}



module.exports = {


  getBreeds: async function ()
  {       
   const response = await fetch("https://api.thedogapi.com/v1/breeds");
   const data = await response.json();    
   return data;
  },
 
  getBreedsWithPromise: async function()
  {
    
   return fetch(url)    
   .then((data)=>data.json())
      
    
  },
  
  
  reset: function () {
    // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.

    cats = []
    accessories = []
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `controller.js`) =====

  // getBreeds: function (){
    
  // fetch('https://api.thedogapi.com/v1/breeds')
  //    .then(response => response.json()); 
  // },

}
//   addCat: function (name) {
//     // Agrega un nuevo felin@, verificando que no exista anteriormente en base a su nombre.
//     // En caso de existir, no se agrega y debe arrojar el Error ('El gato o gata ya existe') >> ver JS throw Error
//     // Debe tener una propiedad <age> que inicialmente debe ser '1 year'.
//     // Debe tener una propiedad <color> que inicialmente es un array vacío.
//     // Debe tener una propiedad <accesories> que inicialmente es un array vacío.
//     // El gato o gata debe guardarse como un objeto con el siguiente formato:
//     // { name: name,  age: '1 year' , color: []}
//     // En caso exitoso debe retornar el string '<nombre del gato o gata> fue creado correctamente'.
     
//     if (cats.find(cat=> cat.name===name)){
//       throw new Error("El gato o gata ya existe");
//     }
     
//   else {
//     const cat = {
//       name: name,
//       age: '1 year',
//       color: [],
//       accessories: [],      
//   }
//   cats.push(cat);
//   return name + ' fue creado correctamente';   

//   } 

 
    
//   },

//   listCats: function (age) {
//     // En caso de recibir el parámetro <age>, devuelve sólo los gatos correspondientes a dicho age.
//     // Si no recibe parámetro, devuelve un arreglo con todos los gatos.
    
//     if (age){
//       return cats.filter((cat) => cat.age === age);
//     } 
//     else return cats;
//   },

//   addAccessory: function ({ id, color, type, description }) {
//     // Agrega un nuevo accesorio.
//     // Si el accesorio ya existe, no es agregado y arroja un Error ('El accesorio con el id <id> ya existe')
//     // Debe devolver el mensaje 'El accesorio <type> fue agregado correctamente'
//     // Inicialmente debe guardar la propiedad <popularity> del accesorio como 'low' por defecto
//     // Si la descripción supera los 140 caracteres, debe arrojar un error
      
//     if(description.length>140){
//       throw new Error("La descripción supera los 140 caracteres");
//     }


    
//     const accesorie={
//       id,
//       color,
//       type,
//       description,
//       popularity: 'low',
//     }

//     if (accessories.find(accessorie => accessorie.id===id)){          
//       throw new Error("El accesorio con el id "+ id + " ya existe");
//     }
//    else {   
//    accessories.push(accesorie)
//   }
//   },

//   getAccessories: function (type, color) {
//     // Devuelve un array con todos los accesorios.
//     // Si recibe parámetro "type", debe retornar  los accesorios que coincidan con el tipo.
//     // Si recibe parámetro "color" debe retornar los accesorios que coincidan con el color
//     // Si recibe ambos parámetros, se devuelven los accesorios que coincidan con el color o con el tipo
//   if (type && !color){
//     return accessories.filter(accesorie=> accesorie.type === type)
//   }

//   if (!type && color){
//     return accessories.filter(accesorie=> accesorie.color === color)
//   }

//   if (type && color){
//     return accessories.filter(accesorie=> accesorie.color === color || accesorie.type === type)   
//   }
 
//   return accessories;

//   },

//   deleteAccessory: function (id) {
//     // Elimina un accesorio del array
//     // Si el id no existe dentro del array de accesorios, arrojar un Error ('El accesorio con el id <id> no fue encontrado')
//     // Una vez eliminado el accesorio del array, devolver un mensaje que diga 'El accesorio con el id <id> fue eliminado correctamente'
    
//     const accessorieFound = accessories.find(accessorie => accessorie.id===id);
//     if (!accessorieFound){          
//       throw new Error("El accesorio con el id "+ id + " no fue encontrado");
//     }
//     else{      
//       const index = accessories.indexOf(accessorieFound);
//       accessories.splice(index,1);
//       return "El accesorio con el id " +id+ " fue eliminado correctamente";
//     }
//   },

//   modifyAccessory: function (obj) {
//     // Modifica un accesorio del array
//     // Si el id no existe dentro del array de accesorios arrojar un Error ('accesorio no encontrado')
//     // Si el objeto viene vacio, arrojar un Error ('No se detectaron cambios a aplicar')
//     // Una vez modificado el accesorio del array, devolver el accesorio modificado
   
//     //const {id, color} = obj

//     // if(Object.keys(obj).length === 0 ){
//     //   throw new Error("No se detectaron cambios a aplicar");
//     // }

//     // //let accessorieFound = accessories.filter((accessorie) => accessorie.id === obj.id);
//     // //return accessorieFound;
//     // let encontrado = accessories.filter((accessorie) => accessorie.id === obj.id)
//     // if (!encontrado){          
//     //   throw new Error("accesorio no encontrado");
//     // }    
//     // if (encontrado.length===0){          
//     //   throw new Error("accesorio no encontrado");
//     // }   

//     // let newObject=[...encontrado];
//     // newObject[0].color=obj.color;
//     //   return newObject[0];
    

// //    let newAcc = {
// //       type: obj.type || accessories[indAcc].type,
// //       color: obj.color || accessories[indAcc].color,
// //       description: obj.description || accessories[indAcc].description,
// //     };
// //     accessories[indAcc] = newAcc;
// //     return accessories[indAcc];
   
// //     if (Object.entries(obj).length === 0)
// //     throw new Error("No se detectaron cambios a aplicar");
// //   if (accessories.filter((acc) => acc.id === obj.id).length < 1)
// //     throw new Error("accesorio no encontrado");
// //  let newAcc = {
// //     type: obj.type || accessories[indAcc].type,
// //     color: obj.color || accessories[indAcc].color,
// //     description: obj.description || accessories[indAcc].description,
// //   };
// //   accessories[indAcc] = newAcc;
// //   return accessories[indAcc]; 



// if (Object.entries(obj).length === 0)
// throw new Error("No se detectaron cambios a aplicar");
// if (accessories.filter((acc) => acc.id === obj.id).length < 1)
// throw new Error("accesorio no encontrado");

// let indAcc = accessories.findIndex((acc) => acc.id === obj.id);

// let newAcc = {
// type: obj.type || accessories[indAcc].type,
// color: obj.color || accessories[indAcc].color,
// description: obj.description || accessories[indAcc].description,
// };

// accessories[indAcc] = newAcc;
// return accessories[indAcc];
//   },

//   increaseAccesoryPopularity: function (accessoryId) {
//     // Este método es complementario a 'addCatAccessory'
//     // Actualiza la propiedad <popularity> del accesorio,
//     // Si se actualizó la popularidad del accesorio, devolver true
//     // Si no se actualizó la popularidad del accesorio, debe devolver false
//     var findAccessory = accessories.find((a) => a.id === accessoryId);
//     if (findAccessory) {
//       var count = 1;
//       cats.map((cat) => {
//         var find = cat.accessories.find((a) => a.id === findAccessory.id);
//         if (find) {
//           count++;
//         }
//       });
//       if (count >= 3) {
//         findAccessory.popularity = "high";
//       }
//       if (count == 2) {
//         findAccessory.popularity = "average";
//       }
//     } else {
//       throw new Error(`Accesorio no encontrado`);
//     }
   







//   },

//   addCatAccessory: function (catName, accessoryId) {
//     // Agrega un accesorio a un felin@
//     // Si el felin@ ya tiene puesto el accesorio, arrojar un Error('El gato <nombre_gato> ya tiene el accesorio puesto') y no lo agrega
//     // Si el gato no existe arrojar un Error ('El gato <nombre_gato> no existe')
//     // Si el id de accesorio no existe arrojar un Error ('accesorio no encontrado' y no actualiza la popularidad)
//     // const cat = cats.find(cat=> cat.name===catName);
//     // if (!cat){
//     //   throw new Error("El gato "+ catName+ " no existe");
//     // }

     
//     //   const accessorie = accessories.find(accessorie=>accessorie.id === accessoryId)
      
//     //   cat.accessories.forEach(object =>{
//     //     if(object.id === accessorie.id){
//     //       throw new Error ("El gato "+ cat.name+ " ya tiene el accesorio puesto")
//     //     }
//     // });
      
      
//     //   if (accessorie){
//     //     cat.accessories.push(accessorie)     
//     //   return "El accesorio " +accessorie.type+ " fue agregado a " +cat.name+ " con exito";

//     //   }     

//     if (cats.filter((cat) => cat.name === catName).length < 1)
//     throw new Error(`El gato ${catName} no existe`);

//   let catFiltered = cats.find((cat) => cat.name === catName);
//   if (
//     catFiltered.accessories.filter((acc) => acc.id === accessoryId).length > 0
//   )
//     throw new Error(`El gato ${catName} ya tiene el accesorio puesto`);

//   let accessorieFiltered = accessories.find((acc) => acc.id === accessoryId);
  
//   this.increaseAccesoryPopularity(accessoryId);
  
//   catFiltered.accessories.push(accessorieFiltered);
//     return `El accesorio ${accessorieFiltered.type} fue agregado a ${catName} con exito`;
       

//   },

//   getAccessoryPopularity: function (accessoryId) {
//     //Devuelve la popularidad de un accesorio
//     // Para eso deberás comprobar cuantos gatos visten el accesorio recibido por parámetros (es un id)
//     // Si la cantidad de gatos que visten el accesorio son 2, entonces la popularidad del accesorio debe valer 'average'
//     // Si la cantidad de gatos que visten el accesorio son 3, entonces la popularidad del accesorio debe valer 'high'
       
//     var findAccessory = accessories.find((a) => a.id === accessoryId);
//     if (findAccessory) {
//       return findAccessory.popularity;
//     } else {
//       throw new Error("No se encontró el gato");
//     }
//   },  
 
