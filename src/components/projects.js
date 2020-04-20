import React from "react"
import styles from "../styles/projects.module.scss"

// Project Section Root
const ProjectSectionRoot = () => (
  <>
    <ProjectSectionTitle title="Projects" />
    <ProjectsWrapper>
      <ProjectCard
        componentStyle={styles.scribe}
        href="https://github.com/withscribe"
        title="Scribe"
        text="The version control application for creative writing"
      />
      <ProjectCard
        componentStyle={styles.haul}
        href="https://github.com/haul-helper"
        title="Haul Helper"
        text="A nice alternative for organizing your hauls"
      />
      <ProjectCard
        componentStyle={styles.mulligan}
        href="https://github.com/mulligan"
        title="Mulligan"
        text="Mulligan - Ditch the scorecard and watch your progress"
      />
      <ProjectCard
        componentStyle={styles.tdb}
        href="https://github.com/general-wedge/total-discord-bot"
        title="Total Discord Bot"
        text="Simple Discord bot builder!"
      />
      <ProjectCard
        componentStyle={styles.temp1}
        href="https://github.com/general-wedge/total-discord-bot"
        title="Total Discord Bot"
        text="Simple Discord bot builder!"
      />
      <ProjectCard
        componentStyle={styles.temp2}
        href="https://github.com/general-wedge/total-discord-bot"
        title="Total Discord Bot"
        text="Simple Discord bot builder!"
      />
    </ProjectsWrapper>
  </>
)

const ProjectsWrapper = ({ children }) => (
  <div className={styles.projectsWrapper}>{children}</div>
) // Project Grid Section Wrapper

const ProjectSectionTitle = ({ title }) => (
  <h2 className={styles.projectsTitle}>{title}</h2>
) // Project Grid Section Title

const ProjectCard = ({ href, text, title, componentStyle }) => {
  const redirectToLink = href => {
    window.location.href = href
  }

  return (
    <div
      onClick={() => {
        redirectToLink(href)
      }}
      className={componentStyle}
    >
      <ProjectTitle title={title} />
      <ProjectText text={text} />
    </div>
  )
}
const ProjectTitle = ({ title }) => <h3>{title}</h3>
const ProjectText = ({ text }) => <p>{text}</p>

export default ProjectSectionRoot
