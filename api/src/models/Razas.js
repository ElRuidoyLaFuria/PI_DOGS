const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
  sequelize.define('raza',
  {

    name: {
      type: DataTypes.STRING,      
      allowNull: false       
    },
 
   id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 
    },

    minHeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    maxHeight: {
      type: DataTypes.FLOAT,
      allowNull: false
  },

    minWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    maxWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
  },

    lifeSpan: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
  }          
  },
  { timestamps: false }  
)}; 