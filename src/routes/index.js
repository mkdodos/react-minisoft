import { createBrowserRouter,Outlet } from "react-router-dom";
import Header from "../components/Header";
import Notebook from "../pages/NoteBook";
import Spending from '../pages/Spending'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

// children 內的元件會呈現在 <Outlet /> 的位置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/spending',
        element: <Spending />,
      },
      {
        path: '/notebook',
        element: <Notebook />,
      },
    ],
  },
]);

export default router;
