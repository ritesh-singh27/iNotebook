import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./components/About";
import Home from './components/home';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (

    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;