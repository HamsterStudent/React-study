import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {/* url의 뒷부분에 관심이있다고 표기 */}
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
