import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, MenuItem, TextField } from '@mui/material';
import { FormContainer, FormSubmitButton } from '../../../../components';
import { addProductFormSchema } from './components';
import { useRequestServer } from '../../../../hooks';
import { API_ROUTE } from '../../../../constants';
import { useEffect, useState } from 'react';
import { transformProduct } from './utils';

export const AdminProductForm = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(addProductFormSchema),
	});
	const [categories, setCategories] = useState([]);

	const { isLoading, setIsLoading, request } = useRequestServer();

	useEffect(() => {
		request(`${API_ROUTE.CATEGORIES}`, 'GET')
			.then((categories) => {
				setCategories(categories.data);
			})
			.finally(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submitHandler = (product) => {
		request(API_ROUTE.PRODUCTS, 'POST', transformProduct(product))
			.then(({ data }) => {
				console.log('data', data);
				reset();
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<FormContainer title={'Добавить продукт'}>
			<Box
				component="form"
				onSubmit={handleSubmit(submitHandler)}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				<Controller
					name="title"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							placeholder="Название"
							variant="outlined"
							fullWidth
							error={!!errors.title}
							helperText={errors?.title?.message}
							color={errors.title ? 'error' : 'primary'}
							onChange={(event) => {
								field.onChange(event);
							}}
						/>
					)}
				/>
				<Controller
					name="category"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							select							
							variant="outlined"
							error={!!errors.category}
							helperText={
								errors?.category?.message || 'Выберите категорию'
							}
							onChange={(event) => {
								field.onChange(event);
							}}
						>
							{categories.map((category) => (
								<MenuItem key={category.id} value={category.id}>
									{category.title}
								</MenuItem>
							))}
						</TextField>
					)}
				/>
				<Controller
					name="imagePreview"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							placeholder="Главное изображение"
							variant="outlined"
							error={!!errors.imagePreview}
							helperText={errors?.imagePreview?.message}
							onChange={(event) => {
								field.onChange(event);
							}}
						/>
					)}
				/>
				<Controller
					name="images"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							placeholder="Список изображений (разделенные запятой)"
							variant="outlined"
							multiline
							rows={4}
							size="custom"
							sx={{ height: '90px' }}
							error={!!errors.images}
							helperText={errors?.images?.message}
							onChange={(event) => {
								field.onChange(event);
							}}
						/>
					)}
				/>
				<Controller
					name="description"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							placeholder="Описание"
							variant="outlined"
							multiline
							rows={8}
							size="custom"
							sx={{ height: '180px' }}
							error={!!errors.description}
							helperText={errors?.description?.message}
							onChange={(event) => {
								field.onChange(event);
							}}
						/>
					)}
				/>
				<Controller
					name="price"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							placeholder="Цена"
							variant="outlined"
							error={!!errors.price}
							helperText={errors?.price?.message}
							onChange={(event) => {
								field.onChange(event);
							}}
						/>
					)}
				/>
				<Controller
					name="quantity"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							placeholder="Количество"
							variant="outlined"
							error={!!errors.quantity}
							helperText={errors?.quantity?.message}
							onChange={(event) => {
								field.onChange(event);
							}}
						/>
					)}
				/>
				<FormSubmitButton
					isLoading={isLoading}
					buttonText={'Добавить продукт'}
				></FormSubmitButton>
			</Box>
		</FormContainer>
	);
};
