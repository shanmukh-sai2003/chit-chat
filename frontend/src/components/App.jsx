import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import Login from './Login';
import SignUp from './SignUp';

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
