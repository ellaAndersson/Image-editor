import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const LargeImage = ({selectedImg,setSelectedImg}) => {

    const handleClick = (event) => {
        //set selected image null if user clicks something else than the large image
        if(event.target.className == "enlargedImg"){
            setSelectedImg(null);
        }
    }
    const handleDelete = (event) => {
        for(var i = 0; i < localStorage.length; i++){

            let item = localStorage.getItem(localStorage.key(i));
            
            if(item == selectedImg){
                localStorage.removeItem(localStorage.key(i))
                setSelectedImg(null);
                //refresh page
                window.location.reload();
            }
        }
    }
    return(
        <div className="enlargedImg" onClick={handleClick}>
            <img src={selectedImg}/>
            <Button className="btn" onClick={handleDelete}>
                <DeleteIcon/>
            </Button>
        </div>
    )
}
export default LargeImage;