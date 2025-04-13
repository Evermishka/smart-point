import { useCallback, useState } from 'react';

export const useRequestServer = () => {
	const [isLoading, setIsLoading] = useState(false);

	const request = useCallback((url, method, data) => {
		setIsLoading(true);

		return fetch(url, {
			headers: {
				'content-type': 'application/json',
			},
			method: method || 'GET',
			body: data ? JSON.stringify(data) : undefined,
		})
			.then((res) => res.json());
	}, []);

	return { isLoading, setIsLoading, request };
};
