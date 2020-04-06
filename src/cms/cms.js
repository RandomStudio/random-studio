import CMS from 'netlify-cms-app';
import NumberControl from 'netlify-cms-widget-number/dist/esm/NumberControl';
import NumberPreview from 'netlify-cms-widget-number/dist/esm/NumberPreview';
import video from 'netlify-cms-editor-component-video';
import PropTypes from 'prop-types';
import React from 'react';
import HomePreview from './preview-templates/Page/HomePreview';
import ProjectPreview from './preview-templates/ProjectPreview';

CMS.registerPreviewTemplate('index', HomePreview);
CMS.registerPreviewTemplate('project', ProjectPreview);

// Override default number widget since it has a bug with non-required number fields where it
// sets the value to '' (empty string) when saved. This causes problems when parsing the resulting
// markdown files. This code can be removed (and the admin/config.yml set to use the regular number
// widget) when the problems are fixed in a next release of netlify-cms.

// Netlify doesn't support functional components...
// eslint-disable-next-line react/prefer-stateless-function
class NonEmptyStringableNumberControl extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <NumberControl
        {...this.props}
        onChange={value => onChange(value === '' ? null : value)}
      />
    );
  }
}

NonEmptyStringableNumberControl.propTypes = {
  onChange: PropTypes.func.isRequired,
};

CMS.registerWidget(
  'nonEmptyStringableNumber',
  NonEmptyStringableNumberControl,
  NumberPreview,
);

CMS.registerEditorComponent(video);
