import React from "react";



export function Button(props) {
  return(
    <button onClick={props.onClick} type='button' className={props.className}>{props.name}</button>
  )
}
export function Characteristics(props) {
  return(
    <div className={props.className}>
      <span>{props.name}</span>
      <span>{props.desc}</span>
    </div>
  )
}