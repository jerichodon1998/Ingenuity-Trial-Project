import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface NavDrawerItemProps {
	linkTo: string;
	text: string;
}

const NavDrawerItem: React.FC<NavDrawerItemProps> = ({ linkTo, text }) => {
	return (
		<Link to={linkTo} style={{ textDecoration: "none", color: "#000" }}>
			<ListItem disablePadding>
				<ListItemButton sx={{ textAlign: "center" }}>
					<ListItemText>{text}</ListItemText>
				</ListItemButton>
			</ListItem>
		</Link>
	);
};

export default NavDrawerItem;
