import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import { useDispatch, useSelector} from "react-redux"
import {getDogsById} from '../../actions/index.js';
import Image from '../Image/Image'
import { useHistory } from 'react-router-dom';

import './DogDetail.css';

//import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';

// Fijense en los test que SI O SI tiene que ser un functional component, de otra forma NO VAN A PASAR LOS TEST
// Deben usar Hooks para que los test pasen (lease tambien lo de react-redux).
// No realicen un destructuring de ellos, sino que utilicenlos de la siguiente forma 'React.useState' y 'React.useEffect' ,
// Si no lo hacen asi los test no van a correr.

export default function DogDetail(){

let history = useHistory();

var {id} = useParams()
//  if  (parseInt(id) < 0 || parseInt(id) > 999) {       
  
//   history.push('/')
//   return ('error al recibir el id '+ id)
//  }

// const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

//   if (!regexExp.test(id)){       
//     history.push('/')
//    return ('error al recibir el id '+ id)
//   }


// if (parseInt(id) > 0 && parseInt(id) < 999 && regexExp.test(id) )
// {

  const dispatch = useDispatch();

  let detailDog = useSelector((state) => state.detailDog)
   
  const [detailDogLocalState, setdetailDogLocalState] = useState({})
  
  useEffect(()=>{    
    dispatch(getDogsById(id))
  }, [])

  if (!detailDog){ 
    history.push('/')
    return ('error al recibir el id '+ id)
    
   }
 

    return (  
      <div className='dogDetail' style={{
        
        margin:'100px', 
        height: '300px',
        textAlign: 'left',
        padding: '10px'    
        
      }}> 
      <div>
       
        <div style={{float:'left'}}>
            <Image image={detailDog.img} />      
        </div>
    
        <div style={{float:'left', padding:'10px'}}>
     <h1 class="titleDetail">Raza: {detailDog.name}</h1>            
     <p>Peso mínimo: {detailDog.minWeight}</p>
    <p>Peso máximo: {detailDog.maxWeight}</p>
    <p>Altura mínima: {detailDog.minHeight}</p>
    <p>Altura máxima: {detailDog.maxHeight}</p>
    <p>Utilidad: {detailDog.bred_for}</p>
    <p>Esperanza De Vida: {detailDog.lifeSpan}</p>
    <p className='temperamento'>Temperamento: {detailDog.temperament}</p> 
        </div>
      </div>
           
      </div>
) 

} 
//}  return history.push('/')



  

    /* <h3>Peso: {detailDog.peso}</h3>
    <h3>Altura: {detailDog.altura}</h3>
    <h3>Utilidad: {detailDog.utilidad}</h3>*/
   
 
    

  
 
    // return ()=>{
    //     setDogs(null)
    //     //limpiar
    // }
   
  // const [dogs, setDogs] = useState(null)
  // let {id} = useParams()

  // useEffect(()=>{
  //   return (     
  //     <div className='flex card'>      
  //       <h1>{id}</h1>   
  //       <h1>{dogs.name}</h1>   
  //     </div>
  //   )
  // }, [])
    
  


 

//export default DogDetail;
