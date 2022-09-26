import React from 'react';
import "../../styles/marker.css";

export default function Marker({type, text}) {
  return (
    <button className={"marker " + type}>{type}</button>
  )
}
