import { BOOKS } from './datas';
import Bookshelf from './ui/bookshelf';
import Layout from './components/Layout';
import UITitle from './components/UITitle';

function App() {
  return (
    <Layout>
      <UITitle title="Bookshelf" />
      <Bookshelf books={BOOKS} />
    </Layout>
  );
}

export default App;
