import logo from './logo.svg';
import './App.css';
import Sidebar from './componant/Sidebar';
import Destinations from './screens/Destinations';

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <Destinations></Destinations>

    </div>
  );
}

export default App;
