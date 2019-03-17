import React from 'react'
import { GithubImage, TwitterImage, LinkedInImage } from './logos'
import { WorkLink, ResumeLink } from './links'
import styles from '../styles/contactme.module.scss'

const ContactMe = () => (
  <div className={styles.contactMeWrapper}>
    <GithubWrapper />
    <TwitterWrapper />
    <LinkedInWrapper />
    <ResumeLink linkText="RESUME"/>
    <WorkLink linkText="MY WORK" />
  </div>
)

const GithubWrapper = () => {
  return (
    <div className={styles.githubWrapper}>
      <GithubImage />
    </div>
  )
}

const TwitterWrapper = () => {
  return (
    <div className={styles.twitterWrapper}>
      <TwitterImage />
    </div>
  )
}

const LinkedInWrapper = () => {
  return (
    <div className={styles.linkedInWrapper}>
      <LinkedInImage />
    </div>
  )
}

export default ContactMe
