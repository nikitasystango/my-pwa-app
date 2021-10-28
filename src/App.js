import React, { useEffect, Suspense } from 'react';
import { Router } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import browserHistory from './utils/history'
import { Provider } from 'react-redux'
import { toast } from 'react-toastify'
import configureStore from './store'
import App from 'containers/App'
import Loader from 'components/LoadingSpinner'
import 'rc-tree-select/assets/index.css'

import 'semantic-ui-css/components/reset.min.css'
import 'semantic-ui-css/components/site.min.css'
import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/dimmer.min.css'
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/modal.min.css'
import 'semantic-ui-css/components/transition.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.scss'

export default function MainApp() {


  const reloadAppHandler = (waitingWorker) => {
    console.log('step2');
    waitingWorker
      && waitingWorker.postMessage
      && waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    // setNewVersionAvailable(false);
    // location.reload();
  };
  let refreshing= false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('event called ', refreshing);
    if (refreshing) return;
    refreshing = true;
      console.log('test issue case');
      window.location.reload();
  });

  const onServiceWorkerUpdate = (registration) => {
    console.log('new version found 1234');
    // setWaitingWorker(registration.waiting);
    // setNewVersionAvailable(true);
    reloadAppHandler(registration.waiting);
  };


  useEffect(() => {
    console.log('page update');
    if (process.env.NODE_ENV === 'production') {
      serviceWorkerRegistration.register({ onUpdate: onServiceWorkerUpdate });
    }
    // eslint-disable-next-line
  }, []);

  setTimeout(() => {
    // console.log('0101010101')
    delay(1);
  }, 10000);

  function delay(count) {
    // console.log('7777777777777')
    if ('serviceWorker' in navigator) {
      console.log('step1');
      navigator.serviceWorker.getRegistrations().then((registrationsArray) => {
        if (registrationsArray && registrationsArray[0] && registrationsArray[0].waiting) {
          // console.log('step2')
          onServiceWorkerUpdate(registrationsArray[0]);
        } else if (registrationsArray && registrationsArray[0]) {
          registrationsArray[0]
            .update()
            .then((registration) => {
              registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                  // console.log('step4')
                  return;
                }
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed') {
                    // console.log('step5')
                    if (navigator.serviceWorker.controller) {
                      onServiceWorkerUpdate(registration);
                    }
                  }
                };
              };
            })
            .catch((error) => {
              console.log(`Service worker update failed${error}`);
            });
        }
      });
      setTimeout(() => {
        delay(count + 1);
      }, 10000);
    }
  }
  const { store } = configureStore()
  toast.configure()
  return (
    <Provider store={store}>
    <Suspense fallback={<Loader/>}>
      <Router history={browserHistory} >
        <App />
      </Router>
    </Suspense>
    </Provider>
  );
}
