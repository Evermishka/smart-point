import { Routes, Route } from 'react-router-dom';

export const App = () => {
	return (
		<>
			<div className="header">Header</div>
			<div className="page">
				<Routes>
					<Route path="/" element={<div>Main Page</div>} />
					<Route path="/:id" element={<div>Product</div>} />
					<Route path="/login" element={<div>Authorization</div>} />
					<Route path="/register" element={<div>Registration</div>} />
					<Route path="/cart" element={<div>Cart</div>} />
					<Route path="/admin" element={<div>Admin</div>}>
						<Route path="categories" element={<div>Categories edit</div>} />
						<Route
							path="categories/:id"
							element={<div>Category admin</div>}
						/>
						<Route
							path="categories/:id/edit"
							element={<div>Category edit</div>}
						/>
						<Route path="products" element={<div>Products admin</div>} />
						<Route path="products/:id" element={<div>Product add</div>} />
						<Route
							path="products/:id/edit"
							element={<div>Product edit</div>}
						/>
					</Route>
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</div>
			<div className="footer">Footer</div>
		</>
	);
};
