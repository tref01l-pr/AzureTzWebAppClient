import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainPage from './Components/MainPage.tsx';
import NotFound from './Components/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const Router = () => <RouterProvider router={router} />; 

export default Router;