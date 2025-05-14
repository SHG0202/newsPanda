import React from 'react'
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="card-container d-flex align-items-center justify-content-center">
    <div className="card mx-auto" style={{width: "20rem"}}>
        <div className="card-body" style={{backgroundColor: 'grey', color: 'white'}}>
            <h2 className="card-title">About us</h2>
            <h6 className="card-subtitle mb-2 text-body-secondary">Authon: SHG</h6>
            <p className="card-text">This is my first Web App, which is built using Reactjs. This App / unility is created to 
                assist uses with text manupulations.</p>
            <Link to="https://www.linkedin.com/in/saket-gupta-8a5974b8/" className="card-link">LinkedIn</Link>
        </div>
    </div>
    </div>
  )
}

export default About
