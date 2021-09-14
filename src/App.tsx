import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// query
import { QueryClientProvider, QueryClient } from 'react-query';

// components
import Navbar from './components/navbar/Navbar';

// pages
import Home from './pages/home/Home';
import NotFound from './pages/notfound/NotFound';
import CreateTodo from './pages/create-todo/CreateTodo';

const queryClient = new QueryClient();
const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create-todo">
          <CreateTodo />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
