import { Box } from '@mui/system';
import { LinearProgress } from '@mui/material';

export const Loader = () => (
	<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
		<LinearProgress sx={{ flexGrow: 1 }} />
	</Box>
);
