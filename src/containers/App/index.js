import React, { Fragment, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../components/home'
import List from '../../components/list'
import history from '../../utils/history'

const AppComponent = (props) => {
  // useEffect(() => {
  //   history.listen((location, action) => {
  //     console.log('check for sw updates on page change');
  //     // check for sw updates on page change
  //     navigator.serviceWorker
  //       .getRegistrations()
  //       .then((regs) => regs.forEach((reg) => reg.update()))
  //   })
  //   // eslint-disable-next-line
  // }, [window.location.pathname])

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
