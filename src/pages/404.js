import styles from "./404.module.scss"
import React from "react"
import Layout from "../components/Layout/layout"
import Navigation from "../components/Layout/navigation"
import { Link } from "gatsby"

const Error404 = () => {
  return (
    <Layout>
      <Navigation />
      <main className={styles.notFoundPage}>
        <div>
          Page not found <br />
          View our <Link to="/#projects">projects</Link>
        </div>
      </main>
    </Layout>
  )
}

export default Error404
