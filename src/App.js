
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { publicroutes } from './routes';

function App() {
  return (
    <div className="App">
      <Routes>
      {publicroutes.map((route,index) =>(
        <Route key={index} path={route.path} element={<route.component/>}/>
      ))}
      </Routes>
    </div>
  );
}

export default App;
