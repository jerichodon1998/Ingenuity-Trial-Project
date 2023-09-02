import React from "react";
import { Box, Fab } from "@mui/material";
import Navbar from "../components/navbar";
import { Link, Outlet } from "react-router-dom";
import { Add } from "@mui/icons-material";

const Root: React.FC = () => {
	return (
		<Box sx={{ paddingTop: "10px" }}>
			<Box sx={{ marginBottom: { xs: "50px", sm: "60px" } }}>
				<Navbar />
			</Box>
			<Link to={"recipes/create"} style={{ marginRight: "auto" }}>
				<Fab
					variant="extended"
					size="medium"
					color="primary"
					sx={{
						position: "absolute",
						top: { lg: "90px", md: "80px", sm: "70px" },
						right: { lg: "50px", md: "15px", sm: "10px", xs: "5px" },
					}}
				>
					<Add />
					New Recipe
				</Fab>
			</Link>
			<Outlet />
		</Box>
	);
};

export default Root;
