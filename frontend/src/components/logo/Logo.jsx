import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { SiteMarkIcon } from './components';
import { ROUTE } from '../../constants';

export const Logo = (props) => (
	<Button
		aria-label="Main page button"
		variant="string"
		component={Link}
		to={ROUTE.MAIN}
		{...props}
	>
		<SiteMarkIcon />
	</Button>
);
