import React from "react"
import PropTypes from "prop-types"
import ProjectDetail from "../../components/projectDetail"

const ProjectPreview = props => <ProjectDetail {...props.entry.toJSON().data} />

ProjectPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ProjectPreview
