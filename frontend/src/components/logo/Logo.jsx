import { Link } from 'react-router-dom';
import {Link as MuiLink, Button} from '@mui/material';
import { SiteMarkIcon } from './components';

export const Logo = (props) => (
	<Button aria-label="Main page button" variant="string" component={Link} to="/" {...props}>
		<SiteMarkIcon />
	</Button>
);
