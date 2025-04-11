import { Typography } from '@mui/material';

export const FormServerErrorText = ({ serverError }) => (
	<Typography
		sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}
		color="error"
	>
		{serverError}
	</Typography>
);
