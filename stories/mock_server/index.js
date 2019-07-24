import mock, { proxy } from 'xhr-mock';
import TagsRoutes from './routes/tags';
import SearchRoutes from './routes/search';

export default () => {
  mock.setup();
  // Set up routes that need to be mocked:
  TagsRoutes(mock);
  SearchRoutes(mock);

  // proxy unhandled requests to the real servers:
  mock.use(proxy);
};
