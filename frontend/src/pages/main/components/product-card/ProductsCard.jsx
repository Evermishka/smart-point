import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import { transformPrice } from '../../../../utils';

export const ProductCard = ({ product }) => {
	const { title, imagePreview, price } = product;

	return (
		<Grid size={{ xs: 6, sm: 4, md: 3 }} sx={{ display: 'flex' }}>
			<Card
				variant="outlined"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					flexGrow: 1,
				}}
			>
				<CardMedia
					component="img"
					image={imagePreview}
					alt={title}
					style={{
						objectFit: 'cover',
						width: '100%',
						height: 'auto',
					}}
				/>
				<CardHeader title={transformPrice(price)} />
				<CardContent
					sx={{
						flexGrow: 1,
					}}
				>
					<Typography
						variant="body1"
						gutterBottom
						sx={{ color: 'text.secondary' }}
					>
						{title}
					</Typography>
				</CardContent>
				<CardActions>
					<Button variant="contained" size="small">
						В корзину
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};
