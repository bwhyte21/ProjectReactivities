import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // New: We need to "provide" the new store context to the app.
  <StoreContext.Provider value={store}>
    {/* Just in case any 3rd party plugins we add, that does not abide by React.StrictMode, trigger this. */}
    {/* <React.StrictMode> */}
    {/* Make React Router available to the application */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
