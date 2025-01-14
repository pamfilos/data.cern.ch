import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import FieldHeader from "../components/FieldHeader";

let FieldTemplate = function(props) {
  const { label, children, formContext, uiSchema, id } = props;
  const uiWidget = uiSchema["ui:widget"];

  // this list consists values that will be full width in the preview mode
  const FULL_WIDTH_ITEMS = ["richeditor"];

  const getElementWidth = () => {
    const elementIsArrayOrObject = ["array", "object"].includes(
      props.schema.type
    );

    // uniqueItems => selectWidget
    // label => ArrayItems without title ex array of strings
    const shouldBeFullWidth = FULL_WIDTH_ITEMS.includes(uiWidget);
    if (
      shouldBeFullWidth ||
      (elementIsArrayOrObject && !props.schema.uniqueItems) ||
      !label
    )
      return "1/5";

    return "3/5";
  };

  return children[0].props &&
    children[0].props.formData === undefined ? null : (
    <Box
      flex={true}
      style={{
        borderRadius: "3px",
        gridColumn: "1/5",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: id != "root" && "10px",
      }}
      className={
        formContext.tabView
          ? "fieldTemplate"
          : "fieldTemplate align-form-center"
      }
    >
      {(label && !(["array"].indexOf(props.schema.type) > -1)) ||
      props.schema.uniqueItems ? (
        <Box
          flex
          style={{
            paddingRight: "10px",
            gridColumn: "1/3"
          }}
        >
          <FieldHeader title={label} bold uiSchema={uiSchema} />
        </Box>
      ) : null}

      <Box
        flex
        style={{
          gridColumn: getElementWidth()
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

FieldTemplate.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  schema: PropTypes.object,
  formContext: PropTypes.object,
  uiSchema: PropTypes.object
};

export default FieldTemplate;
