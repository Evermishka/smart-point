import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store';
import { StyledEngineProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>	
			<StyledEngineProvider injectFirst>
      			<App />
    		</StyledEngineProvider>	
		</Provider>
	</BrowserRouter>,
);
