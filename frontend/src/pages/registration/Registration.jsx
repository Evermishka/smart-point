import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@mui/material';
import {
	FormContainer,
	FormFooter,
	FormServerErrorText,
	FormSubmitButton,
} from '../../components';
import { regFormSchema } from './components';
import { useRequestServer } from '../../hooks';
import { addToCartAsync, setCart, setUser } from '../../actions';
import { selectCart, selectUserRole } from '../../selectors';
import { API_ROUTE, ROLE, ROUTE } from '../../constants';

export const Registration = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState('');
	const { isLoading, setIsLoading, request } = useRequestServer();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const cartInStore = useSelector(selectCart);

	const submitHandler = ({ login, password }) => {
		request(API_ROUTE.REGISTER, 'POST', { login, password })
			.then(async ({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				const { id, login, roleId, cart } = user;

				dispatch(setUser({ id, login, roleId }));

				if (cartInStore.items.length) {
					await Promise.all(
						cartInStore.items.map((item) =>
							dispatch(
								addToCartAsync(
									{
										productId: item.product.id,
										quantity: item.quantity,
									},
									request,
								),
							),
						),
					);
				} else {
					dispatch(setCart(cart));
				}
				reset();
			})
			.finally(() => setIsLoading(false));
	};

	if (roleId !== ROLE.GUEST) {
		return <Navigate to={ROUTE.MAIN} />;
	}

	return (
		<FormContainer title={'Регистрация'} width={'450px'}>
			<Box
				component="form"
				onSubmit={handleSubmit(submitHandler)}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				<Controller
					name="login"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							placeholder="Логин"
							variant="outlined"
							fullWidth
							error={!!errors.login}
							helperText={errors?.login?.message}
							color={errors.login ? 'error' : 'primary'}
							onChange={(event) => {
								field.onChange(event);
								setServerError('');
							}}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="password"
							placeholder="Пароль"
							variant="outlined"
							error={!!errors.password}
							helperText={errors?.password?.message}
							onChange={(event) => {
								field.onChange(event);
								setServerError('');
							}}
						/>
					)}
				/>
				<Controller
					name="passcheck"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="password"
							placeholder="Повтор пароля"
							variant="outlined"
							error={!!errors.passcheck}
							helperText={errors?.passcheck?.message}
							onChange={(event) => {
								field.onChange(event);
								setServerError('');
							}}
						/>
					)}
				/>
				<FormSubmitButton
					isLoading={isLoading}
					buttonText={'Зарегистрироваться'}
				></FormSubmitButton>
			</Box>
			{serverError && <FormServerErrorText serverError={serverError} />}
			<FormFooter
				text={'Уже есть аккаунт? '}
				linkText={'Войти'}
				link={ROUTE.LOGIN}
			/>
		</FormContainer>
	);
};
