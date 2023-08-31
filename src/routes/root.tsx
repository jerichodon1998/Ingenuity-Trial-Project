import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
	return (
		<>
			<Box sx={{ marginBottom: { xs: "50px", sm: "60px" } }}>
				<Navbar />
			</Box>
			<Outlet />
		</>
	);
};

export default Root;
