import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, Link as MuiLink, Typography } from '@mui/material';

export const FormFooter = ({text, linkText, link}) => (
	<>
		<Divider>
			<Typography sx={{ color: 'text.secondary' }}>или</Typography>
		</Divider>
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Typography sx={{ textAlign: 'center' }}>
				{`${text}`}
				<MuiLink
					variant="body2"
					sx={{ alignSelf: 'center' }}
					component={RouterLink}
					to={link}
				>
					{linkText}
				</MuiLink>
			</Typography>
		</Box>
	</>
);
