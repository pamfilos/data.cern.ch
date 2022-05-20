import React from "react";

import Form from "antd/lib/form";
import PropTypes from "prop-types";
import WrapIfAdditional from "./WrapIfAdditional";
import { Space, Typography } from "antd";

const VERTICAL_LABEL_COL = { span: 24 };
const VERTICAL_WRAPPER_COL = { span: 24 };

const FieldTemplate = ({
  children,
  classNames,
  description,
  disabled,
  displayLabel,
  // errors,
  // fields,
  formContext,
  help,
  hidden,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  rawErrors,
  rawHelp,
  readonly,
  required,
  schema,
  uiSchema
}) => {
  const {
    colon,
    labelCol = VERTICAL_LABEL_COL,
    wrapperCol = VERTICAL_WRAPPER_COL,
    wrapperStyle
  } = formContext;

  if (hidden) {
    return <div className="field-hidden">{children}</div>;
  }

  const renderFieldErrors = () =>
    [...new Set(rawErrors)].map(error => (
      <div key={`field-${id}-error-${error}`}>{error}</div>
    ));
  let gridColumns = null;

  // if the grid options exists in uiSchema pass it as prop
  // else set it full width
  if (uiSchema["ui:options"] && uiSchema["ui:options"].grid) {
    gridColumns = uiSchema["ui:options"].grid.gridColumns
      ? uiSchema["ui:options"].grid.gridColumns
      : "1/5";
  }

  return (
    <div
      style={{
        gridColumn: gridColumns ? gridColumns : "1 / 5",
        height: id == "root" && uiSchema["ui:object"] == "tabView" && "100%"
        // padding:
        //   id == "root"
        //     ? null
        //     : schema.type !== "array" && schema.type !== "object" && "10px 24px"
      }}
    >
      <WrapIfAdditional
        classNames={classNames}
        disabled={disabled}
        formContext={formContext}
        id={id}
        label={label}
        onDropPropertyClick={onDropPropertyClick}
        onKeyChange={onKeyChange}
        readonly={readonly}
        required={required}
        schema={schema}
        isTabView={uiSchema["ui:object"] == "tabView"}
      >
        {id === "root" ? (
          children
        ) : (
          <Form.Item
            colon={colon}
            // extra={description}
            hasFeedback={schema.type !== "array" && schema.type !== "object"}
            help={(!!rawHelp && help) || (!!rawErrors && renderFieldErrors())}
            htmlFor={id}
            label={
              (displayLabel || uiSchema["ui:field"]) &&
              label && (
                <Space direction="vertical" size={0}>
                  <Typography.Text>{label}</Typography.Text>
                  <Typography.Text type="secondary">
                    {description}
                  </Typography.Text>
                </Space>
              )
            }
            labelCol={labelCol}
            required={required}
            style={wrapperStyle}
            validateStatus={rawErrors ? "error" : undefined}
            wrapperCol={wrapperCol}
          >
            {children}
          </Form.Item>
        )}
      </WrapIfAdditional>
    </div>
  );
};

FieldTemplate.propTypes = {
  displayLabel: PropTypes.bool,
  classNames: PropTypes.string,
  disabled: PropTypes.bool,
  formContext: PropTypes.object,
  rawErrors: PropTypes.array,
  onDropPropertyClick: PropTypes.func,
  onKeyChange: PropTypes.func,
  description: PropTypes.string,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  hidden: PropTypes.bool,
  schema: PropTypes.object,
  help: PropTypes.string,
  label: PropTypes.string,
  rawHelp: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  uiSchema: PropTypes.object
};

export default FieldTemplate;