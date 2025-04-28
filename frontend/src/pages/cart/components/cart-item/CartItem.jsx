import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import {
	AddCircleOutline as AddIcon,
	Delete as DeleteIcon,
	RemoveCircleOutline as RemoveIcon,
} from '@mui/icons-material';
import { useRequestServer } from '../../../../hooks';
import { transformPrice } from '../../../../utils';

const StyledLink = styled(Link)({
	textDecoration: 'none',
	display: 'flex',
	flexGrow: 1,
});

export const CartItem = ({ product, quantity }) => {
	const { id, title, imagePreview, price } = product;

	const { isLoading, setIsLoading, request } = useRequestServer();

	const handleDeleteProductFromCart = async () => {};

	return (
		<StyledLink to={`/${id}`}>
			<Card
				variant="outlined"
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: { xs: 'center' },
					flexGrow: 1,
					flexDirection: { xs: 'column', sm: 'row' },
				}}
			>
				<Grid size={{ xs: 6, sm: 3 }} sx={{ display: 'flex' }}>
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
				</Grid>
				<Grid
					size={{ xs: 12, md: 9 }}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'flex-start',
						gap: 4,
						height: '100%',
					}}
				>
					<CardContent>
						<CardHeader title={title} />
					</CardContent>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: 2,
							width: '100%',
						}}
					>
						<CardHeader title={transformPrice(price)} />
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<IconButton
								aria-label="delete"
								onClick={handleDeleteProductFromCart}
								loading={isLoading}
							>
								{isLoading ? (
									<CircularProgress size={24} />
								) : (
									<RemoveIcon />
								)}
							</IconButton>
							<Typography>{quantity}</Typography>
							<IconButton
								aria-label="delete"
								onClick={handleDeleteProductFromCart}
								loading={isLoading}
							>
								{isLoading ? <CircularProgress size={24} /> : <AddIcon />}
							</IconButton>
						</Box>
						<IconButton
							aria-label="delete"
							onClick={handleDeleteProductFromCart}
							loading={isLoading}
						>
							{isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
						</IconButton>
					</Box>
				</Grid>
			</Card>
		</StyledLink>
	);
};
