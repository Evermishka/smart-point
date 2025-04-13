import { useState } from 'react';
import { Box, Button, Drawer, IconButton } from '@mui/material';
import { CloseRounded as CloseRoundedIcon, Menu as MenuIcon } from '@mui/icons-material';

export const DrawerMenu = ({ children, openButtonText = '' }) => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<>
			{openButtonText ? (
				<Button onClick={toggleDrawer(true)}>{openButtonText}</Button>
			) : (
				<IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
					<MenuIcon />
				</IconButton>
			)}
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
					{children}
				</Box>
			</Drawer>
		</>
	);
};
