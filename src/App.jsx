import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProjectPage from './pages/custom-general/custom-master/projects/projects'
import CreateProject from './pages/custom-general/custom-master/projects/create-project'
import ViewProjectDetails from './pages/custom-general/custom-master/projects/view-details'


function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ProjectPage />} />
          <Route path="/createProject"  element={<CreateProject />} />
          <Route path="/viewDetails/:projectId"  element={<ViewProjectDetails />} />


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
