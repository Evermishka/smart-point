import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, MenuItem, Typography } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { Logo } from '../../../logo/Logo';
import { MenuItemWithLink } from '../menu-item-with-link/MenuItemWithLink';
import { calculateTotalProductCount, checkAccess } from '../../../../utils';
import { selectCart, selectUserRole } from '../../../../selectors';
import { ROLE, ROUTE } from '../../../../constants';

const CartBadge = styled(Badge)`
	& .${badgeClasses.badge} {
		top: 0;
		right: -18px;
	}
`;

export const MobileNavigation = ({ closeDrawer, handleLogoutButtonClick, isLoading }) => {
	const roleId = useSelector(selectUserRole);
	const { items } = useSelector(selectCart);

	const totalCount = calculateTotalProductCount(items);

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
				onClick={closeDrawer}
			>
				<Logo fullWidth />
			</Box>
			<Divider sx={{ my: 3 }} />
			<MenuItemWithLink to={ROUTE.CART} handleClick={closeDrawer}>
				Корзина
				<CartBadge badgeContent={totalCount} color="primary" overlap="circular" />
			</MenuItemWithLink>
			{roleId === ROLE.GUEST ? (
				<>
					<MenuItem onClick={closeDrawer}>
						<Button
							color="primary"
							variant="contained"
							fullWidth
							component={RouterLink}
							to={ROUTE.LOGIN}
						>
							Войти
						</Button>
					</MenuItem>
					<MenuItem onClick={closeDrawer}>
						<Button
							color="primary"
							variant="outlined"
							fullWidth
							component={RouterLink}
							to={ROUTE.REGISTER}
						>
							Зарегистрироваться
						</Button>
					</MenuItem>
				</>
			) : (
				<>
					{isAdmin && (
						<MenuItemWithLink to={ROUTE.ADMIN} handleClick={closeDrawer}>
							Панель администратора
						</MenuItemWithLink>
					)}
					<Divider sx={{ my: 3 }} />
					<MenuItem onClick={closeDrawer}>
						<Button
							color="primary"
							variant="outlined"
							fullWidth
							loading={isLoading}
							loadingIndicator={
								<Typography size={16}>Один момент...</Typography>
							}
							onClick={() => handleLogoutButtonClick()}
						>
							Выйти
						</Button>
					</MenuItem>
				</>
			)}
		</>
	);
};
