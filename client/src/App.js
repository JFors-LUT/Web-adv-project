import React, { useEffect } from 'react';
//import './App.css'; //auto created css file not needed due to materialize packet
import '/node_modules/materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Routes, Route as ReactRoute } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Snippets from './components/Snippets';
import AddSnippet from './components/AddSnippet';
import SnippetDetails from './components/SnippetDetails';


//main function, called in index page. Hyperlinks with react router functionality
function App() {
  return (
    <Router>
      <div>
        <nav>
        <div class="nav-wrapper" >
          <ul class="left">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/snippets">Snips</Link>
            </li>
            <li>
              <Link to="/addsnippets">Add snip</Link>
            </li>
          </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/addsnippets" element={<AddSnippet />} />
          <Route path="/snippet/:snippetId" element={<SnippetDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;//App;
