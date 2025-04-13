import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Box,
	Button,
	Divider,
	MenuItem,
	Typography,
} from '@mui/material';
import { Logo } from '../../../logo/Logo';
import { MenuItemWithLink } from '../menu-item-with-link/MenuItemWithLink';
import { checkAccess } from '../../../../utils';
import { selectUserRole } from '../../../../selectors';
import { ROLE, ROUTE } from '../../../../constants';
import { DrawerMenu } from '../../../drawer-menu/DrawerMenu';

export const MobileNavigation = ({ handleLogoutButtonClick, isLoading }) => {
	const roleId = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<DrawerMenu>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Logo fullWidth />
			</Box>
			<Divider sx={{ my: 3 }} />
			{roleId === ROLE.GUEST ? (
				<>
					<MenuItem>
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
					<MenuItem>
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
						<MenuItemWithLink to={ROUTE.ADMIN}>
							Панель администратора
						</MenuItemWithLink>
					)}
					<MenuItemWithLink to={ROUTE.CART}>Корзина</MenuItemWithLink>
					<Divider sx={{ my: 3 }} />
					<MenuItem>
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
		</DrawerMenu>
	);
};
