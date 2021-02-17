import { navigate as reachNavigate, NavigateFn } from '@reach/router'
import React from 'react'

export function navigateWithCtrlSensitivity(
  path: string,
  e: React.MouseEvent<Element, MouseEvent>,
) {
  console.log(`nav event`, e)
  if (e.ctrlKey) {
    // https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window
    const tab = window.open(window.location.origin + path)
    tab?.focus()
    return
  }

  void reachNavigate(path)
}

export { reachNavigate }
