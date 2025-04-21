import { List, Stack } from '@mui/material';
import { NavigationItem } from '../navigation-item/NavigationItem';
import { ADMIN_NAVIGATION } from '../../../../constants';

export const Navigation = ({ closeDrawer, currentItem, handleCurrentItemChange }) => (
	<Stack sx={{ justifyContent: 'space-between' }}>
		<List sx={{ px: 0 }}>
			{ADMIN_NAVIGATION.map((item) => (
				<NavigationItem
					id={item.id}
					title={item.title}
					currentItem={currentItem}
					handleCurrentItemChange={handleCurrentItemChange}
					route={item.route}
					onClick={() => closeDrawer()}
				/>
			))}
		</List>
	</Stack>
);
