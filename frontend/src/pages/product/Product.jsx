import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { Loader } from '../../components';
import { Content, Gallery } from './components';
import { useRequestServer } from '../../hooks';
import { API_ROUTE } from '../../constants';

export const Product = () => {
	const [product, setProduct] = useState(null);
	const { isLoading, setIsLoading, request } = useRequestServer();
	const params = useParams();

	useEffect(() => {
		request(`${API_ROUTE.PRODUCTS}/${params.id}`, 'GET')
			.then((product) => {
				setProduct(product.data);
			})
			.finally(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id]);

	if (isLoading) return <Loader />;

	if (!product) return <></>;

	const { title, images } = product;

	return (
		<Box>
			<Grid container spacing={4} sx={{ display: 'flex', flexGrow: 1 }}>
				<Grid
					size={5}
					sx={{
						display: { xs: 'none', md: 'flex' },
						gap: 1,
					}}
				>
					<Grid item xs={12} md={6}>
						<div
							style={{
								position: 'relative',
								width: '100%',
								height: '100%',
							}}
						>
							<Gallery images={images} title={title} />
						</div>
					</Grid>
				</Grid>
				<Grid
					size={12}
					sx={{
						display: { xs: 'flex', md: 'none' },
						justifyContent: 'center',
						gap: 1,
					}}
				>
					<Gallery images={images} title={title} />
				</Grid>
				<Grid
					size={{ xs: 12, md: 7 }}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 5,
						flexGrow: 1,
					}}
				>
					<Content product={product} />
				</Grid>
			</Grid>
		</Box>
	);
};
