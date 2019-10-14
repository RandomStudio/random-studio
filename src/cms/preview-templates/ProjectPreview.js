import React from "react"
import Layout from "../../components/Layout/layout"
import ProjectDetail from "../../components/projectDetail"

export default ({ entry }) => (
  <Layout>
    <ProjectDetail {...entry.toJSON().data} />
  </Layout>
)
