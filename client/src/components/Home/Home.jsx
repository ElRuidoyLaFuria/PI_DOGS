import React, { Component } from 'react';
import {connect} from 'react-redux';
//import { getAllDogs } from '../../redux/actions/index.js';

//import img from 'C:\\Henry\\P.I\\PI-Dogs-main\\client\\src\\dog.png';
import img from '../../dog.png'
//'C:\\Henry\\P.I\\PI-Dogs-main\\client\\src\\dog.png';
// Fijense en los test que SI O SI tiene que ser un class component, de otra forma NO VAN A PASAR LOS TEST.

export class Home extends Component {

  componentDidMount() {
    //this.props.getAllDogs();
  }

  render() {
    return (

      <div>
       <h1>Henry Dogs</h1>
       <img src={img} alt="main-img" className="" />
       <h3>Dogs</h3>
      </div>
   

      /* {this.props.dogs?.map(dog => {
          return (
            <dogCard
              id={dog.id}
              name={dog.name}
             // price={product.price}
             // stock={product.stock}
              key={dog.id}
            />
          );
        })} */
  
 
      )
  }
}


export const mapStateToProps = state => {
  
};

export const mapDispatchToProps = dispatch => {
  
};



export default connect(mapStateToProps,mapDispatchToProps)(Home)
