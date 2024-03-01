import CMS from 'netlify-cms-app';
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
// eslint-disable-next-line react/prefer-stateless-function
class NonEmptyStringableNumberControl extends React.Component {
  render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      value,
      step,
      min,
      max,
      onChange,
    } = this.props;

    return (
      <input
        type="number"
        id={forID}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
        value={value || 0}
        step={step}
        min={min}
        max={max}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
      />
    );
  }
}

NonEmptyStringableNumberControl.propTypes = {
  onChange: PropTypes.func.isRequired,
};

CMS.registerWidget('nonEmptyStringableNumber', NonEmptyStringableNumberControl);
