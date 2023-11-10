import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from 'layout/RootLayout';
import Home from 'pages/Home';
import Regist from 'pages/Regist';
import Detail from 'pages/Detail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="regist" element={<Regist />} />
      <Route path="info/:_id" element={<Detail />} />
    </Route>
  )
);

export default router;
