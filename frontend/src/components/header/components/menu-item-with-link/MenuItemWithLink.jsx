import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export const MenuItemWithLink = ({ to, children }) => (
	<MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
		<MuiLink component={RouterLink} to={to} underline="none">
			{children}
		</MuiLink>
	</MenuItem>
);
