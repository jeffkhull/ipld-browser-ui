import React from 'react'
export function LoadingSpinner(props: { opacity: number; transition: string }) {
  return (
    <div
      id="loading-spinner"
      className="lds-roller"
      style={{ zIndex: 100, opacity: props.opacity, transition: props.transition }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
