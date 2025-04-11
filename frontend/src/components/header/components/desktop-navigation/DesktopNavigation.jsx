import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import {
	ShoppingCart as ShoppingCartIcon,
	Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { checkAccess } from '../../../../utils';
import { selectUserRole } from '../../../../selectors';
import { ROLE, ROUTE } from '../../../../constants';

export const DesktopNavigation = ({ handleLogoutButtonClick, isLoading }) => {
	const roleId = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<>
			{roleId === ROLE.GUEST ? (
				<>
					{' '}
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
			) : (
				<>
					{isAdmin && (
						<IconButton
							aria-label="Admin button"
							component={RouterLink}
							to={ROUTE.ADMIN}
						>
							<DashboardIcon />
						</IconButton>
					)}
					<IconButton
						aria-label="Cart button"
						component={RouterLink}
						to={ROUTE.CART}
					>
						<ShoppingCartIcon />
					</IconButton>
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
