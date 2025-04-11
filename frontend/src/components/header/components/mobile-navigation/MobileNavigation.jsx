import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Box,
	Button,
	IconButton,
	Divider,
	Drawer,
	MenuItem,
	Typography,
} from '@mui/material';
import { Menu as MenuIcon, CloseRounded as CloseRoundedIcon } from '@mui/icons-material';
import { Logo } from '../../../logo/Logo';
import { MenuItemWithLink } from '../menu-item-with-link/MenuItemWithLink';
import { checkAccess } from '../../../../utils';
import { selectUserRole } from '../../../../selectors';
import { ROLE, ROUTE } from '../../../../constants';

export const MobileNavigation = ({ handleLogoutButtonClick, isLoading }) => {
	const [open, setOpen] = useState(false);
	const roleId = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

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
										<Typography size={16}>
											Один момент...
										</Typography>
									}
									onClick={() => handleLogoutButtonClick()}
								>
									Выйти
								</Button>
							</MenuItem>
						</>
					)}
				</Box>
			</Drawer>
		</>
	);
};
