import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Overview from './components/overview/overview';
import Projects from './components/projects/projects';
import Profile from './components/profile/profile';
import Settings from './components/settings/settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="projects" element={<Projects />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
