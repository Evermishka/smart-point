import { Button, Typography } from '@mui/material';

export const FormSubmitButton = ({ isLoading, buttonText }) => (
	<Button
		type="submit"
		fullWidth
		variant="contained"
		loading={isLoading}
		loadingIndicator={
			<Typography color="white" size={16}>
				Один момент...
			</Typography>
		}
	>
		{buttonText}
	</Button>
);
