import React from 'react'
import {
  CSharpImage, JSImage, NodeImage, JavaImage, DotNetImage,
  ReactImage, AngularImage, GraphQLImage
} from './logos'
import styles from '../styles/experience.module.scss';
import { red } from 'ansi-colors';

const Experience = () => (
  <div className={styles.experienceWrapper}>
    <h2 style={{marginBottom: 20, color: red, fontSize: 30}}>The stuff I'm familiar with...</h2>
    <div className={styles.languages}>
      <CSharpImage />
      <JSImage />
      <NodeImage />
      <JavaImage />
    </div>
    <div className={styles.frameworks}>
      <DotNetImage />
      <ReactImage />
      <AngularImage />
      <GraphQLImage />
    </div>

  </div>
)

export default Experience