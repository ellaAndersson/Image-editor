import React, {useRef, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';


function Edit() {
    const [imageUrl,setimageUrl] = React.useState(null);
    const [elementsDisabled,setElementsDisabled] = React.useState(true);
    const [contrast,setContrast] = React.useState(100);
    const [textUp,setTextUp] = React.useState("");
    const [textDown,setTextDown] = React.useState("");
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageW,setimageW] = React.useState(500);
    const [imageH,setImageH] = React.useState(600);
    const [brightness,setBrightness] = React.useState(100);
    const [clear,setClear] = React.useState(false);
    const [undoStack, setUndoStack] = React.useState([]);
    const [redoStack, setRedoStack] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [alertOpen,setAlertOpen] = React.useState(false);
  


    const canvasRef = useRef(null);
	const imageRef = useRef(null);

    
    const marks = [
        {
        value: 0,
        label: '0',
        },
        {
        value: 100,
        label: '100',
        },
        {
        value: 200,
        label: '200',
        },
    ];
  
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
        
        let ctx = canvasRef.current.getContext('2d');
	
		let [w, h] = [canvasRef.current.width, canvasRef.current.height];
		// clear canvas
		ctx.clearRect(0, 0, w, h);
		// save canvas
		ctx.save();

        //adding right contrast value
        var contrastValue = '' + contrast;
        var contrastString = "contrast(".concat(contrastValue).concat("%)")
        ctx.filter = contrastString;

        //adding right brightness value
        var brightnessValue = '' + brightness;
        var brightnessString = "brightness(".concat(brightnessValue).concat("%) ").
        concat(contrastString)
        ctx.filter = brightnessString;
        ctx.save();
		
        //drawing the image again
		ctx.drawImage(imageRef.current, 0, 0, w , h);
    
        
		ctx.font = '50px serif';
		//drawing upper and lower text
		ctx.fillText(textUp,imageW/8,imageH/5);
		ctx.fillText(textDown,imageW/8,imageH/1.1);

        //clearing the canvas if the user has clicked clear-button
        if(clear){
            ctx.clearRect(0,0,w,h);
        }
	});

    //check the contrast of hexcolor
    //returns b(black) or w(white) meaning the color of the text that stands out of the hexcolor
    function getContrast(hexColor){
        hexColor = hexColor.replace("#", "");
        var r = parseInt(hexColor.substr(0,2),16);
        var g = parseInt(hexColor.substr(2,2),16);
        var b = parseInt(hexColor.substr(4,2),16);

        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'b' : 'w';
    }
   
   
    const notifyLoaded = (event) => {
		setImageLoaded(true);
	}

    const fileSelectorHandler= (event) => {
        //get image's url
        setimageUrl(URL.createObjectURL(event.target.files[0]));
        //hide elements
        document.getElementById("header").style.display ="none";
        document.getElementById("fileSelector").style.display ="none";

        setElementsDisabled(false); 
        setClear(false);       
    }
    const handleImageEdit = (event,newValue)=>{
        
        var value = '' + newValue;
        setRedoStack([]);
        
        if(event.target.id == "brightness"){
            setBrightness(newValue);

            //creating item that will be added to undostack
            //the letter represents the type of value and the value is numerical 
            //value of the item
            var b = "b"
            var bItem = b.concat(value);

            //aplication adds the item to the stack only if the previous item 
            //is not from the same slider
            if(undoStack.length == 0 ||(undoStack.length > 0 &&
                 !undoStack[undoStack.length-1].includes(b)) ){
               
                setUndoStack(undoStack.concat(bItem));

                
            }else{
                //the new item replaces the previous one
                undoStack[undoStack.length-1] = bItem;
            }
        }
        else if(event.target.id == "contrast"){
            setContrast(newValue);

            var c = "c"
            var cItem = c.concat(value);


            if(undoStack.length == 0 ||(undoStack.length > 0 &&
                 !undoStack[undoStack.length-1].includes(c)) ){
                setUndoStack(undoStack.concat(cItem));

                
            }else{
                undoStack[undoStack.length-1] = cItem;
            }
        
            
        }
        else if(event.target.id == "width"){
            setimageW(newValue);

            
            var w = "w"
            var wItem = w.concat(value);


            if(undoStack.length == 0 ||(undoStack.length > 0 &&
                 !undoStack[undoStack.length-1].includes(w)) ){
                setUndoStack(undoStack.concat(wItem));

                
            }else{
                undoStack[undoStack.length-1] = wItem;
            }
        
        }
        else if(event.target.id == "height"){
            setImageH(newValue);

            var h = "h"
            var hItem = h.concat(value);


            if(undoStack.length == 0 ||(undoStack.length > 0 &&
                 !undoStack[undoStack.length-1].includes(h)) ){
                setUndoStack(undoStack.concat(hItem));

                
            }else{
                undoStack[undoStack.length-1] = hItem;
            }
        }
    }
    const handleTextChange =(event)=>{
        //setting text values to upper and lower text
        if(event.target.id == "textUp"){
            setTextUp(event.target.value);
        }else{
            setTextDown(event.target.value);
        } 
    }

    const printImage = (event) => {
        window.print();    
    }

    const undo = (event) =>{
        //get last value from undostack
        var lastValue = undoStack[undoStack.length-1];
        //remove last value from undostack
        undoStack.splice(undoStack.indexOf(lastValue),1);
        setUndoStack(undoStack);
        //add last value to redostack
        setRedoStack(redoStack.concat(lastValue));
        
        //get letter of the lastvalue
        var letter = lastValue.charAt(0);

        var itemIsNotFound = true;
        
        //loop tries to find the next item that has same letter than the last value
        for (var i = undoStack.length - 1; i >= 0 && itemIsNotFound; i--) {
            if(undoStack[i].includes(letter)){
               //get the value from item
               var value = undoStack[i].substr(1,undoStack[i].length-1);

                if(letter == "b"){
                    
                    setBrightness(value);
                    itemIsNotFound = false;
                }
                else if(letter == "c"){
                    setContrast(value);
                    itemIsNotFound = false;
                }
                else if(letter == "w"){
                    setimageW(value);
                    itemIsNotFound = false;

                }
                else if(letter == "h"){
                    setImageH(value);
                    itemIsNotFound = false;

                }
            }
        }
        //if undostack doesn't contain the letter,set value to original value
        if(itemIsNotFound){
            if(letter =="b"){
                setBrightness(100);
            }
            if(letter == "c"){
                setContrast(100)
            }
            if(letter == "w"){
                setimageW(500)
                
            }
            if(letter == "h"){
                setImageH(600)
            }
        }
    

    }
    const redo = (event) => {
        //get the last value from redostack
        var lastValue = redoStack[redoStack.length-1];
        //remove the last value
        redoStack.splice(redoStack.indexOf(lastValue),1);
        //add the last value to undostack
        setUndoStack(undoStack.concat(lastValue));

        var letter = lastValue.charAt(0);
        var value = lastValue.substr(1,lastValue.length-1);

        if(letter == "b"){
            setBrightness(value);
        }
        else if(letter == "c"){
            setContrast(value);
        }
        else if(letter == "w"){
            setimageW(value);
        }
        else if(letter == "h"){
            setImageH(value);
        }
    }

    const handleSaveClick = (event) =>{
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        setAlertOpen(false);
        setAnchorEl(null);
    }
    const handleSaveComputer = (event) =>{
        const image = document.getElementById("canvas").toDataURL();
        const link = document.createElement("a");
        link.href = image;
        link.download = "image.png";
        link.click();
        
        setAnchorEl(null);

    }

    const handleSaveGallery = (event) =>{
        if(localStorage.length < 12){

            var data = document.getElementById('canvas').toDataURL();
            var name = document.getElementById("fileSelector").files[0].name;
            //adding canvas to local storage
            localStorage.setItem(name,data);
            window.location.href = "gallery";

        }else{
            //alert opens
            setAlertOpen(true);
        }
        setAnchorEl(null);
    }

    const handleReset = (event) => {
        //return original values
        setBrightness(100);
        setContrast(100);
        setImageH(600);
        setimageW(500);

        //clear stacks
        setUndoStack([]);
        setRedoStack([]);
    }

    const handleClear = (event) => {
        setClear(true);
        setElementsDisabled(true);
        document.getElementById("header").style.display = "block";
        document.getElementById("fileSelector").style.display ="block";

        setImageLoaded(false);
        setimageUrl("");
        
        //clear stacks
        setRedoStack([]);
        setUndoStack([]);
        
        //empty textfields
        setTextDown("");
        setTextUp("");

        document.getElementById("fileSelector").value = "";


    }

    const handleAlertClose = (event) =>{
        setAlertOpen(false);
    }
    
    return(
        <div className="edit">

            <Dialog onClose={handleAlertClose} open={alertOpen}>

                <IconButton id="closeButton" aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>

                <DialogContent><Typography variant="h6">Gallery is full! Clear it or remove item.
                </Typography>
                </DialogContent>

            </Dialog>
            <div>
                <Typography id="header" variant="h4">Start by choosing an image:</Typography>
                <input type="file" id="fileSelector" onChange={fileSelectorHandler}/>
                <div>
                    <canvas
                        id="canvas"
                        width={imageW}
                        height={imageH}
                        ref={canvasRef}
                    />
                </div>
                
                <img src={imageUrl}  ref={imageRef} style={{"display": "none"}}
                onLoad={notifyLoaded}/>
            </div>

            <div class="editing">
                <div class="noprint" id="textfields">
                    <TextField id="textUp" value={textUp} disabled={elementsDisabled} 
                    label="Upper text:" onChange={handleTextChange}/>

                    <TextField id="textDown" value={textDown} disabled={elementsDisabled}
                    label="Lower text:" onChange={handleTextChange}/>

                </div>
                <div class="noprint" id="sliders">

                    <Typography>Width</Typography>

                    <Slider
                    id="width"
                    value={imageW}
                    onChange={handleImageEdit}
                    
                    step={10}
                    min={200}  
                    max={800} 
                    disabled={imageLoaded == false}
                    aria-labelledby="continuous-slider" />

                    <Typography>Height</Typography>

                    <Slider
                    id="height"
                    value={imageH}
                    onChange={handleImageEdit}
                    
                    step={10}
                    min={200}  
                    max={800} 
                    disabled={imageLoaded == false}
                    aria-labelledby="continuous-slider" />

                    <Typography>Contrast</Typography>

                    <Slider
                    id="contrast"
                    value={contrast}
                    onChange={handleImageEdit}
                
                    min={0}  
                    max={200} 
                    marks={marks}
                    disabled={imageLoaded == false}
                    aria-labelledby="continuous-slider" />

                    <Typography>Brightness</Typography>

                    <Slider id="brightness"
                    value={brightness}  
                    min={0} 
                    max={200} 
                    marks={marks}
                    disabled={imageLoaded == false}
                    onChange={handleImageEdit} 
                    aria-labelledby="continuous-slider" />
                </div>

                <div class ="noprint">

                    <IconButton disabled={undoStack.length === 0} onClick={undo}>
                        <UndoIcon/>
                    </IconButton>
                    <IconButton disabled={redoStack.length === 0}  onClick={redo}>
                        <RedoIcon/>
                    </IconButton>
                    <Button id="reset" variant="contained" disabled={undoStack.length === 0} 
                    onClick={handleReset}>Reset changes</Button>
                        
                </div>
                <div class="noprint" id="buttons">
                    <Button id="reset" variant="contained" disabled={imageLoaded==false} 
                    onClick={handleClear}>Clear</Button>
                    <Button variant="outlined" id="print" color="primary" 
                    disabled = {imageLoaded == false} onClick={printImage}>Print</Button>

                    <Button color="primary" disabled = {imageLoaded == false} 
                    variant="contained" aria-controls="simple-menu" aria-haspopup="true"
                    onClick={handleSaveClick}>
                    Save
                    </Button>
                    <Menu

                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        <MenuItem onClick={handleSaveComputer}>Save to computer</MenuItem>
                        <MenuItem onClick={handleSaveGallery}>Save to gallery</MenuItem>
                
                    </Menu>
                        
                </div>
            </div>
        </div>
    );
}
export default Edit;