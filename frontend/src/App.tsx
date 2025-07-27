import { AuthProvider } from './context/auth-context';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
