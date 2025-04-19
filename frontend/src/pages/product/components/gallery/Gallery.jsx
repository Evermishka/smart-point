import { useState } from 'react';
import { Card, CardMedia, ImageList, ImageListItem } from '@mui/material';

export const Gallery = ({ images, title }) => {
	const [currentImage, setCurrentImage] = useState(images[0] || '');

	const handleImageListItemClick = (event) => {
		setCurrentImage(event.target.src);
	};

	return (
		<Card raised='true'>
			<CardMedia
				component="img"
				image={currentImage}
				alt={title}
				style={{ objectFit: 'contain' }}
			/>
			<ImageList gap={8} sx={{ display: 'flex', flexWrap: 'wrap'}}>
				{images.map((img, idx) => (
					<ImageListItem
						key={idx}
						onClick={handleImageListItemClick}
						sx={{ width: '100px' }}
					>
						<img
							src={img}
							alt={`${title}-${idx}`}
							loading="lazy"
							style={{ borderRadius: '8px', objectFit: 'contain' }}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Card>
	);
};
