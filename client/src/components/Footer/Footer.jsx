import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!!!
class Footer extends Component {
    
    render() {
    
        return (     
              
            <div class="footer">            
              Henry® 2022.
            </div>
        )
    }
    
}

export default Footer;