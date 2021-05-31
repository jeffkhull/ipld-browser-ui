export * from '../EditorElement'

import ReactDOM from 'react-dom'
export const Portal = (props: { children: any }) => {
  return ReactDOM.createPortal(props.children, document.body)
}
