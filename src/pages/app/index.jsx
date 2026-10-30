import './index.scss';
import { Link } from 'react-router-dom';


export default function App() {
  return (
    <div className="App">
      <h1>App</h1>
      

      <Link to='/contato'>
      <p>Ir para contato</p>
      </Link>

      
    </div>
  );
}


