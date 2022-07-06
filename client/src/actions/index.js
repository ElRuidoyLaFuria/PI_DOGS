import axios from 'axios';

export const GET_RAZAS = "GET_RAZAS"
export const GET_DOGS_BY_NAME = "GET_DOG_BY_NAME"
export const GET_DOGS_BY_ID = "GET_DOGS_BY_ID"
export const CURRENT_DOGS = "CURRENT_DOGS"
export const SORT = "SORT"
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const ACTUALIZA_ORDEN = 'ACTUALIZA_ORDEN';
export const EMPTY_FILTERED_DOGS = 'EMPTY_FILTERED_DOGS';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
export const EMPTY_DETAIL_DOG = 'EMPTY_DETAIL_DOG';


// export const ADD_DOG = "ADD_DOG"
// export const GET_DOGS = "GET_DOGS"
// export const GET_DOG_DETAIL = "GET_DOG_DETAIL"
// export const REMOVE_DOG = "REMOVE_DOG"

export function getRazas(){      
  return async function(dispatch){         
   axios.get('http://localhost:3001/dogs')   
   .then(respuesta=>{ 
     dispatch({
       type: GET_RAZAS,       
       payload: respuesta.data
     })
    }) 
}}

export function getDogsByName(name){
  
  return async function(dispatch){   
    
     axios.get('http://localhost:3001/dogs?name=' + name) 
       .then(        
        respuesta=>{  
           
           if (respuesta.data.length===0){
            window.alert("Dog not found.")            
            //return
           }

           dispatch({
            type: GET_DOGS_BY_NAME,       
            payload: respuesta.data
            })
           
         
        }
    
    
    )
    

      
     
  }
}

export function getDogsById(id){
  //window.alert(1)
  return async function(dispatch){    
    axios.get('http://localhost:3001/dogs/' + id)
    .then((respuesta)=>{
        dispatch({
          type: GET_DOGS_BY_ID,       
          payload: respuesta.data         
        })    
       },
       (err)=>{
        dispatch({
          type: GET_DOGS_BY_ID,       
          id: parseInt(id)         
        })    
       })  
 
      } 

    }  

      
  

// export function paginacion(currentDogs){  
// return {
//   type: CURRENT_DOGS,       
//   payload: currentDogs
// }
// }

export function sort(order){
  return {     
      type: SORT,       
      payload: order
  }
}

export function sortByName(payload) {  
  return {  
      type: SORT_BY_NAME,
      payload,
  }
}

export function sortByWeight(payload) {  
  return {  
      type: SORT_BY_WEIGHT,
      payload,
  }
}

export function actualizaOrden(order){
  return {     
      type: ACTUALIZA_ORDEN,       
      payload: order
  }
}

export function AddDog(payload) {
    return {
        type: "ADD_DOG",
        payload: payload };
}

//Borro el estado global filteredDogs para ejecutar una lógica
//en <Dogs />
  export function emptyFilteredDogs(payload) {
    return {
      type: "EMPTY_FILTERED_DOGS",
      payload: payload };
  }
  
  export function emptyDetailDog(payload) {
    return {
      type: EMPTY_DETAIL_DOG,
      payload: payload };
  }