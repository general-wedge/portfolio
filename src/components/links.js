import React from "react"
import { Link } from "gatsby"

/*
  TODO: Fix styles - must be name 'styles', will need to move components around
*/
const RedirectLink = ({ link, linkText, specificClass }) => {
  return (
    <div className={specificClass}>
      <Link to={link}>{linkText}</Link>
    </div>
  )
}


export default RedirectLink
