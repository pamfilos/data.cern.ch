import React, { useState } from "react";
import PropTypes from "prop-types";
import HoverBox from "./HoverBox";
import SchemaTreeItem from "./SchemaTreeItem";
import Form from "../../forms/Form";
import TextWidget from "./TextWidget";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import { connect } from "react-redux";
import { addByPath } from "../../../actions/schemaWizard";
import { _validate } from "../utils/index";

const widgets = {
  TextWidget: TextWidget
};

const FieldTemplate = props => {
  const { schema, uiSchema, rawErrors = [], children, formContext } = props;

  const [display, setDisplay] = useState(false);
  let path = {
    schema: [...formContext.schema, ...(rawErrors[0].schema || [])],
    uiSchema: [...formContext.uiSchema, ...(rawErrors[0].uiSchema || [])]
  };

  const shouldBoxHideChildren = uiSchema => {
    return uiSchema["ui:field"] !== undefined;
  };

  if (props.id == "root") {
    return (
      <HoverBox
        addProperty={props.addProperty}
        key={props.id}
        path={path}
        shouldHideChildren={shouldBoxHideChildren(uiSchema)}
      >
        <div
          style={{
            padding: formContext.schema.length == 0 ? "10px" : "none"
          }}
        >
          {children}
        </div>
      </HoverBox>
    );
  }

  let _renderObjectArray = undefined;

  if (["array"].indexOf(schema.type) > -1) {
    _renderObjectArray = <div>{children}</div>;
  } else if (["object"].indexOf(schema.type) > -1) {
    _renderObjectArray = (
      <div>
        <SchemaTreeItem
          type="object"
          {...props}
          path={path}
          display={display}
          updateDisplay={() => setDisplay(!display)}
        />
        {display ? (
          <div style={{ marginLeft: "10px" }}>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={{}}
              widgets={widgets}
              FieldTemplate={_FieldTemplate}
              ObjectFieldTemplate={ObjectFieldTemplate}
              ArrayFieldTemplate={ArrayFieldTemplate}
              liveValidate={true}
              validate={_validate}
              formContext={path}
              onChange={() => {}}
            >
              <span />
            </Form>
          </div>
        ) : null}
      </div>
    );
  }

  if (_renderObjectArray) {
    return (
      <HoverBox
        addProperty={props.addProperty}
        key={props.id}
        path={path}
        shouldHideChildren={shouldBoxHideChildren(uiSchema)}
      >
        {_renderObjectArray}
      </HoverBox>
    );
  }

  return <SchemaTreeItem type="other" {...props} path={path} />;
};

FieldTemplate.propTypes = {
  id: PropTypes.string,
  children: PropTypes.element,
  formContext: PropTypes.object,
  rawErrors: PropTypes.array,
  uiSchema: PropTypes.object,
  schema: PropTypes.object,
  addProperty: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    addProperty: (path, data) => dispatch(addByPath(path, data))
  };
}

let _FieldTemplate = connect(
  state => state,
  mapDispatchToProps
)(FieldTemplate);

export default _FieldTemplate;