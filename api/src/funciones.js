function filterTemperaments(temperaments){     
 
  const filteredTemperaments=[]
  const arr = temperaments.filter(element=> element!== undefined && element !== null)
  
   arr.forEach((element)=>{ 
          
      element.split(',').map((element)=>{        
        element = element.trim()        
        if (!filteredTemperaments.includes(element))
          filteredTemperaments.push(element)
      })    
  })  
   
  filteredTemperaments.sort((a,b)=>{
    if (a<b) return -1
    if (a>b) return 1
    else return 0
  })
  
  return filteredTemperaments
}


module.exports = function loadTemperaments(){
require('dotenv').config();
const {API_KEY} = process.env;     
const axios = require('axios');
const {Temperamento} = require('./db');


   temperamentsPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds'+'?api_key='+ API_KEY);  
   temperamentsPromiseApi.then((respuesta)=>{
   let temperaments = respuesta.data.map(dog => dog.temperament)
   
   if (temperaments){
  
    let temp = filterTemperaments(temperaments)
    var arrFinal=[]
    const obj={}
    temp.forEach((element)=>{    
      const obj={}
      obj.name = element
      arrFinal.push(obj)
   })
   }
     const temperament = Temperamento.bulkCreate(arrFinal);
     temperament.catch((err)=> console.log(err))
    
  
    
 })

}














 
    // const filteredTemperaments=[]
    // const arr = temperaments.filter(element=> element!== undefined && element !== null)
    
    //  arr.forEach((element)=>{ 
    //      console.log(element)   
    //     element.split(',').map((element)=>{        
    //       element = element.trim()        
    //       if (!filteredTemperaments.includes(element))
    //         filteredTemperaments.push(element)
    //     })    
    // })  
     
    // filteredTemperaments.sort((a,b)=>{
    //   if (a<b) return -1
    //   if (a>b) return 1
    //   else return 0
    // })
    
    // return filteredTemperaments
    // // }



// exports.a = function() {
//     console.log("a");
// }
 

// module.exports.bla = function Something() {
//     console.log('bla bla');
// }

// module.exports.stringProperty = "I love NodeJS";
// module.exports.foo = function foo() {
//     console.log(1)
 

