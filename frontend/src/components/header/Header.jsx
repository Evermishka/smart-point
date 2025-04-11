import { useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Container, Divider, Toolbar } from '@mui/material';
import ColorModeIconDropdown from '../../theme/ColorModeIconDropdown';
import { Logo } from '../logo/Logo';
import { DesktopNavigation, MobileNavigation } from './components';
import { useRequestServer } from '../../hooks';
import { API_ROUTE } from '../../constants';
import { logout } from '../../actions';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexShrink: 0,
	borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
	backdropFilter: 'blur(24px)',
	border: '1px solid',
	borderColor: (theme.vars || theme).palette.divider,
	backgroundColor: theme.vars
		? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
		: alpha(theme.palette.background.default, 0.4),
	boxShadow: (theme.vars || theme).shadows[1],
	padding: '8px 12px',
}));

export const Header = () => {
	const { isLoading, setIsLoading, request } = useRequestServer();
	const dispatch = useDispatch();

	const handleLogoutButtonClick = () => {
		request(API_ROUTE.LOGOUT, 'POST')
			.then(() => {
				dispatch(logout);
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<AppBar
			position="fixed"
			enableColorOnDark
			sx={{
				boxShadow: 0,
				bgcolor: 'transparent',
				backgroundImage: 'none',
				mt: 'calc(var(--template-frame-height, 0px) + 28px)',
			}}
		>
			<Container maxWidth="lg">
				<StyledToolbar variant="dense" disableGutters>
					<Box
						sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
					>
						<Logo />
					</Box>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							gap: 1,
							alignItems: 'center',
						}}
					>
						<DesktopNavigation
							handleLogoutButtonClick={handleLogoutButtonClick}
							isLoading={isLoading}
						/>
						<Divider orientation="vertical" variant="middle" flexItem />
						<ColorModeIconDropdown />
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
						<ColorModeIconDropdown size="medium" />
						<Divider orientation="vertical" variant="middle" flexItem />
						<MobileNavigation
							handleLogoutButtonClick={handleLogoutButtonClick}
							isLoading={isLoading}
						/>
					</Box>
				</StyledToolbar>
			</Container>
		</AppBar>
	);
};
