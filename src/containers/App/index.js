import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../components/home'
import List from '../../components/list'

const AppComponent = (props) => {


  return (

    <Fragment>
    <Switch>
    <Route exact path={'/'} component={Home} />
    <Route exact path={'/list'} component={List} />
    </Switch>
    </Fragment>
  );
}

export default AppComponent;
