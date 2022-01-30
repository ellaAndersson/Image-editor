import { ChromePicker } from 'react-color';
import React, {useRef, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { MenuItem } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


const Gallery = ({setSelectedImg}) =>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [backgroundCOpen,setBackgroundCOpen] = React.useState(false);
    const [navbarCOpen,setNavbarCOpen] = React.useState(false);
    const [clearOpen,setClearOpen] = React.useState(false);
    const [imgSizesOpen,setImgSizesOpen] = React.useState(false);
    const [backgroundColor,setBackgroundColor] = React.useState(localStorage.getItem("backgroundColor"));
    const [navbarColor,setNavbarColor] = React.useState(localStorage.getItem("navbarColor"));
    const [iconColor,setIconColor] = React.useState("white");

    const open = Boolean(anchorEl);
    
    useEffect(() => {
        //variables to items that are not images
        var parentDiv = document.getElementById("result");
        var storageNavbar = localStorage.getItem("navbarColor");
        var storageBackground = localStorage.getItem("backgroundColor");
        var imgH = localStorage.getItem("imgH");
        var imgW = localStorage.getItem("imgW");
        
        //if imagesizes are not set
        if(imgH == null && imgW == null){
            imgH = 350;
            imgW = 350;
        }

        document.body.style.backgroundColor = localStorage.getItem("backgroundColor");
        
        for(var i = 0; i < localStorage.length; i++){

            let item = localStorage.getItem(localStorage.key(i));
            
            if(item != storageNavbar &&  item != storageBackground && item != imgW &&
                 item != imgH){
                var image = new Image(imgW,imgH);
                image.className = "galleryImage";
                image.style.marginTop = "3%"
                image.style.marginLeft = "3%"

            
                image.src = item;
                parentDiv.appendChild(image);

                image.addEventListener("click",handleImageClick);

            }
        }
        //changing icon's color based on backgroundcolor
        if(getContrast(storageBackground) == "w"){
            setIconColor("white");
        }else{
            setIconColor("black");
        }

        var buttons = Array.prototype.slice.call(document.querySelectorAll(".navButton"));
        var homeButton = Array.prototype.slice.call(document.querySelectorAll(".navButtonHome"));

        //changing navbar text color based on navbar backgroundcolor
        if(getContrast(storageNavbar) == "w"){
            
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

        
	}, []);

    const handleImageClick = (event) =>{
        setSelectedImg(event.target.src)
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        setAnchorEl(null);
        setBackgroundCOpen(false);
        setNavbarCOpen(false);
        setClearOpen(false);
        setImgSizesOpen(false);
    }

    const handleMenuItem = (event) => {
        if(event.target.id == "navbarColor"){
            setNavbarCOpen(true);
        }
        else if(event.target.id =="backgroundColor"){
            setBackgroundCOpen(true);
        }
        else if(event.target.id == "imageSizes"){
            setImgSizesOpen(true);
        }
        else{
            setClearOpen(true);
        }
    }

    // chack the contrast of hexcolor
    function getContrast(hexColor){
        hexColor = hexColor.replace("#", "");
        var r = parseInt(hexColor.substr(0,2),16);
        var g = parseInt(hexColor.substr(2,2),16);
        var b = parseInt(hexColor.substr(4,2),16);

        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'b' : 'w';
    }
    
  
    const handleBackgroundPicker = (color) =>{
        document.body.style.backgroundColor = color.hex;
        setBackgroundColor(color.hex);
        localStorage.setItem("backgroundColor",color.hex);

        //changing icon's color based on backgroundcolor
        if(getContrast(color.hex) == "w"){
            setIconColor("white");
        }else{
            setIconColor("black");
        }
    }

    const handleNavbarPicker = (color) =>{
        document.getElementById("appbar").style.backgroundColor = color.hex;
        setNavbarColor(color.hex);
        localStorage.setItem("navbarColor",color.hex);

        var buttons = Array.prototype.slice.call(document.querySelectorAll(".navButton"));
        var homeButton = Array.prototype.slice.call(document.querySelectorAll(".navButtonHome"));

        //changing navbar text color based on navbar backgroundcolor
        //returns b(black) or w(white) meaning the color of the text that stands out of the hexcolor
        if(getContrast(color.hex) == "w"){
            
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
    }

    const handleSizeChange = (event) =>{
        var images =  document.getElementsByClassName("galleryImage");
        //change the images' sizes based on event.target.id
        for (var i = 0; i < images.length; i++) {
            if(event.target.id == "very small"){
                localStorage.setItem("imgW",150);
                localStorage.setItem("imgH",150);

                images[i].width = "150";
                images[i].height = "150";

            }
            else if(event.target.id == "small"){
                localStorage.setItem("imgW",250);
                localStorage.setItem("imgH",250);

                images[i].width = "250";
                images[i].height = "250";
                
            }
            else if(event.target.id == "medium"){
                localStorage.setItem("imgW",350);
                localStorage.setItem("imgH",350);


                images[i].width = "350";
                images[i].height = "350";

            }
            else if(event.target.id == "big"){
                localStorage.setItem("imgW",500);
                localStorage.setItem("imgH",500);

                images[i].width = "500";
                images[i].height = "500";

            }
            else if(event.target.id == "huge"){
                localStorage.setItem("imgW",800);
                localStorage.setItem("imgH",800);

                images[i].width = "800";
                images[i].height = "800";
                
            }
        }
    }
    const handleClear = (event) =>{
        var storageNavbar = localStorage.getItem("navbarColor");
        var storageBackground = localStorage.getItem("backgroundColor");
        var imgH = localStorage.getItem("imgH");
        var imgW = localStorage.getItem("imgW");

        localStorage.clear();
        
        localStorage.setItem('backgroundColor',storageBackground);
        localStorage.setItem('navbarColor',storageNavbar);
        localStorage.setItem('imgH',imgH);
        localStorage.setItem('imgW',imgW);

        //refresh the page
        window.location.reload();

        setAnchorEl(null);
        setClearOpen(false);
    }

    
    return(
        
        <div className="gallery" id="gallery">
            <div>
               <IconButton
                id="menuButton"

                aria-label="more"
                aria-haspopup="true"
                onClick={handleMenuClick}
               >
                   <SettingsIcon   style={{ color: iconColor }}/>
               </IconButton>
               <Menu
               anchorEl={anchorEl}
               keepMounted
               open={open}
               onClose={handleClose}>
                   
                   <MenuItem id="backgroundColor" onClick={handleMenuItem}>Backgroundcolor
                   </MenuItem>
                   <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title"
                    open={backgroundCOpen}>
                        <IconButton id="closeButton" aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>

                        <DialogTitle id="simple-dialog-title">Change background color
                        </DialogTitle>

                        <ChromePicker id="backgroundPicker" color={backgroundColor}
                         onChangeComplete={handleBackgroundPicker}/>
                    
                   </Dialog>

                   <MenuItem id="navbarColor"onClick={handleMenuItem}>Navigation bar color
                   </MenuItem>
                   <Dialog onClose={handleClose} open={navbarCOpen}>
                       
                        <IconButton id="closeButton" aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
        
                        <DialogTitle>Change navigation bar color</DialogTitle>

                        <ChromePicker id="navbarPicker" color={navbarColor} 
                        onChangeComplete={handleNavbarPicker}/>
                   </Dialog>

                   <MenuItem id="imageSizes" onClick={handleMenuItem}>Images's sizes</MenuItem>


                   <Dialog onClose={handleClose} open={imgSizesOpen}>
                       <DialogTitle>Select images's sizes</DialogTitle>
                       <DialogContent>
                           <List>
                               <ListItem button id="very small" onClick={handleSizeChange}>
                                   Very small
                               </ListItem>
                               <ListItem button id="small" onClick={handleSizeChange}>
                                   Small
                               </ListItem>
                               <ListItem button id="medium" onClick={handleSizeChange}>
                                   Medium
                               </ListItem>
                               <ListItem button id="big" onClick={handleSizeChange}>
                                   Big
                               </ListItem>
                               <ListItem button id="huge"onClick={handleSizeChange}>
                                   Huge
                               </ListItem>
                           </List>
                       </DialogContent>
                   </Dialog>

                   <MenuItem onClick={handleMenuItem}>Clear gallery</MenuItem>

                   <Dialog onClose={handleClose} open={clearOpen}>

                   <DialogContent>
                      <DialogContentText>
                      Are you sure you want to remove all pictures from gallery?
                      </DialogContentText>
                   </DialogContent>
                   <DialogActions>

                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClear} color="primary">
                            Clear gallery
                        </Button>
                   </DialogActions>
                   </Dialog>

               </Menu>

           </div>

           <div id="result">
           </div>
        </div>

    );
}

export default Gallery;