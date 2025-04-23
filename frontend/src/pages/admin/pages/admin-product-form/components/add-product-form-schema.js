import * as yup from 'yup';

export const addProductFormSchema = yup.object().shape({
	title: yup.string().required('Заполните логин'),
	category: yup.string().required('Выберите категорию'),
    imagePreview: yup.string().required('Заполните поле загрузки изображения'),
    images: yup.string().required('Заполните поле загрузки изображений'),
	description: yup.string().required('Заполните описание товара'),
    price: yup.number().required('Укажите цену товара'),
    quantity: yup.number().required('Укажите количество товара')
});
