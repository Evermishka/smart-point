import { useState } from 'react';
import { Box, Button, Drawer, IconButton } from '@mui/material';
import { CloseRounded as CloseRoundedIcon, Menu as MenuIcon } from '@mui/icons-material';

export const DrawerMenu = ({ children, openButtonText = '' }) => {
	const [open, setOpen] = useState(false);

	const openDrawer = () => {
		setOpen(true);
	};

	const closeDrawer = () => {
		setOpen(false);
	};

	return (
		<>
			{openButtonText ? (
				<Button onClick={openDrawer}>{openButtonText}</Button>
			) : (
				<IconButton aria-label="Menu button" onClick={openDrawer}>
					<MenuIcon />
				</IconButton>
			)}
			<Drawer
				anchor="top"
				open={open}
				onClose={closeDrawer}
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
						<IconButton onClick={closeDrawer}>
							<CloseRoundedIcon />
						</IconButton>
					</Box>
					{typeof children === 'function' ? children(closeDrawer): children}
				</Box>
			</Drawer>
		</>
	);
};
