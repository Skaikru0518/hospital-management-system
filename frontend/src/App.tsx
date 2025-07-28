import { AuthProvider } from './context/auth-context';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors closeButton />
    </AuthProvider>
  );
};

export default App;
