import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import logo from "../../assets/images/logo.png"
const Header = (props) => {
    
    return <header className={s.header}>
        <div className={s.headerInner}> 
        <div className={s.titleBlock}><img className={s.logo} src={logo} alt="lgog" /><h1 className={s.title}>ReactLovers</h1></div>

<Navbar/>
<div className={s.loginBlock}>

<div>
    
{props.isAuth ? 
<div> <button className={s.logBtn} onClick={props.LogOutUser}>Log out</button> </div> : 
<NavLink className={s.logBtn} to={"/login"}>Login</NavLink> }


</div>
</div>



        </div>
         
       
       
    </header>
}

export default Header;