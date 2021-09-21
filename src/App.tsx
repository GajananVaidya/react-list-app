import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import CompanyList from './components/CompanyList/CompanyList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link to={"/companies"} className="navbar-brand">
                List
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div>
          <Switch>
            <Route exact path={["/", "/companies"]} component={CompanyList} />
          </Switch>
      </div>
    </div>
  );
}

export default App;
