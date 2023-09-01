import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface NavButtonProps {
	text: string;
	linkTo: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text, linkTo }) => {
	return (
		<Button variant="outlined" key={text}>
			<Link to={linkTo} style={{ textDecoration: "none", color: "#fff" }}>
				{text}
			</Link>
		</Button>
	);
};

export default NavButton;
