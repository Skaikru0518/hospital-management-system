import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Unauthorized() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
          <AlertTriangle className="h-8 w-8 text-black" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Access Denied
        </h1>

        <p className="mt-4 text-muted-foreground">
          You don't have permission to access this page.
        </p>

        <div className="mt-8 space-y-4 space-x-4">
          <Button
            variant={'destructive'}
            onClick={handleGoBack}
            className="hover:cursor-pointer hover:bg-red-300 hover:transition-colors duration-300"
          >
            Go Back
          </Button>
          <Button
            variant={'destructive'}
            onClick={handleGoHome}
            className="hover:cursor-pointer hover:bg-red-300 hover:transition-colors duration-300"
          >
            Return to Homepage
          </Button>
        </div>

        <div className="mt-8 bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please contact your system
            administrator or support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
