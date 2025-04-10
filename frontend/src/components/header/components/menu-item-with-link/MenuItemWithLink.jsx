import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, MenuItem } from '@mui/material';

export const MenuItemWithLink = ({ to, children }) => (
	<MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
		<MuiLink component={RouterLink} to={to} underline="none">
			{children}
		</MuiLink>
	</MenuItem>
);
