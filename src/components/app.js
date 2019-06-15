import React from "react"

// Styling
import appStyles from "../styles/app.module.scss"
import styles from "../styles/links.module.scss"

// Components
import Title from "./title"
import Subtitle from "./subtitle"
import { GithubWrapper, LinkedInWrapper, TwitterWrapper } from "./social"
import AboutMe from "./aboutme"
import RedirectLink from "./links"
import Projects from "./projects"
import SEO from "./seo"

const App = () => (
  <div className={appStyles.App}>
    <SEO
      title="Home"
      keywords={[`portfolio`, `blog`, `developer`, `software`]}
    />
    <SectionWrapper componentStyle={appStyles.firstBlockWrapper}>
      <Title />
      <Subtitle />
      <GithubWrapper />
      <LinkedInWrapper />
      <TwitterWrapper />
      <RedirectLink
        componentStyle={styles.blogWrapper}
        link="/blog"
        linkText="Blog"
      />
    </SectionWrapper>
    <SectionWrapper componentStyle={appStyles.secondBlockWrapper}>
      <AboutMe />
    </SectionWrapper>
    <SectionWrapper componentStyle={appStyles.thirdBlockWrapper}>
      <Projects />
    </SectionWrapper>
  </div>
)

const SectionWrapper = props => (
  <div className={props.componentStyle}>{props.children}</div>
)

export default App
