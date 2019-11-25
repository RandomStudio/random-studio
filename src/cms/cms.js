import CMS from 'netlify-cms-app';
import NumberControl from 'netlify-cms-widget-number/dist/esm/NumberControl';
import NumberPreview from 'netlify-cms-widget-number/dist/esm/NumberPreview';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectPreview from './preview-templates/ProjectPreview';

CMS.registerPreviewTemplate('project', ProjectPreview);

// Override default number widget since it has a bug with non-required number fields where it
// sets the value to '' (empty string) when saved. This causes problems when parsing the resulting
// markdown files. This code can be removed (and the admin/config.yml set to use the regular number
// widget) when the problems are fixed in a next release of netlify-cms.
const NonEmptyStringableNumberControl = props => (
  <NumberControl
    {...props}
    onChange={value => props.onChange(value === '' ? null : value)}
  />
);

NonEmptyStringableNumberControl.propTypes = {
  onChange: PropTypes.func.isRequired,
};

CMS.registerWidget(
  'nonEmptyStringableNumber',
  NonEmptyStringableNumberControl,
  NumberPreview,
);
