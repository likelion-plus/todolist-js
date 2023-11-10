import router from '@/routes';
import 'styles/App.css';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
