import { List, Stack } from '@mui/material';
import { NavigationItem } from '../navigation-item/NavigationItem';
import { ADMIN_NAVIGATION } from '../../../../constants';
import { useState } from 'react';

export const Navigation = () => {
	const [currentItem, setCurrentItem] = useState(0);

	const handleCurrentItemChange = (itemId) => {
		setCurrentItem(itemId);
	};

	return (
		<Stack sx={{ justifyContent: 'space-between' }}>
			<List sx={{ px: 0 }}>
				{ADMIN_NAVIGATION.map((item) => (
					<NavigationItem
						id={item.id}
						title={item.title}
						currentItem={currentItem}
						handleCurrentItemChange={handleCurrentItemChange}
						route={item.route}
					/>
				))}
			</List>
		</Stack>
	);
};
