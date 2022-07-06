
import React from 'react'

import noAvailablePic from './Images/noAvailablePic.png';


export default function Image({image}){
 
  let ruta
 
  if (image && image.length === 9) {
    ruta = 'https://cdn2.thedogapi.com/images/'+ image + '.jpg';
  } else if (!image) ruta = noAvailablePic 
  else ruta=image 

  
  // else {
  //   ruta = 'https://cdn2.thedogapi.com/images/'+ image + '.jpg';
  // }
  
  //  if (image.length > 9) {
  //    ruta = 'https://cdn2.thedogapi.com/images/'+ image + '.jpg';
  //  }
  
  

  //const imagen = 'localhost:3000//0c7390d0f6463b7591a428f0a90e611e.jpg'
  //const imagen = '0c7390d0f6463b7591a428f0a90e611e.jpg'
 
  //require ({imagen})
  //window.alert( );

 
     
     //return require(`${path}`);
     //+ '/0c7390d0f6463b7591a428f0a90e611e.jpg'
    //return require('0c7390d0f6463b7591a428f0a90e611e.jpg');
   // return require
    // } catch (err) {
    //   window.alert('no')
    //  //return null;
    // }

      
  // let arr = image.split('')
  // let largo = arr.find(element => elem+ent==='.')  
  // let ruta
  // if (!image) {    
  //   ruta = noAvailablePic
   
  //   } else if (largo<1) 
    
  //   else ruta = image

  
//const ruta='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'

  return (
    <div>
     <img src={ruta}  alt="" width="300" height="300"/>   
    </div>
    ) 
}