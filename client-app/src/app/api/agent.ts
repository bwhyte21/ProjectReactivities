import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

// Add delay to the application for the sake of demonstrating a loading animation.
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// For every request, this base url will be used for the sake of time.
axios.defaults.baseURL = 'https://localhost:5001/api';

// Call axios interceptor to demo loading.
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

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
