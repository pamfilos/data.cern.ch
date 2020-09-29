import React, { Component } from "react";
import PropTypes from "prop-types";

// Customized RJSF component ( Grommet )
import FieldTemplate from "./themes/grommet/templates/FieldTemplate";
import ObjectFieldTemplate from "./themes/grommet/templates/ObjectFieldTemplate";
import ArrayFieldTemplate from "./themes/grommet/templates/ArrayFieldTemplate";
import ErrorListTemplate from "./themes/grommet/templates/ErrorListTemplate";

import widgets from "./themes/grommet/widgets";
import fields from "./themes/grommet/fields";

import Form from "react-jsonschema-form";

import Box from "grommet/components/Box";
import objectPath from "object-path";

import _debounce from "lodash/debounce";

class DepositForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  _validate(formData, errors) {
    // // DEPRECATED, we should now use `extraErrors` prop in RJSF
    // // form to pass async errors

    // // Example on how to add custom errors
    // // "errors" object is a representation of the schema field tree
    // // with an "addError" function attached to each property
    // // e.g.
    // // errors.basic_info.cadi_id.addError("boom");

    // // TODO:  Updates error list with ASYNC ERRORs
    // if (!Array.isArray(this.props.errors)) return errors;

    // this.props.errors.map(error => {
    //   if (error.field) {
    //     let errorObj = objectPath.get(errors, error.field);
    //     errorObj.addError(error.message);
    //   }
    // });

    return errors;
  }

  transformErrors = errors => {
    // Remove required field errors, since not needed for "save"
    // as we ignore till the record gets published
    errors  = errors
      .filter((item) => item.name != "required");

    errors.map(error => {
      // Update messages for undefined fields when required,
      // from "should be string" ==> "Either edit or remove"
      if (error.name == "required") return null;

      if (error.message == "should be string") {
        let errorMessages = objectPath.get(this.props.formData, error.property);
        if (errorMessages == undefined) error.message = "Either edit or remove";
      }

      return error;
    });

    return errors
  };

  render() {
    return (
      <Box flex={true} wrap={false}>
        <Box pad="none" flex={true}>
          <Form
            ref={this.props.formRef}
            style={{ marginBottom: "1em" }}
            // formData, schema, uiSchema options
            schema={this.props.schema}
            uiSchema={this.props.uiSchema}
            formData={this.props.formData}

            // RJSF form templates, widgets, fields
            FieldTemplate={FieldTemplate}
            ObjectFieldTemplate={ObjectFieldTemplate}
            ArrayFieldTemplate={ArrayFieldTemplate}
            ErrorList={ErrorListTemplate}
            widgets={widgets}
            fields={fields}

            // Error handling
            transformErrors={this.transformErrors}
            extraErrors={this.props.extraErrors}
            showErrorList={false}
            liveValidate={false}
            noValidate={false}
            noHtml5Validate={true}

            // on.. functions
            onChange={_debounce(this.props.onChange, 500)}
            onBlur={() => {}}
            onError={() => {}}

            formContext={{
              formRef: this.props.formRef,
              ...this.props.formContext
            }}
          >
            <span />
          </Form>
        </Box>
      </Box>
    );
  }
}

DepositForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  schema: PropTypes.object,
  selectSchema: PropTypes.string,
  idSchema: PropTypes.object,
  uiSchema: PropTypes.object,
  properties: PropTypes.object,
  formData: PropTypes.object,
  schemas: PropTypes.object,
  onChange: PropTypes.func,
  errors: PropTypes.array,
  formRef: PropTypes.object,
  extraErrors: PropTypes.array,
  formContext: PropTypes.object
};

export default DepositForm;
