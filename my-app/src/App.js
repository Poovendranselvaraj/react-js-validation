import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Public from "./components/Public";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/*protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App