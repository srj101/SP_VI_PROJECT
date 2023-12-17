import 'antd/dist/reset.css';
import "./App.css";
import router from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import SerachProvider from './Context/SearchContext';
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <SerachProvider>
        <RouterProvider router={router}></RouterProvider>
      </SerachProvider>
    </StyledEngineProvider>

  );
}

export default App;
