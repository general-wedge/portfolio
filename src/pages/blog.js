import React from "react"
import blogStyles from '../styles/blogsection.module.scss'
import linkStyles from '../styles/links.module.scss'
import BlogSection from '../components/blogsection'
import RedirectLink from '../components/links'

const BlogPage = () => (
  <BlogWrapper />
)

const BlogWrapper = () => (
  <div className={blogStyles.blogGrid}>
    <RedirectLink specifiClass={linkStyles.home} link="/" linkText="Back Home" />
    <BlogSection />
  </div>
)

export default BlogPage