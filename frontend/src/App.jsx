import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import AppTheme from './theme/AppTheme';
import { Admin, Authorization, Cart, Main, Product, Registration } from './pages';
import { AdminCategories, AdminProductForm, AdminProducts } from './pages/admin/pages';
import { Error, Footer, Header, PrivateRoute } from './components';
import { ERROR, ROLE, ROUTE } from './constants';

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
						<Route path={ROUTE.CART} element={<Cart />} />
						<Route element={<PrivateRoute access={[ROLE.ADMIN]} />}>
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
									path={`${ROUTE.ADMIN_PRODUCTS}/add`}
									element={<AdminProductForm />}
								/>
								<Route
									path={`${ROUTE.ADMIN_PRODUCTS}/:id/edit`}
									element={<AdminProductForm />}
								/>
							</Route>
						</Route>
						{/* <Route path={ROUTE.ADMIN} element={<Admin />}>
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
								path={`${ROUTE.ADMIN_PRODUCTS}/add`}
								element={<AdminProductForm />}
							/>
							<Route
								path={`${ROUTE.ADMIN_PRODUCTS}/:id/edit`}
								element={<AdminProductForm />}
							/>
						</Route> */}
						<Route
							path="*"
							element={<Error error={ERROR.PAGE_NOT_EXIST} />}
						/>
					</Routes>
				</Container>
				<Footer />
			</Box>
		</AppTheme>
	);
};
