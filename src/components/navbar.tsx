import {
	Drawer,
	Divider,
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	getCurrentUser,
	userLogout,
} from "../redux/features/authentication/authenticationSlice";
import NavButton from "./navButton";
import NavDrawerItem from "./navDrawerItem";

const Navbar: React.FC = () => {
	const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.authentication);
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const drawerWidth: number = 240;

	const logout = (): void => {
		dispatch(userLogout());
	};

	const handleDrawerToggle = (): void => {
		setMobileOpen((prevState) => !prevState);
	};

	const renderNavItems = (): JSX.Element => {
		return (
			<Box sx={{ display: { xs: "none", sm: "block" } }}>
				{authState.isLoggedIn ? (
					<>
						<NavButton
							linkTo={`users/${authState.userData?.uid}`}
							text="Dashboard"
						/>
						<Button onClick={logout} variant="outlined" sx={{ color: "#fff" }}>
							Logout
						</Button>
					</>
				) : (
					<>
						<NavButton linkTo={`login`} text="Login" />
						<NavButton linkTo={`signup`} text="signup" />
					</>
				)}
			</Box>
		);
	};

	const drawer = (): JSX.Element => {
		return (
			<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
				<Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
					<Typography variant="h6" sx={{ my: 2 }}>
						InguenityProject
					</Typography>
				</Link>
				<Divider />
				<List>
					{authState.isLoggedIn ? (
						<>
							<NavDrawerItem
								linkTo={`users/${authState.userData?.uid}`}
								text="Dashboard"
							/>
							<ListItem disablePadding onClick={logout}>
								<ListItemButton sx={{ textAlign: "center" }}>
									<ListItemText>Logout</ListItemText>
								</ListItemButton>
							</ListItem>
						</>
					) : (
						<>
							<NavDrawerItem linkTo="login" text="Login" />
							<NavDrawerItem linkTo="signup" text="Signup" />
						</>
					)}
				</List>
			</Box>
		);
	};

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				dispatch(getCurrentUser(user));
			}
		});
	}, [dispatch]);

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
					{renderNavItems()}
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
					{drawer()}
				</Drawer>
			</nav>
		</Box>
	);
};

export default Navbar;
