
import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import Edit from './Edit';
import Gallery from './Gallery';
import Home from './Home';
import Info from './Info';
import LargeImage from './LargeImage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function ImageEditor() {
	const [selectedImg,setSelectedImg] = React.useState(null);

	return (
		<Router>
			<div className="imageEditor">
				<Navbar/>
				<div className="content">
					<Switch>
						<Route exact path="/">
							<Home/>
						</Route>

						<Route path="/edit"> 
							<Edit/>

						</Route>
						<Route path="/gallery" > 
							<Gallery setSelectedImg={setSelectedImg}/>
							{ selectedImg && ( <LargeImage selectedImg={selectedImg} 
							setSelectedImg={setSelectedImg}/>)}

						</Route>
						<Route path="/info"> 
							<Info/>
						</Route>

					</Switch>
				</div>
				
			</div>
		</Router>
	
	);
}

export default ImageEditor;