import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('An error ocurred while getting the data.', error);
    alert('An unexpected error ocurred while getting the data.');
  }

  return Promise.reject(error);
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
// async function http<T>(path: string, config: RequestInit): Promise<T> {
//   const request = new Request(path, config);
//   const response = await fetch(request);

//   if (!response.ok) {
//     throw new Error('Could not get the data. ' + response.statusText);
//   }

//   return response.json().catch((error) => {
//     throw new Error(
//       'An error ocurred while trying to get the response. ' + error.toString()
//     );
//   });
// }

// export async function get<T>(path: string, config?: RequestInit): Promise<T> {
//   const init = { method: 'get', ...config };
//   return http<T>(path, init);
// }
