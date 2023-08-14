import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Projects from './components/projects/projects';
import Profile from './components/profile/profile';
import NewProject from './components/new-project/new-project';
import UpdateProject from './components/update-project/update-project';
import SigninResult from './components/signin-result/signin-result';
import session from './session';
import config from './config';
import './App.css';

function App() {
  if (!session.isAuthenticated)
    window.location.href = config.IDS_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path="signin-result" element={<SigninResult />} />
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path="new" element={<NewProject />} />
            <Route path="update/:id" element={<UpdateProject />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
