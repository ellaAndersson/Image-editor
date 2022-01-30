import flowers from './flowers.png';
import { Typography } from "@material-ui/core";
import React, {useRef, useEffect} from 'react';

const Home = () => {
    useEffect(() => {
        var buttons = Array.prototype.slice.call(document.querySelectorAll(".navButton"));
        var homeButton = Array.prototype.slice.call(document.querySelectorAll(".navButtonHome"));
        
        //changing navbar text color based on navbar backgroundcolor
        if(getContrast(localStorage.getItem("navbarColor")) == "w"){
            
            buttons.forEach(function(btn){
                btn.style.color = "white";  
            });    

            homeButton.forEach(function(homebtn){
                homebtn.style.color = "white";  
            }); 
            
        }else{
            buttons.forEach(function(btn){
                btn.style.color = "black";  
            });    

            homeButton.forEach(function(homebtn){
                homebtn.style.color = "black";  
            });
            
        } 
	});

     //check contrast of hexcolor
     //returns b(black) or w(white) meaning the color of the text that stands out of the hexcolor
     function getContrast(hexColor){
        hexColor = hexColor.replace("#", "");
        var r = parseInt(hexColor.substr(0,2),16);
        var g = parseInt(hexColor.substr(2,2),16);
        var b = parseInt(hexColor.substr(4,2),16);

        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'b' : 'w';
    }

    return(
        <div className="home">
            <Typography variant="h3">Image editor</Typography>
            <Typography variant="h6">Make your pictures flourish.</Typography>
            <img src={flowers} alt="Flowers" />
        </div>

    );
}
export default Home;