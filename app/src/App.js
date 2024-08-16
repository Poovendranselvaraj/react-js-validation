import Register from './Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import Lounge from './components/Lounge';
import Editor from './components/Editor';
import Admin from './components/Admin';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
         {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="linkpage" element={<LinkPage />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="lounge" element={<Lounge />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;