import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import styles from "../styles/blogsection.module.scss"

const BlogMetaData = ({ data }) => {
  const totalCount = data.allMarkdownRemark.edges.length
  const blogs = data.allMarkdownRemark.edges
  return (
    <>
      {totalCount > 0 ? (
        blogs.map(({ node }, i) => {
          console.log(i)
          return (
            <div
              key={i}
              style={{ gridRow: `${i + 1}` }}
              className={styles.blogSectionWrapper}
            >
              <div className={styles.blog}>
                <h4 className={styles.blogHeaderTitle}>
                  <Link to={node.frontmatter.path}>
                    {node.frontmatter.title}
                  </Link>
                </h4>
                <small>
                  {node.frontmatter.date} • time to read: {node.timeToRead} min
                </small>
                <p>{node.frontmatter.excerpt}</p>
              </div>
            </div>
          )
        })
      ) : (
        <div style={{ gridRow: 1 }} className={styles.blogSectionWrapper}>
          <div className={styles.blog}>
            <h4 className={styles.blogHeaderTitle}>
              Stay tuned! Blogs coming soon!
            </h4>
            <small>TBD</small>
            <p>This area is under construction.</p>
          </div>
        </div>
      )}
    </>
  )
}

const BlogWrapper = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                frontmatter {
                  title
                  path
                  date
                  excerpt
                }
                timeToRead
                wordCount {
                  paragraphs
                  sentences
                  words
                }
              }
            }
            totalCount
            distinct
          }
        }
      `}
      render={
        data => (
          <div
            className={styles.blogWrapper}
            style={{
              gridTemplateRows: `repeat(${data.allMarkdownRemark.totalCount}, "1fr")`,
            }}
          >
            <BlogMetaData data={data} />
          </div>
        )
        // <BlogMetaData
        //   title={node.frontmatter.title}
        //   date={node.frontmatter.date}
        //   description={node.excerpt}/>
      }
    />
  )
}

const BlogSection = () => (
  <>
    <div className={styles.blogSectionHeaderWrapper}>
      <h3 className={styles.blogSectionHeader}>Blog - under development :)</h3>
    </div>
    <BlogWrapper />
  </>
)

export default BlogSection
