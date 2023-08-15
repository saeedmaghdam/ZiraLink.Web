import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Projects from "./components/projects/projects";
import Profile from "./components/profile/profile";
import NewProject from "./components/new-project/new-project";
import UpdateProject from "./components/update-project/update-project";
import SigninResult from "./components/signin-result/signin-result";
import { ToastContainer } from "react-toastify";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="profile" element={<Profile />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
