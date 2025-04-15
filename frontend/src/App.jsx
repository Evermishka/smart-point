import { Routes, Route, Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import AppTheme from './theme/AppTheme';
import { Authorization, Main, Registration } from './pages';
import { Footer, Header } from './components';
import { ROUTE } from './constants';

export const App = (props) => {
	return (
		<AppTheme {...props}>
			<Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
				<CssBaseline enableColorScheme />
				<Header />
				<Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, mt: 11, py: 5 }}>
					<Routes>
						<Route path={ROUTE.MAIN} element={<Main />} />
						<Route path={`${ROUTE.MAIN}/:id`} element={<div>Product</div>} />
						<Route path={ROUTE.LOGIN} element={<Authorization />} />
						<Route path={ROUTE.REGISTER} element={<Registration />} />
						<Route path={ROUTE.CART} element={<div>Cart</div>} />
						<Route path={ROUTE.ADMIN} element={<div>Admin<Outlet/></div>}>
							<Route
								path={ROUTE.ADMIN_CATEGORIES}
								element={<div>Categories edit</div>}
							/>
							<Route
								path={`${ROUTE.ADMIN_CATEGORIES}/:id`}
								element={<div>Category add</div>}
							/>
							<Route
								path={`${ROUTE.ADMIN_CATEGORIES}/:id/edit`}
								element={<div>Category edit</div>}
							/>
							<Route path={ROUTE.ADMIN_PRODUCTS} element={<div>Products admin</div>} />
							<Route path={`${ROUTE.ADMIN_PRODUCTS}/:id`} element={<div>Product add</div>} />
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
