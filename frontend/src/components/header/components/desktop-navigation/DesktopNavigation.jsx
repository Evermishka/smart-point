import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Button, Divider, IconButton } from '@mui/material';
import {
	ShoppingCart as ShoppingCartIcon,
	Dashboard as DashboardIcon,
} from '@mui/icons-material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { calculateTotalProductCount, checkAccess } from '../../../../utils';
import { selectCart, selectUserRole } from '../../../../selectors';
import { ROLE, ROUTE } from '../../../../constants';

const CartBadge = styled(Badge)`
	& .${badgeClasses.badge} {
		top: -12px;
		right: -6px;
	}
`;

export const DesktopNavigation = ({ handleLogoutButtonClick, isLoading }) => {
	const roleId = useSelector(selectUserRole);

	const { items } = useSelector(selectCart);

	const totalCount = calculateTotalProductCount(items);

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<>
			{roleId === ROLE.GUEST && (
				<>
					<Button
						color="primary"
						variant="text"
						size="small"
						component={RouterLink}
						to={ROUTE.LOGIN}
					>
						Войти
					</Button>
					<Button
						color="primary"
						variant="contained"
						size="small"
						component={RouterLink}
						to={ROUTE.REGISTER}
					>
						Зарегистрироваться
					</Button>
				</>
			)}
			<IconButton aria-label="Cart button" component={RouterLink} to={ROUTE.CART}>
				<ShoppingCartIcon />
				<CartBadge badgeContent={totalCount} color="primary" overlap="circular" />
			</IconButton>
			{isAdmin && (
				<IconButton
					aria-label="Admin button"
					component={RouterLink}
					to={ROUTE.ADMIN}
				>
					<DashboardIcon />
				</IconButton>
			)}
			{roleId !== ROLE.GUEST && (
				<>
					<Divider orientation="vertical" variant="middle" flexItem />
					<Button
						color="primary"
						variant="text"
						size="small"
						loading={isLoading}
						onClick={() => handleLogoutButtonClick()}
					>
						Выйти
					</Button>
				</>
			)}
		</>
	);
};
