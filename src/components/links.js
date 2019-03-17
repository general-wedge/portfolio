import React from "react"
import { Link } from "gatsby"
import styles from "../styles/links.module.scss"

export const ResumeLink = ({ linkText }) => (
  <div className={styles.resumeLinkWrapper}>
    <Link to="/resume">{linkText}</Link>
  </div>
)

export const WorkLink = ({ linkText }) => (
  <div className={styles.workLinkWrapper}>
    <Link to="/work">{linkText}</Link>
  </div>
)
