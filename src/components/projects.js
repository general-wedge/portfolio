import React from 'react'
import {
  CSharpImage, JSImage, NodeImage, JavaImage, DotNetImage,
  ReactImage, AngularImage, GraphQLImage
} from './logos'
import RedirectLink from './links'
import styles from '../styles/projects.module.scss';
import { red } from 'ansi-colors';

const Projects = () => (
  <>
    <ProjectsTitle title="Projects" />
    <ProjectsWrapper />
  </>
)

const ProjectsWrapper = () => (
  <div className={styles.projectsWrapper}>
    <Project specificClass={styles.scribe} href="https://github.com/withscribe" 
             title="Scribe" text="The version control application for creative writing" />
    <Project specificClass={styles.h2} href="https://github.com/haul-helper" 
             title="Haul Helper" text="A nice alternative for organizing your hauls" />
    <Project specificClass={styles.mulligan} href="https://github.com/mulligan" 
             title="Mulligan" text="Mulligan - Ditch the scorecard and watch your progress" />
  </div>
)

const ProjectsTitle = ({title}) => (
  <h2 className={styles.projectsTitle}>{title}</h2>
)

const Project = ({href, text, title, specificClass}) =>  {

  const redirectToLink = (href) => {
    window.location.href = href;
  }

  return (
    <div onClick={() => {redirectToLink(href)}} className={specificClass}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}


export default Projects