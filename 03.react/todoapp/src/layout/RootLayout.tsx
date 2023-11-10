import { Outlet } from 'react-router-dom';
import Footer from '@/layout/Footer';

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
