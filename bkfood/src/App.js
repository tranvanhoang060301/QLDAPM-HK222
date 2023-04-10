import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import FavoritePlaces from './pages/favoritePlaces';
import Whatever from './pages/whatever';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/favoritePlaces' element={<FavoritePlaces />} />
          <Route path='/whatever' element={<Whatever />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
