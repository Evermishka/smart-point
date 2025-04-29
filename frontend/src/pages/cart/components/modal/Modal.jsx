import { Box, Modal as MuiModal, Typography } from '@mui/material';

export const Modal = ({ open, handleCloseModal }) => (
	<MuiModal open={open} onClose={handleCloseModal}>
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				bgcolor: 'background.paper',
				borderRadius: '8px',
				boxShadow: 24,
				p: 4,
			}}
		>
			<Typography>Заказ успешно оформлен!</Typography>
		</Box>
	</MuiModal>
);
