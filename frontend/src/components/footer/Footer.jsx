import * as React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { Logo } from '../logo/Logo';

export const Footer = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: { xs: 2, sm: 4 },
				py: { xs: 4, sm: 5 },
				textAlign: { sm: 'center', md: 'left' },
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					pt: { xs: 2, sm: 4 },
					width: '100%',
					borderTop: '1px solid',
					borderColor: 'divider',
				}}
			>
				<Box sx={{ width: { xs: '100%', sm: '60%' } }}>
					<Logo />
				</Box>
				<Box>
					<Link color="text.secondary" variant="body2" href="#">
						Privacy Policy
					</Link>
					<Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
						&nbsp;•&nbsp;
					</Typography>
					<Link color="text.secondary" variant="body2" href="#">
						Terms of Service
					</Link>
					<Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
						{'Copyright © '}
						&nbsp;
						{new Date().getFullYear()}
					</Typography>
				</Box>
			</Box>
		</Container>
	);
};
