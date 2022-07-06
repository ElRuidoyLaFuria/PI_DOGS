require('dotenv').config();
const { spawn } = require('child_process');
const { Router } = require('express');
const {API_KEY} = process.env;
const { Op } = require("sequelize");
const axios = require('axios');
const { send } = require('process');
const {Raza, Temperamento} = require('../db');
const { stripVTControlCharacters } = require('util');
const { notStrictEqual } = require('assert');

 
const router = Router();

router.get('/',(req, res, next)=>{
  let name = req.query.name   
  let razaPromiseApi
  let razaPromiseDb 

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
     razaPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds');  
     razaPromiseDb =  Raza.findAll({include: Temperamento})   
  } 
  
  Promise.all([razaPromiseApi, razaPromiseDb])
    .then((respuesta)=>{
      const [razaApi, razaDb] = respuesta; 
      //const minWeight = razaApi.weight.metric.substring(1,3);       
      const minWeight = 1  
      let obj = {
        pMin: 0
      }    

      let filteredRazasApi = razaApi.data.map((raza)=>{        
      obj.id = raza.id
      obj.id = raza.name

        //  id: raza.id,         
        //  name: raza.name,
        //  img: raza.reference_image_id,
         //peso: parseInt(raza.weight.metric.substring(1,3))
       
         //pesoMin: minWeight         
         })

        return obj

      })  
    })
 
    //  life_span: raza.life_span,
        //  weight: raza.weight.metric,
        //  img: raza.image.id,
        //  url: raza.image.url                  
        //}


     //})
     let filteredRazasDb = razaDb.map((raza)=>{      
      return {
        id: raza.id,
        name: raza.name,
       
        //url: raza.image.url,

        // altura: raza.altura,
        // peso: raza.peso,
        // anosDeVida: raza.anosDeVida,
        // temperament: raza.temperamentos.map((temperamento) => temperamento.name)
      }    
    }) 
    let allRazas=[...filteredRazasApi, ...filteredRazasDb]
    //let allRazas=[...filteredRazasApi]
    res.send(allRazas); 
  })
  .catch((error)=>{
    next(error)
  })
});

router.get('/:id', async (req, res, next) =>{  
  const id = req.params.id;   
  //let raza;
  let SelectedfilteredRazas
  
  if (typeof id === 'string' && id.length>8){
    razaPromise = await Raza.findByPk(id) 
    .then((respuesta)=>{

        SelectedfilteredRazas = {
          name: respuesta.dataValues.name,
          altura: respuesta.dataValues.altura,
          peso:  respuesta.dataValues.peso,
          anosDeVida: respuesta.dataValues.anosDeVida
        }
    
  }) 
  res.status(200).send(SelectedfilteredRazas)
}         

  else {
    
    razaPromise = axios.get('https://api.thedogapi.com/v1/breeds?api_key='+ API_KEY)    
    .then((respuesta)=>{     

      let filteredRazasApi = respuesta.data.find((raza)=> raza.id === parseInt(id))
      
       SelectedfilteredRazas = {

        name: filteredRazasApi.name,
        peso: filteredRazasApi.weight.metric,
        altura: filteredRazasApi.height.metric,
        utilidad: filteredRazasApi.bred_for,
        grupo: filteredRazasApi.breed_group,
        esperandaDeVida: filteredRazasApi.life_span,
        temperamento: filteredRazasApi.temperament,
        origen: filteredRazasApi.origin,
        url: filteredRazasApi.image.url
    }    
     res.status(200).send(SelectedfilteredRazas)
    })  
    
  }
  
       
   
  

// } catch (error) {
//   next(error)
// }

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
  try {
    const {name, altura, peso, anosDeVida} = req.body
    const newRaza = await Raza.create({name, altura, peso, anosDeVida})  
    res.status(200).send(newRaza)     
 } catch (error){
   next(error)
 }
})

router.post('/:razaId/temperamento/:temperamentoId', async (req, res, next)=>{
  
  try {
    const {razaId, temperamentoId} = req.params;
    const raza = await Raza.findByPk(razaId)
    await raza.addTemperamento(temperamentoId)
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
  


  //console.log(Raza.addRazas(343));
  //console.log(Raza.addTemperamento(343));
//   try { 
//    //const Raza = await Raza.findByPk(razaId);
//   res.send(200)
// } catch (error) {
//     next(error)
// }
})

router.put('/',(req, res, next)=>{
  res.send('soy put /raza')
} )

router.delete('/',(req,res, next)=>{
    res.send('soy delete /raza')
  } )
  

module.exports = router;