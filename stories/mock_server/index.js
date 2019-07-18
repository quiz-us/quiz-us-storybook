import mock from 'xhr-mock';
import TagsRoutes from './routes/tags';
import SearchRoutes from './routes/search';

export default () => {
  mock.setup();
  TagsRoutes(mock);
  SearchRoutes(mock);
};
