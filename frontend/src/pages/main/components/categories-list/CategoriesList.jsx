import { List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';

export const CategoriesList = ({ categories }) => (
	<Stack sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
		<List sx={{ px: 0}}>
			{categories.map(({ id, title }) => (
				<ListItem key={id} disablePadding sx={{ display: 'block' }}>
					<ListItemButton >
						<ListItemText primary={title}/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	</Stack>
);
