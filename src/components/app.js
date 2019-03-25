import React from 'react';
import styles from '../styles/app.module.scss';

// Components
import Title from './title'
import Subtitle from './subtitle'
import ContactMe from './contactme'
import AboutMe from './aboutme'
import MyWork from './blogsection'
import Experience from './experience'
import SEO from './seo'

const App = () => (
  <div className={styles.App}>
    <SEO title="Home" keywords={[`portfolio`, `blog`, `developer`, `software`]} />  
    <Title />
    <Subtitle />
    <ContactMe />
    <AboutMe />
    <MyWork />
    <Experience />
  </div>
)

export default App
