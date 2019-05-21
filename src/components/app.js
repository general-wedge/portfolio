import React from 'react';

// Styling
import appStyles from '../styles/app.module.scss';
import styles from '../styles/links.module.scss';

// Components
import Title from './title'
import Subtitle from './subtitle'
import { GithubWrapper, LinkedInWrapper, TwitterWrapper } from './contactme'
import AboutMe from './aboutme'
import RedirectLink from './links'
import Projects from './projects'
import SEO from './seo'

const App = () => (
  <div className={appStyles.App}>
    <SEO title="Home" keywords={[`portfolio`, `blog`, `developer`, `software`]} />
    <FirstBlockWrapper />
    <SecondBlockWrapper />
    <ThirdBlockWrapper /> 
  </div>
)

const FirstBlockWrapper = () => (
  <div className={appStyles.firstBlockWrapper}>
    <Title />
    <Subtitle />
    <GithubWrapper />
    <LinkedInWrapper/>
    <TwitterWrapper />
    <RedirectLink sepcificClass={styles.linkWrapper} link="/blog" linkText="Blog" />
  </div>
)

const SecondBlockWrapper = () => (
  <div className={appStyles.secondBlockWrapper}>
    <AboutMe />
  </div>
)

const ThirdBlockWrapper = () => (
  <div className={appStyles.thirdBlockWrapper}>
    <Projects />
  </div>
)

export default App
