import { Box, Typography } from '@mui/material';

export const Error = ({ error }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Typography variant="h2">Ошибка</Typography>
			<Typography>{error || ''}</Typography>
		</Box>
	);
}

