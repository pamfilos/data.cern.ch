import React from "react";
import { PropTypes } from "prop-types";

import Box from "grommet/components/Box";
import { Header } from "grommet";
import CleanForm from "../../../drafts/form/CleanForm";

class FormPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box flex={true} justify="center">
        <CleanForm
          schema={this.props.schema.toJS()}
          uiSchema={this.props.uiSchema.toJS()}
          formData={{}}
        >
          <span />
        </CleanForm>
      </Box>
    );
  }
}

FormPreview.propTypes = {
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};

export default FormPreview;
