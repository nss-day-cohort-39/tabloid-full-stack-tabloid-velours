import React from "react";
import {NavLink as RRNavLink } from "react-router-dom";
import TabloidHomeLogo from "../../images/TabloidHomeLogo.png";
import {NavLink} from 'reactstrap';



export default function LoginRegister() {

  return (
      <>
    <main>
         <header className="masthead bg-primary text-white text-center">
    <div className="container d-flex align-items-center flex-column">
        <img src={TabloidHomeLogo} alt=""/>
        <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon"><i class="fas fa-star"></i></div>
            <div className="divider-custom-line"></div>
        </div>
    </div>
</header>

<div class="row justify-content-center">
<NavLink className="btn btn-primary btn-lg ml-3" tag={RRNavLink} to="/Login">LOGIN</NavLink> 
           <NavLink className="btn btn-primary btn-lg ml-3" tag={RRNavLink} to="/Register">REGISTER</NavLink> 
        </div>
     
    </main>
    </>
  );
};