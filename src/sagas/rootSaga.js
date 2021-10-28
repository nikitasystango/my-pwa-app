import { all } from 'redux-saga/effects'
import authSagas from './authSagas'
import forgotPasswordSagas from './forgotPasswordSagas'
import flightAvailabilitySagas from './flightAvailabilitySagas'
import searchPanelSagas from './searchPanelSagas'
import dashboardSagas from './dashboardSagas'
import commonSags from './commonSagas'
import blogsSagas from './blogsSagas'
import blogDetailsSagas from './blogDetailsSagas'
import MapViewSagas from './mapViewSagas'
import LayoutSagas from './layoutSagas'
import Pages from './pagesSagas'
import faqSagas from './helpCenterSaga'

export default function* rootSaga() {
  yield all([
    authSagas(),
    forgotPasswordSagas(),
    flightAvailabilitySagas(),
    searchPanelSagas(),
    dashboardSagas(),
    commonSags(),
    blogsSagas(),
    blogDetailsSagas(),
    MapViewSagas(),
    LayoutSagas(),
    Pages(),
    faqSagas()
  ])
}
