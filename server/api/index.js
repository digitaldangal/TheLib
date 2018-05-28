// Base routes to not specify each route multiple times
// Ex: router.get('example/v2/admin/books', ...) turns into router.get('/books', ...)
import publicApi from './public';
import customerApi from './customer';
import adminApi from './admin';

export default function api(server) {
  server.use('/api/v1/public', publicApi);
  server.use('/api/v1/customer', customerApi);
  server.use('/api/v1/admin', adminApi);
}
