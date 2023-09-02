import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Projects from './components/projects/projects';
import Profile from './components/profile/profile';
import NewProject from './components/new-project/new-project';
import AppProjects from './components/app-projects/app-projects';
import NewAppProject from './components/new-app-project/new-app-project';
import UpdateProject from './components/update-project/update-project';
import SigninResult from './components/signin-result/signin-result';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Downloads from './components/downloads/downloads';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin-result" element={<SigninResult />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Projects />} />
            <Route path="projects">
              <Route index element={<Projects />} />
              <Route path="new" element={<NewProject />} />
              <Route path="update/:id" element={<UpdateProject />} />
            </Route>
            <Route path="app-projects">
              <Route index element={<AppProjects />} />
              <Route path="new" element={<NewAppProject />} />
              <Route path="update/:id" element={<UpdateProject />} />
            </Route> 
            <Route path="profile" element={<Profile />} />
            {/* <Route path="settings" element={<Settings />} /> */}
            <Route path="downloads" element={<Downloads />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
