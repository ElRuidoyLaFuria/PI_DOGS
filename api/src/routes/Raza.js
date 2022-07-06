require('dotenv').config();
const { spawn } = require('child_process');
const { Router } = require('express');
const {API_KEY} = process.env;
const { Op, BulkRecordError } = require("sequelize");
const axios = require('axios');
const { send, nextTick } = require('process');
const {Raza, Temperamento} = require('../db');
const { stripVTControlCharacters } = require('util');
const { notStrictEqual } = require('assert');
const { arrayBuffer } = require('stream/consumers');
 
const router = Router();

router.get('/', async (req, res, next) => { 

  let name = req.query.name   
  let razaPromiseApi
  let razaPromiseDb 

  try {

  //filtro de nombre en back.
  if (name){     
    razaPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds/search?q=' + name + '&api_key='+ API_KEY);  
    razaPromiseDb =  Raza.findAll({
    include: Temperamento,
    where: {
      name: {
        [Op.iLike]: '%' + name + '%'
      }        
    },
    order: [['name', 'asc']]
    })
  } else {    
     razaPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds'+'?api_key='+ API_KEY);  
     razaPromiseDb =  Raza.findAll({include: Temperamento})   
  } 

  Promise.all([razaPromiseApi, razaPromiseDb])
  .then((respuesta)=>{ 
  const [razaApi, razaDb] = respuesta;  
  
  let filteredRazasApi = razaApi.data.map((raza)=>{

  if (raza.weight.metric.length === 5){                    
     largo = raza.weight.metric.length   
     minWeight = parseInt(raza.weight.metric.substring(1,0)),
     maxWeight = parseInt(raza.weight.metric.substring(4,5))    
  }

  if (raza.weight.metric.length === 7){                    
    largo = raza.weight.metric.length  
    minWeight = parseInt(raza.weight.metric.substring(0,2))
    maxWeight = parseInt(raza.weight.metric.substring(5,7))     
 }

    return {
    id: raza.id,
    name: raza.name,    
    minWeight,
    maxWeight,
    img: raza.reference_image_id,
    temperament: raza.temperament,
    origin: raza.origin,
    lifeSpan: raza.life_span,
    utility: raza.utility,
    group: raza.breed_group   
    }

  })

  let filteredRazasDb = razaDb.map((raza)=>{    
    
  
  return {
      id: raza.id,
      name: raza.name,               
      img: raza.url,        
      minHeight: raza.altura,
      minWeight: parseFloat(raza.peso),
      lifeSpan: raza.anosDeVida,
      temperament: raza.temperamentos.map((temperamento) => temperamento.name)
    }    
  })   

  let allRazas=[...filteredRazasApi, ...filteredRazasDb]

  allRazas.sort(function (a, b) {
    // A va primero que B
    if (a.name.toUpperCase() < b.name.toUpperCase())
        return -1;
    // B va primero que A
    else if (a.name.toUpperCase() > b.name.toUpperCase())
        return 1;
    // A y B son iguales
    else 
        return 0;
});
res.send(allRazas)
})
 
    
  } catch (error) {
    next(error)
  } 
})


router.get('/:id', async (req, res, next) =>{  
  const id = req.params.id; 

  if (id.length>36){  
    return res.status(404).send('error al recibir el id '+ id)
  }
  // //||
   if (parseInt(id) < 0) {   
    
     return res.status(404).send('error al recibir el id '+ id)
   }
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  
    if (!regexExp.test(id)){         
      return res.status(404).send('error al recibir el id '+ id)
    }

  

  
  let SelectedfilteredRazas
  
  if (typeof id === 'string' && id.length>8){
    razaPromise = await Raza.findByPk(id) 
    .then((raza)=>{

        SelectedfilteredRazas = {
      id: raza.id,
      name: raza.name,               
      img: raza.url,        
      minHeight: raza.minHeight,
      maxHeight: raza.maxHeight,
      minWeight: raza.minWeight,
      maxWeight: raza.maxWeight,
      lifeSpan: raza.lifeSpan,
      breed_for: raza.breed_for,
      //temperament: respuesta.temperamentos.map((temperamento) => temperamento.name)
        }

        
    
  },
  (err)=>{
    return res.status(404).send("No encontrado")
  }
  ) 
  .catch(err=>next(err))
  res.status(200).send(SelectedfilteredRazas)
}         

  else {
    
    razaPromise = axios.get('https://api.thedogapi.com/v1/breeds?api_key='+ API_KEY)    
    .then((respuesta)=>{     
 
      let filteredRazasApi = respuesta.data.find((raza)=> raza.id === parseInt(id))
     
      if (!filteredRazasApi) {       
        res.status(404).send('Dog not found.')
      } 
       else{
        SelectedfilteredRazas = {

          name: filteredRazasApi.name,
         // peso: filteredRazasApi.weight.metric,
          // altura: filteredRazasApi.height.metric,
          bred_for: filteredRazasApi.bred_for,
          breed_group: filteredRazasApi.breed_group,
          lifeSpan: filteredRazasApi.life_span,
          temperament: filteredRazasApi.temperament,
          origin: filteredRazasApi.origin,
          img: filteredRazasApi.image.url
      }    
       res.status(200).send(SelectedfilteredRazas)
       }
 
      
    })  
    .catch (err=>next(err))
  
    
  }
    
});  
   
  
 



// router.get('/',(req, res, next)=>{
//   return Raza.findAll({include: Temperamento})
//   .then(raza=>{
//   res.send(raza)
//   })  
//   .catch((error)=>{
//     next(error)
//   })
// })


router.post('/', async (req, res, next)=>{ 
  const { name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, url} = req.body
 
  Raza.findAll({where: {name: name}})
  .then((encontrado)=>{ 
    if (encontrado.length>0){
     res.sendStatus(404)
    }
    else {
      let newRaza =  Raza.create({ name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, url })  
      res.status(200).send(newRaza) 
    }
  })

  
 
    
})
           
   
     
    
   
    //const newRaza = await Raza.create({ name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, url })  
     //res.status(200).send(newRaza)  
 
  // })
  


      
        
      
      
     
      
     


    

// router.post('/:razaId/temperamento/:temperamentoId', async (req, res, next)=>{
  
//   try {
//     const {razaId, temperamentoId} = req.params;
//     const raza = await Raza.findByPk(razaId)
//     await raza.addTemperamento(temperamentoId)
//     res.sendStatus(200);
//   } catch (error) {
//     next(error);
//   }
  

 ;
//   try { 
//    //const Raza = await Raza.findByPk(razaId);
//   res.send(200)
// } catch (error) {
//     next(error)
// }
//})

// router.put('/',(req, res, next)=>{
//   res.send('soy put /raza')
// } )

// router.delete('/',(req,res, next)=>{
//     res.send('soy delete /raza')
//   } )
module.exports = router;