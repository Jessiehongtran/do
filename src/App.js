import { Route } from 'react-router-dom';
import './App.css';
import UnDone from './tasks/undone/tasks';
import Done from './tasks/done/tasks';
import Nav from './nav/nav';
import Create from './tasks/create/create';

function App() {
  return (
    <div className="App">
      <Nav />
      <Route
        exact path="/"
        component={UnDone}
      />
      <Route
        path="/archive"
        component={Done}
      />
      <Route
        path="/create"
        component={Create}
      />
    </div>
  );
}

export default App;
