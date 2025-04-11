import { Link as RouterLink } from 'react-router-dom';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import {
	ShoppingCart as ShoppingCartIcon,
	Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { ROUTE } from '../../../../constants';

export const DesktopNavigation = ({ handleLogoutButtonClick, isLoading }) => {
	return (
		<>
			<IconButton aria-label="Admin button" component={RouterLink} to={ROUTE.ADMIN}>
				<DashboardIcon />
			</IconButton>
			<IconButton aria-label="Cart button" component={RouterLink} to={ROUTE.CART}>
				<ShoppingCartIcon />
			</IconButton>
			<Divider orientation="vertical" variant="middle" flexItem />
			<Button
				color="primary"
				variant="text"
				size="small"
				loading={isLoading}
				loadingIndicator={
					<Typography color="white" size={16}>
						Один момент...
					</Typography>
				}
				onClick={() => handleLogoutButtonClick()}
			>
				Выйти
			</Button>
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
	);
};
