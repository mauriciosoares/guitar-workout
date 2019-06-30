import React from "react";
import { Route } from "react-router-dom";
import PopularList from "./pages/PopularList";
import StarredList from "./pages/PopularList";
import Workout from "./pages/Workout";
import * as paths from "./shared/paths";

export default function Router() {
  return (
    <>
      <Route exact path={paths.POPULAR} component={PopularList} />
      <Route exact path={paths.STARRED} component={StarredList} />
      <Route exact path={paths.WORKOUT} component={Workout} />
    </>
  );
}
