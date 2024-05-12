import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import ChatProvider from '../context/ChatProvider';
import Login from './Login';
import SignUp from './SignUp';
import MainPage from './main-page/MainPage';
import RouteProtector from './RouteProtector';

function App() {

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <RouteProtector />,
        children: [
          {
            path: '',
            element: <ChatProvider><MainPage /></ChatProvider>
          }
        ]
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  },
]);

export default router;
