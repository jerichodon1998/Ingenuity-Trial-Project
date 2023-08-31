import {
	Drawer,
	Box,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	IconButton,
	Button,
	AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	const navItems = ["Login", "Signup", "Dashboard"];
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const drawerWidth: number = 240;

	const handleDrawerToggle = (): void => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer: JSX.Element = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
				<Typography variant="h6" sx={{ my: 2 }}>
					InguenityProject
				</Typography>
			</Link>
			{/* <Divider /> */}
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>
								<Link
									to={item.toLocaleLowerCase()}
									style={{ textDecoration: "none", color: "#000" }}
								>
									{item}
								</Link>
							</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						<Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
							InguenityProject
						</Link>
					</Typography>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navItems.map((item) => (
							<Button variant="outlined" key={item}>
								<Link
									to={`${item}`}
									style={{ textDecoration: "none", color: "#fff" }}
								>
									{item}
								</Link>
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	);
};

export default Navbar;
