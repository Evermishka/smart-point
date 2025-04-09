import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Logo } from '../../../logo/Logo';
import { MenuItemWithLink } from '../menu-item-with-link/MenuItemWithLink';

export const MobileNavigation = (handleLogoutButtonClick) => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<>
			<IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
				<MenuIcon />
			</IconButton>
			<Drawer
				anchor="top"
				open={open}
				onClose={toggleDrawer(false)}
				PaperProps={{
					sx: {
						top: 'var(--template-frame-height, 0px)',
					},
				}}
			>
				<Box sx={{ p: 2, backgroundColor: 'background.default' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<IconButton onClick={toggleDrawer(false)}>
							<CloseRoundedIcon />
						</IconButton>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Logo fullWidth />
					</Box>
					<Divider sx={{ my: 3 }} />
					<MenuItemWithLink to={'/admin'}>Панель администратора</MenuItemWithLink>
					<MenuItemWithLink to={'/cart'}>Корзина</MenuItemWithLink>
					<Divider sx={{ my: 3 }} />
					<MenuItem>
						<Button
							color="primary"
							variant="outlined"
							fullWidth
							onClick={() => handleLogoutButtonClick()}
						>
							Выйти
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							color="primary"
							variant="contained"
							fullWidth
							component={RouterLink}
							to="/login"
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
							to="/register"
						>
							Зарегистрироваться
						</Button>
					</MenuItem>
				</Box>
			</Drawer>
		</>
	);
};
