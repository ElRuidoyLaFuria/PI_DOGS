require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;

const { Router } = require('express');
//const {Temperamento} = require('../db') 
//const filterTemperaments = require ('./funciones.js')
//const foo = require ('./funciones')
//require('./funciones2.js')

//import {filterTemperaments} from './funciones'
//console.log(filterTemperaments)

const router = Router();

var filterTemperaments = require('./funciones.js');
//var x = require('./funciones.js')();


router.get('/', async(req, res, next)=>{     

    temperamentsPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds'+'?api_key='+ API_KEY);  
    temperamentsPromiseApi.then((respuesta)=>{
    let temperaments = respuesta.data.map(dog => dog.temperament)
     
    if (temperaments){
      //filterTemperaments(temperaments)
    let filteredTemperaments = filterTemperaments(temperaments)
      res.status(200).send(filteredTemperaments)
    }  
     })
     .catch((err)=> next(err))
    //const temperamento = await Temperamento.findAll()
    //res.send(temperamento)  
    
 })
 

// router.post('/', async (req, res, next)=>{
//   const {name} = req.body;   
//     console.log(name)
//   try {
    
//     return Temperamento.create({name})
//     .then ((newTemperamento)=>{
//       res.status(200).send(newTemperamento)
//     })
//   }
//   catch {
//     (error => next(error))
//   }        
// })

// router.put('/',(req, res, next)=>{
//   res.send('soy put /temperamento')
// } )

// router.delete('/',(req,res, next)=>{
//     res.send('soy delete /temperamento')
//   } )
  

module.exports = router;