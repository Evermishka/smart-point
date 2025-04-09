import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { SiteMarkIcon } from './components';

export const Logo = (props) => (
	<Button aria-label="Main page button" component={Link} to="/" {...props}>
		<SiteMarkIcon />
	</Button>
);
