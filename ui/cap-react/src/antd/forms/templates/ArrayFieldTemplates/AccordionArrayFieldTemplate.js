import React from "react";
import PropTypes from "prop-types";
import { Collapse } from "antd";
import ArrayFieldTemplateItem from "./ArrayFieldTemplateItem";
import ErrorFieldIndicator from "../../error/ErrorFieldIndicator";

const AccordionArrayFieldTemplate = ({ items = [], formContext, id }) => {
  if (items.length < 1) return null;

  return (
    <ErrorFieldIndicator id={id}>
      <Collapse expandIconPosition="right">
        <Collapse.Panel header={`${items.length} item(s)`} key="1">
          {items.map(itemProps => (
            <ArrayFieldTemplateItem {...itemProps} formContext={formContext} />
          ))}
        </Collapse.Panel>
      </Collapse>
    </ErrorFieldIndicator>
  );
};

AccordionArrayFieldTemplate.propTypes = {
  items: PropTypes.array,
  formContext: PropTypes.object
};

export default AccordionArrayFieldTemplate;