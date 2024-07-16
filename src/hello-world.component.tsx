import React from "react";
import * as classes from "./mystyles.scss"
import logo from './content/logo_1.png';

export const HelloWorld: React.FC = () => {

	return (
		<>
			<h1 className={classes.helloWorld}>Hola Mundo</h1>
			<p>{process.env.MODE}</p>
			<img src={logo} alt="logo" />
		</>
	);
};
