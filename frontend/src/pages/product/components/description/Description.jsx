import { useState } from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';

export const Description = ({ description }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const maxShortLength = 300;

	let shortDescription = '';
	if (description.length > maxShortLength) {
		shortDescription = `${description.substring(0, maxShortLength)}...`;
	}

	return (
		<Box>
			<Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
				{!isExpanded ? shortDescription : description}
			</Typography>
			{!isExpanded && description.length > maxShortLength && (
				<Button onClick={() => setIsExpanded(true)} variant='text' sx={{ mt: 2 }}>
					Показать больше
				</Button>
			)}
			<Collapse in={isExpanded} timeout="auto" unmountOnExit>
				<Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
					{description}
				</Typography>
			</Collapse>
		</Box>
	);
};
