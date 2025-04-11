import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, IconButton, Divider, Drawer, MenuItem } from '@mui/material';
import { Menu as MenuIcon, CloseRounded as CloseRoundedIcon } from '@mui/icons-material';
import { Logo } from '../../../logo/Logo';
import { MenuItemWithLink } from '../menu-item-with-link/MenuItemWithLink';
import { ROUTE } from '../../../../constants';

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
					<MenuItemWithLink to={ROUTE.ADMIN}>
						Панель администратора
					</MenuItemWithLink>
					<MenuItemWithLink to={ROUTE.CART}>Корзина</MenuItemWithLink>
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
				</Box>
			</Drawer>
		</>
	);
};
