import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const DesktopNavigation = (handleLogoutButtonClick) => {
	return (
		<>
			<IconButton aria-label="Admin button" component={RouterLink} to="/admin">
				<DashboardIcon />
			</IconButton>
			<IconButton aria-label="Cart button" component={RouterLink} to="/cart">
				<ShoppingCartIcon />
			</IconButton>
			<Divider orientation="vertical" variant="middle" flexItem />
			<Button
				color="primary"
				variant="text"
				size="small"
				onClick={() => handleLogoutButtonClick()}
			>
				Выйти
			</Button>
			<Button
				color="primary"
				variant="text"
				size="small"
				component={RouterLink}
				to="/login"
			>
				Войти
			</Button>
			<Button
				color="primary"
				variant="contained"
				size="small"
				component={RouterLink}
				to="/register"
			>
				Зарегистрироваться
			</Button>
		</>
	);
};
