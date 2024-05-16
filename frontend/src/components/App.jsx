import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import ChatProvider from '../context/ChatProvider';
import Login from './Login';
import SignUp from './SignUp';
import MainPage from './main-page/MainPage';
import RouteProtector from './RouteProtector';
import PersistLogin from './PersistLogin';
import ChatList from './main-page/ChatList';
import UserList from './main-page/UsersList';
import CreateGroupChat from './group-chat/CreateGroupChat';

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
        element: <PersistLogin />,
        children: [
          {
            path: '',
            element: <RouteProtector />,
            children: [
              {
                path: '',
                element: <ChatProvider><MainPage /></ChatProvider>,
                children: [
                  {
                    path: '/chats',
                    element: <ChatList />
                  },
                  {
                    path:'/addChat',
                    element: <UserList />
                  },
                  {
                    path: '/createGroup',
                    element: <CreateGroupChat />
                  },
                  {
                    path: '/addParticipant',
                    element: <UserList />
                  }
                ]
              }
            ]
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
