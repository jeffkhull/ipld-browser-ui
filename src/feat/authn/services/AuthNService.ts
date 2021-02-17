import { reachNavigate } from '../../../common/util/navigate'

export class AuthNService {
  static SaveRouteState = () => {
    console.log(`saving path ${window.location.pathname}`)
    sessionStorage.setItem('route-state', window.location.pathname)
  }

  static NavigateToPreviousRoute = async () => {
    const state = sessionStorage.getItem('route-state')
    if (state == null) {
      await reachNavigate('/')
    } else {
      await reachNavigate(window.location.origin + state)
    }
  }
}
