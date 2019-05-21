import React from "react"
import styles from "../styles/aboutme.module.scss"
import RedirectLink from './links'

const AboutMe = () => (
  <>
    <div className={styles.openingWrapper}>
      Hi, I'm Austin!
    </div>
    <div className={styles.aboutMeWrapper}>
        I'm a full-stack web developer living in Toronto, Ontario.
        Building applications is my passion and I spend alot of my time, maybe
        an unhealthy amount of time, doing just that. When I'm not coding, I love to 
        play guitar, golf although not as much as I like due to the canadian winters, 
        hike the local trails and read whatever fantasy novel I can get my hands on.
        I'm always looking for something new and exiting to work on and if you are 
        looking for a passionate developer to help build your product, I'm your guy.
        Please don't hesitate to reach out to me and don't forget to check out my <RedirectLink link="/blog" linkText="blog" />
        while you are here.
    </div>
  </>
)

export default AboutMe
