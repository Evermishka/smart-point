import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { DrawerMenu } from '../../components';
import { Navigation } from './components/navigation/Navigation';

export const Admin = () => {
	const [currentItem, setCurrentItem] = useState(0);

	const handleCurrentItemChange = (itemId) => {
		setCurrentItem(itemId);
	};

	return (	<Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
		<Grid
			container
			spacing={2}
			direction={{ xs: 'column', md: 'row' }}
			sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-start' }}
		>
			<Grid
				size={2}
				sx={{
					display: { xs: 'none', md: 'flex' },
					gap: 1,
				}}
			>
				<Navigation currentItem={currentItem} handleCurrentItemChange={handleCurrentItemChange} />
			</Grid>
			<Grid
				size={12}
				sx={{
					display: { xs: 'flex', md: 'none' }
				}}
			>
				<DrawerMenu openButtonText="Навигация">
					{(closeDrawer) => <Navigation closeDrawer={closeDrawer} currentItem={currentItem} handleCurrentItemChange={handleCurrentItemChange} />}
					<Navigation />
				</DrawerMenu>
			</Grid>
			<Grid
				size={{ xs: 12, md: 10 }}
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
	</Box>)


};
