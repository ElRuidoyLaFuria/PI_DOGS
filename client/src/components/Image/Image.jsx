
import React from 'react'

import noAvailablePic from './Images/noAvailablePic.png';


export default function Image({image}){
 
  let ruta
 
  if (image && image.length === 9) {
    ruta = 'https://cdn2.thedogapi.com/images/'+ image + '.jpg';
  } else if (!image) ruta = noAvailablePic 
  else ruta=image 
  
  return (
    <div>
     <img src={ruta}  alt="" width="300" height="300"/>   
    </div>
    ) 
}