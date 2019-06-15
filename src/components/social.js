import React from "react"
import { GithubImage, TwitterImage, LinkedInImage } from "./logos"
import { WorkLink, ResumeLink } from "./links"
import styles from "../styles/social.module.scss"

export const GithubWrapper = () => {
  return (
    <div className={styles.githubWrapper}>
      <GithubImage />
    </div>
  )
}

export const TwitterWrapper = () => {
  return (
    <div className={styles.twitterWrapper}>
      <TwitterImage />
    </div>
  )
}

export const LinkedInWrapper = () => {
  return (
    <div className={styles.linkedInWrapper}>
      <LinkedInImage />
    </div>
  )
}
