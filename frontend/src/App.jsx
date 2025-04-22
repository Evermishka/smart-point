import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import AppTheme from './theme/AppTheme';
import { Admin, Authorization, Main, Product, Registration } from './pages';
import { AdminCategories, AdminProducts } from './pages/admin/pages';
import { Footer, Header } from './components';
import { ROUTE } from './constants';

export const App = (props) => {
	return (
		<AppTheme {...props}>
			<Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
				<CssBaseline enableColorScheme />
				<Header />
				<Container
					maxWidth="lg"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexGrow: 1,
						mt: 11,
						py: 5,
					}}
				>
					<Routes>
						<Route path={ROUTE.MAIN} element={<Main />} />
						<Route path={`${ROUTE.MAIN}/:id`} element={<Product />} />
						<Route path={ROUTE.LOGIN} element={<Authorization />} />
						<Route path={ROUTE.REGISTER} element={<Registration />} />
						<Route path={ROUTE.CART} element={<div>Cart</div>} />
						<Route path={ROUTE.ADMIN} element={<Admin />}>
							<Route
								index
								element={<Navigate to={ROUTE.ADMIN_CATEGORIES} />}
							/>
							<Route
								path={ROUTE.ADMIN_CATEGORIES}
								element={<AdminCategories />}
							/>
							<Route
								path={ROUTE.ADMIN_PRODUCTS}
								element={<AdminProducts />}
							/>
							<Route
								path={`${ROUTE.ADMIN_PRODUCTS}/:id`}
								element={<div>Product add</div>}
							/>
							<Route
								path={`${ROUTE.ADMIN_PRODUCTS}/:id/edit`}
								element={<div>Product edit</div>}
							/>
						</Route>
						<Route path="*" element={<div>Error</div>} />
					</Routes>
				</Container>
				<Footer />
			</Box>
		</AppTheme>
	);
};
