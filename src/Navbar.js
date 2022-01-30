import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import React, {useRef, useEffect} from 'react';

const Navbar = () => {

    return(
        <nav className="navbar">
            <div class="noprint">
                <AppBar className="appbar" style={{background: localStorage.getItem("navbarColor")}} 
                id="appbar" position="static">
                    <Toolbar className="toolbar" >
                        <a href="/"><Button className="navButtonHome" >Image editor</Button></a>
                        <a href="/edit" ><Button className="navButton">Edit</Button></a>
                        <a href="/gallery"><Button className="navButton">Gallery</Button></a>
                        <a href="/info"><Button className="navButton">Info</Button></a>

                    </Toolbar>
                </AppBar>
            </div>
        </nav>

    );
}

export default Navbar;

