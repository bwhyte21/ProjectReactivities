import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../models/activity';
import { store } from '../stores/store';

// Add delay to the application for the sake of demonstrating a loading animation.
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// For every request, this base url will be used for the sake of time.
axios.defaults.baseURL = 'https://localhost:5001/api';

// Call axios interceptor to demo loading.
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    // "!" at the end, in case we don't get an error response.
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if(typeof data === 'string'){
          toast.error(data);
        }
        // Redirect user to 'Not Found' page.
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }
        if (data.errors) {
          // Validation error response from api.
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          // Flatten the array to get the list of strings.
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error('401: Unauthorized');
        break;
      case 404:
        // Send user to "not found" page, even with one not physically present.
        history.push('/not-found');
        break;
      case 500:
        // Use recently added 'commonStore' for Server Error page.
        store.commonStore.setServerError(data);
        // Send user to Server Error route.
        history.push('/server-error');
        break;
    }
    return Promise.reject(error);
  },
);

// Capture the data from the api.
// Add <T> for a generic type to responseBody for type-safety.
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// Store the common requests to Axios in an obj.
// Add <T> for a generic type to the requests for type-safety.
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

// Store requests for Activities.
const Activities = {
  list: () => requests.get<Activity[]>('/Activities'), // baseUrl + requestedUrl
  details: (id: string) => requests.get<Activity>(`/Activities/${id}`),
  create: (activity: Activity) => axios.post<void>('/Activities', activity),
  update: (activity: Activity) => axios.put<void>(`/Activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/Activities/${id}`),
};

// Agent to return data to application.
const agent = {
  Activities,
};

export default agent;
