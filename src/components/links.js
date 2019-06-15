import React from "react"
import { Link } from "gatsby"

const RedirectLink = ({ link, linkText, componentStyle }) => {
  return (
    <>
      <Link className={componentStyle} to={link}>
        {linkText}
      </Link>
    </>
  )
}

export default RedirectLink
