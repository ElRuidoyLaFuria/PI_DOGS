module.exports = function filterTemperaments(temperaments){     

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
    // }



// exports.a = function() {
//     console.log("a");
// }
 

// module.exports.bla = function Something() {
//     console.log('bla bla');
// }

// module.exports.stringProperty = "I love NodeJS";
// module.exports.foo = function foo() {
//     console.log(1)
 }

