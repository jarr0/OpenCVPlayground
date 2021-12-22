import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Coding from "./pages/Coding";
import Snippets from "./pages/Snippets";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Snippets />
        </Route>
        <Route path="/coding">
          <Coding />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
