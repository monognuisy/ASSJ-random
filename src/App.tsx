import styled from 'styled-components';
import Fetcher from './components/Fetcher';
import Keywords from './components/Keywords';
import Viewer from './components/Viewer';

import { Provider } from 'react-redux';
import { useStore } from './hooks/useStore';

function App() {
  const store = useStore();

  return (
    <Provider store={store}>
      <MainWrapper>
        <Viewer></Viewer>
        <Keywords></Keywords>
        <Fetcher></Fetcher>
      </MainWrapper>
    </Provider>
  );
}

const MainWrapper = styled.main`
  display: grid;

  width: 100vw;
  height: 100vh;
  margin: 0;

  grid-template-columns: 3fr 1fr;
`;

export default App;
