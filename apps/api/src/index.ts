import { APP_NAME, API_BASE_PATH } from '@among/constants';

export const getApiInfo = () => ({
  name: APP_NAME,
  basePath: API_BASE_PATH,
  status: 'healthy',
});
