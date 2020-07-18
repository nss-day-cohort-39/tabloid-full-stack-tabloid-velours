import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import TabloidFlowerBigTransparent from "../images/TabloidFlowerBigTransparent.png";
import "../index.css"


export default function Header() {
  const { isLoggedIn, logout, isAdmin } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
 

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">              
          <img className="iconImg" alt="" src={TabloidFlowerBigTransparent}></img>
          Tabloid
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn &&
              <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to ="/posts">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to ="/myposts">My Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to ="/categories">Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to ="/tags">Tags</NavLink>
              </NavItem> 
              {isAdmin &&
                <NavItem>
                  <NavLink tag={RRNavLink} to ="/userProfiles">Users</NavLink>
                </NavItem>          
              }
              </>
              
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/welcome"></NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/welcome"
                      aria-current="page" 
                      className="nav-link"
                      style={{ cursor: "pointer" }} 
                      onClick={logout}>Logout
                  </NavLink>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
              {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
