import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, MenuItem, TextField } from '@mui/material';
import { FormContainer, FormSubmitButton } from '../../../../components';
import { addProductFormSchema } from './components';
import { useRequestServer } from '../../../../hooks';
import { getProduct, transformProduct } from './utils';
import { API_ROUTE } from '../../../../constants';

export const AdminProductForm = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(addProductFormSchema),
	});
	const [product, setProduct] = useState(getProduct());
	const [categories, setCategories] = useState([]);

	const { isLoading, setIsLoading, request } = useRequestServer();

	const params = useParams();

	useEffect(() => {
		request(`${API_ROUTE.CATEGORIES}`, 'GET')
			.then((categories) => {
				setCategories(categories.data);
			})
			.finally(() => setIsLoading(false));		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {		
		if (params.id) {
			request(`${API_ROUTE.PRODUCTS}/${params.id}`, 'GET')
				.then(({ data }) => {
					const updatedProduct = getProduct(data);
					setProduct(updatedProduct);
					reset(updatedProduct);
				})
				.finally(() => setIsLoading(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id]);

	const submitHandler = (product) => {
		if (product.id) {
			request(
				`${API_ROUTE.PRODUCTS}/${product.id}`,
				'PATCH',
				transformProduct(product),
			)
				.then(() => {
					alert('Продукт сохранён')
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			request(API_ROUTE.PRODUCTS, 'POST', transformProduct(product))
				.then(() => {
					alert('Продукт добавлен')
					reset();
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	return (
		<FormContainer title={product.id ? 'Редактировать продукт' : 'Добавить продукт'}>
			<Box
				component="form"
				onSubmit={handleSubmit(submitHandler)}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				<Controller
					name="title"
					control={control}
					defaultValue={product.title}
					render={({ field }) => (
						<TextField
							{...field}
							label="Название"
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
							label="Категория"
							variant="outlined"
							error={!!errors.category}
							helperText={errors?.category?.message}
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
					defaultValue={product.imagePreview}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label="Главное изображение"
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
					defaultValue={product.images.length > 0 ? product.images : ''}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label="Дополнительные изображения"
							placeholder="https://example.com/images_1.jpg, https://example.com/images_2.jpg, https://example.com/images_3.jpg"
							variant="outlined"
							multiline
							rows={4}
							size="custom"
							sx={{ height: '100px' }}
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
					defaultValue={product.description}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label="Описание"
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
					defaultValue={product.price}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label="Цена"
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
					defaultValue={product.quantity}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label="Количество"
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
					buttonText={product.id ? 'Сохранить продукт' : 'Добавить продукт'}
				></FormSubmitButton>
			</Box>
		</FormContainer>
	);
};
