import { mainModule } from "process"

const f = (string)=>{
    const length = string.length
    let minWeight, maxWeight

if (length===5){
    //console.log((string.split("")))
    minWeight = string.substring(0,1)
    maxWeight = string.substring(4,5)
    console.log(minWeight) 
    console.log(maxWeight) 
} 
if (length===9){
    minWeight = string.substring(1,2)    
    maxWeight = string.substring(6,8)    
    console.log(minWeight)
    console.log(maxWeight)
}



}

f('3 - 6')
//f('"23 - 29"')
