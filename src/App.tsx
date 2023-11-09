import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Layout from './Components/Layout';
import {EPagesPath} from './Types'
import './Styles/App.css';

const Home = React.lazy(() => import('./Pages'));
const EditedPage = React.lazy(() => import('./Pages/EditedCurrencies'));

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', position: 'fixed', height: '50%', width: '100%', bottom: 0, fontSize: '22px' }}><span style={{fontWeight:'bold'}}>{'404 '}</span>This page could not be found</div>
    );
};


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={EPagesPath.home} element={<Layout component={Home}/>}/>
          <Route path={EPagesPath.edited} element={<Layout component={EditedPage}/>}/>
          <Route element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
