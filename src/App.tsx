import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout !== null ? route.layout : React.Fragment;
            return (
              <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
