import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { DrawerMenu } from '../../components';
import { Navigation } from './components/navigation/Navigation';

export const Admin = () => (
	<Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
		<Grid
			container
			spacing={2}
			sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-start' }}
		>
			<Grid
				size={3}
				sx={{
					display: { xs: 'none', md: 'flex' },
					gap: 1,
				}}
			>
				<Navigation />
			</Grid>
			<Grid
				size={12}
				sx={{
					display: { xs: 'flex', md: 'none' },
					justifyContent: 'space-between',
					gap: 1,
				}}
			>
				<DrawerMenu openButtonText="Навигация">
					<Navigation />
				</DrawerMenu>
			</Grid>
			<Grid
				size={{ xs: 12, md: 9 }}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 5,
					flexGrow: 1,
				}}
			>
				<Outlet />
			</Grid>
		</Grid>
	</Box>
);
