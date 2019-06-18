import React from "react"
import styles from "../styles/aboutme.module.scss"
import RedirectLink from "./links"

export const AboutMe = () => (
  <>
    <div className={styles.imgWrapper} />
    <div className={styles.aboutMeWrapper}>
      <div className={styles.opening}>Hi, I'm Austin!</div>
      <div className={styles.aboutMe}>
        I'm a full-stack web developer living in Toronto, Ontario. Building
        applications is my passion and I spend alot of my time, maybe an
        unhealthy amount of time, doing just that. When I'm not coding, I love
        to play guitar, golf although not as much as I like due to the canadian
        winters, hike the local trails and read whatever fantasy novel I can get
        my hands on. I'm always looking for something new and exiting to work on
        and if you are looking for a passionate developer to help build your
        product, I'm your guy. Please don't hesitate to reach out to me and
        don't forget to check out
        <RedirectLink
          componentStyle={styles.linkStyle}
          link="/blog"
          linkText="my blog"
        />
        while you are here.
      </div>
    </div>
  </>
)

export const ParallaxImage = () => <div className={styles.parallaxWrapper} />
