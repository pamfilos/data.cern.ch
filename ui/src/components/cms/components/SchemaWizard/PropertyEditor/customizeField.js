import React from "react";

import Box from "grommet/components/Box";

import Form from "../../../../drafts/form/GrommetForm";
import { PropTypes } from "prop-types";

import { commonSchema, schemaSchema, uiSchema } from "../../utils/schemas";

class CustomizeField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schema: props.schema ? props.schema.toJS() : {},
      uiSchema: props.uiSchema ? props.uiSchema.toJS() : {}
    };
  }

  _onSchemaChange = data => {
    this.setState({ schema: data.formData }, () => {
      console.log("))))))))))):::", data);
      this.props.onSchemaChange(
        this.props.path.get("path").toJS(),
        data.formData
      );
    });
  };

  _onUiSchemaChange = data => {
    this.setState({ uiSchema: data.formData }, () => {
      console.log("))))))))))):::", data);
      this.props.onUiSchemaChange(
        this.props.path.get("uiPath").toJS(),
        data.formData
      );
    });
  };

  static getDerivedStateFromProps(props) {
    return {
      schema: props.schema ? props.schema.toJS() : {}
    };
  }

  render() {
    return (
      <Box flex={true}>
        <Box flex={true}>
          <Form
            schema={schemaSchema}
            formData={this.state.schema}
            onChange={this._onSchemaChange.bind(this)}
          />
          <hr />
          <hr />
          <Form
            schema={uiSchema}
            formData={this.state.uiSchema}
            onChange={this._onUiSchemaChange}
          />
        </Box>
      </Box>
    );
  }
}

CustomizeField.propTypes = {
  field: PropTypes.object,
  cancel: PropTypes.func
};

export default CustomizeField;
