import './Dog.css'
//import './CropImage.js'
import React, { useEffect, useState, useRef } from 'react'
import {Link} from 'react-router-dom'
import Image from '../Image/Image'
export default function Dog({id, name, image, minWeight, temperament, key}){
 
//if (!minWeight) minWeight = 'Peso mínimo no disponible';
//if (!minWeight) minWeight = 99;

 return(     
    <div className='cardDog'>      
      <Link to={`/${id}`}>
        <h1>{name}</h1>  
        <Image image={image}  />        
        {/* <h1>Peso mínimo: {minWeight} kgs.</h1>    */}
        <h1>Temperamentos: {temperament}</h1>    
      </Link>
    </div>
  )
 
  
}