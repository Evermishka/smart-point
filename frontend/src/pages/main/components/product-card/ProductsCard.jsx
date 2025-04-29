import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import { CartButton } from '../../../../components';
import { transformPrice } from '../../../../utils';
import { ROUTE } from '../../../../constants';

const StyledLink = styled(Link)({
	textDecoration: 'none',
	display: 'flex',
});

export const ProductCard = ({ product }) => {
	const { id, title, imagePreview, price } = product;	

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
				<StyledLink to={`/${id}`}>
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
				</StyledLink>
				<StyledLink to={`/${id}`}>
					<CardHeader
						title={transformPrice(price)}
						sx={{ color: 'text.secondary' }}
					/>
				</StyledLink>
				<StyledLink to={`/${id}`}>
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
				</StyledLink>
				<CardActions>
					<CartButton product={product} />
				</CardActions>
			</Card>
		</Grid>
	);
};
