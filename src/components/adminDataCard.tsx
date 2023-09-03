import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from "@mui/material";

interface AdminDataCardProps {
	data: number;
	text: string;
	iconComponent: React.ReactNode;
}

const AdminDataCard: React.FC<AdminDataCardProps> = ({
	data,
	text,
	iconComponent,
}) => {
	return (
		<Grid item>
			<Card
				sx={{
					width: "auto",
					height: "auto",
					display: "flex",
					flexDirection: "column",
					padding: "10px 5px",
					border: "1px solid",
				}}
			>
				<CardHeader avatar={iconComponent} />
				<Divider />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{text}
					</Typography>
					<Typography variant="h6" color="text.secondary">
						{data}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default AdminDataCard;
