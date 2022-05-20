import React from "react";
import classNames from "classnames";
import _ from "lodash";
import { utils } from "@rjsf/core";
import { Button, Col, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import TabField from "./TabField";
import PropTypes from "prop-types";
const { canExpand } = utils;
const DESCRIPTION_COL_STYLE = {
  paddingBottom: "8px"
};

const ObjectFieldTemplate = ({
  DescriptionField,
  TitleField,
  description,
  disabled,
  formContext,
  formData,
  idSchema,
  onAddClick,
  prefixCls,
  properties,
  readonly,
  required,
  schema,
  title,
  uiSchema
}) => {
  const { colSpan = 24, labelAlign = "right", rowGutter = 24 } = formContext;

  const labelClsBasic = `${prefixCls}-item-label`;
  const labelColClassName = classNames(
    labelClsBasic,
    labelAlign === "left" && `${labelClsBasic}-left`
    // labelCol.className,
  );

  const findSchema = element => element.content.props.schema;

  const findSchemaType = element => findSchema(element).type;

  const findUiSchema = element => element.content.props.uiSchema;

  const findUiSchemaField = element => findUiSchema(element)["ui:field"];

  const findUiSchemaWidget = element => findUiSchema(element)["ui:widget"];
  const calculateColSpan = element => {
    const type = findSchemaType(element);
    const field = findUiSchemaField(element);
    const widget = findUiSchemaWidget(element);

    const defaultColSpan =
      properties.length < 2 || // Single or no field in object.
      type === "object" ||
      type === "array" ||
      widget === "textarea"
        ? 24
        : 12;

    if (_.isObject(colSpan)) {
      return (
        colSpan[widget] || colSpan[field] || colSpan[type] || defaultColSpan
      );
    }
    if (_.isNumber(colSpan)) {
      return colSpan;
    }
    return defaultColSpan;
  };

  if (uiSchema["ui:object"] == "tabView")
    return <TabField uiSchema={uiSchema} properties={properties} />;
  return (
    <fieldset id={idSchema.$id}>
      <Row gutter={rowGutter}>
        {uiSchema["ui:title"] !== false &&
          (uiSchema["ui:title"] || title) && (
            <Col className={labelColClassName} span={24}>
              <TitleField
                id={`${idSchema.$id}-title`}
                required={required}
                title={uiSchema["ui:title"] || title}
              />
            </Col>
          )}
        {uiSchema["ui:description"] !== false &&
          (uiSchema["ui:description"] || description) && (
            <Col span={24} style={DESCRIPTION_COL_STYLE}>
              <DescriptionField
                description={uiSchema["ui:description"] || description}
                id={`${idSchema.$id}-description`}
              />
            </Col>
          )}
        {properties.filter(e => !e.hidden).map(element => (
          <Col key={element.name} span={calculateColSpan(element)}>
            {element.content}
          </Col>
        ))}
      </Row>

      {canExpand(schema, uiSchema, formData) && (
        <Col span={24}>
          <Row gutter={rowGutter} justify="end">
            <Col flex="192px">
              <Button
                block
                className="object-property-expand"
                disabled={disabled || readonly}
                onClick={onAddClick(schema)}
                type="primary"
              >
                <PlusCircleOutlined /> Add Item
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </fieldset>
  );
};

ObjectFieldTemplate.propTypes = {
  disabled: PropTypes.bool,
  formContext: PropTypes.object,
  onAddClick: PropTypes.func,
  description: PropTypes.string,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.object,
  formData: PropTypes.object,
  idSchema: PropTypes.object,
  prefixCls: PropTypes.string,
  title: PropTypes.string,
  uiSchema: PropTypes.object,
  properties: PropTypes.object,
  DescriptionField: PropTypes.node,
  TitleField: PropTypes.node
};

export default ObjectFieldTemplate;