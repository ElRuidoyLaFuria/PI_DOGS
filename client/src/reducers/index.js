
import {GET_RAZAS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID , CURRENT_DOGS, SORT, SORT_BY_NAME, SORT_BY_WEIGHT, ACTUALIZA_ORDEN, EMPTY_FILTERED_DOGS, EMPTY_DETAIL_DOG } from "../actions/index.js"
import  {ASCENDENTE, DESCENDENTE} from "../constantes/sort"

const initialState = { 
  //dogDetail: {},    
  dogs: [], 
  filteredDogs: [],  
  detailDog: {},
  orden: [],
  currentPage: 1 //ver si se puede poner en
  //otro lado

  //{"id":1,"name":"Affenpinscher","img":"BJa4kxc4X"},{"id":2,"name":"Afghan Hound","img":"hMyT4CDXR"}
}

export default function reducer(state = initialState, action){

    switch (action.type) {

        // case ADD_DOG:
        //     return{
        //         state,
        //         movieFavorites: [state.movieFavorites, action.payload ]
        //     } 
         
        case GET_RAZAS:                 
          return {            
          ...state,          
          dogs: action.payload,
          //filteredDogs: action.payload                   
          }

        case GET_DOGS_BY_NAME:
          return {
            ...state,
            //dogs: action.payload,
            filteredDogs: action.payload, 
            dogs: [...state.dogs, ...action.payload]           
          }

        case GET_DOGS_BY_ID:   
       // window.alert('-->')
        //if (!action.payload)
        //window.alert(action.id)
        if (action.id){          
          action.payload = state.dogs.find(element => element.id === action.id)           
        }      

          return {
              ...state,            
              detailDog: action.payload
           }
 
          //  case CURRENT_DOGS:
          //   // window.alert(action.payload)
          //   return {
          //     ...state,   
          //     currentDogs: action.payload
          //   }
/*
        case SORT:         
        window.alert(JSON.stringify(state.currentDogs))
        let orderdedDogs = [...state.dogs]
        
        orderdedDogs.sort((a,b)=>{
          if (a.name < b.name) {return action.payload === ASCENDENTE ? -1 : 1}
          if (a.name > b.name) {return action.payload === ASCENDENTE ? 1: -1}
          return 0; 
        })
         
        return{
          ...state,
         dogs: orderdedDogs,
         filteredDogs: orderdedDogs,
         currentDogs: [{"id":1,"name":"Affenpinscher","img":"BJa4kxc4X"},{"id":2,"name":"Afghan Hound","img":"hMyT4CDXR"}]
        }    
 */

        case SORT:         
        // window.alert(JSON.stringify(state.currentDogs))
        //let orderdedDogs = [...state.currentDogs]
        
        let orderdedDogs = [...state.currentDogs]
        
        orderdedDogs.sort((a,b)=>{
          if (a.name < b.name) {return action.payload === ASCENDENTE ? -1 : 1}
          if (a.name > b.name) {return action.payload === ASCENDENTE ? 1: -1}
          return 0; 
        })
         
        return{
          ...state,
         //dogs: orderdedDogs,
         //filteredDogs: orderdedDogs,
         currentDogs:[{"id":1,"name":"Affenpinscher","img":"BJa4kxc4X"},{"id":2,"name":"Afghan Hound","img":"hMyT4CDXR"}]
        }    
   
        case SORT_BY_NAME:
        
            const sortedName = action.payload === 'asc' ?
          
            state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                dogs: sortedName,
            }

            case SORT_BY_WEIGHT:

              const sortedWeight = action.payload === 'asc' ?
          
              state.dogs.sort(function (a, b) {
                      if (a.minWeight > b.minWeight) {
                          return 1;
                      }
                      if (b.minWeight > a.minWeight) {
                          return -1;
                      }
                      return 0
                  }) :
                  state.dogs.sort(function (a, b) {
                      if (a.minWeight > b.minWeight) {
                          return -1;
                      }
                      if (b.minWeight > a.minWeight) {
                          return 1;
                      }
                      return 0;
                  })


              return {
                ...state,
                dogs: sortedWeight
              }
            
            case ACTUALIZA_ORDEN:
              return {
                ...state,
                orden: action.payload,  
              }
            case EMPTY_FILTERED_DOGS:
              return {
                ...state,
                filteredDogs: []
              }

              case EMPTY_DETAIL_DOG:
                
                return {
                  ...state,
                  detailDog: {}
                }

 default: 
           return { ...state };

}
}