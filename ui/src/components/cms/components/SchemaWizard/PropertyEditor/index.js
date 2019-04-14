import React from "react";

import Box from "grommet/components/Box";

import { PropTypes } from "prop-types";
import CustomizeField from "../../../containers/CustomizeField";
import Header from "grommet/components/Header";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "../../../../partials/AccordionPanel";

import SelectFieldType from "../../../containers/SelectFieldType";
import PropKeyEditor from "./PropKeyEditor";
import PropKeyView from "./PropKeyView";

class PropertyEditor extends React.Component {
  render() {
    return (
      <Box size="medium" flex={false}>
        <Header colorIndex="brand" pad="small" margin="none" size="small">
          Edit
        </Header>
        <Box flex={true} pad="small">
          <Accordion active={0} openMulti={true} flex="true">
            <AccordionPanel
              pad="none"
              heading={<span>Select property type</span>}
            >
              <SelectFieldType path={this.props.path} />
            </AccordionPanel>
            <AccordionPanel pad="none" heading={<span>Edit basic info</span>}>
              <CustomizeField
                path={this.props.path}
                cancel={this.props.cancel}
                key="customize"
              />
            </AccordionPanel>
          </Accordion>
          {this.props.propKeyEditor ? (
            <PropKeyEditor
              addProperty={this.props.addProperty}
              path={this.props.propKeyEditor.get("path")}
              type={this.props.propKeyEditor.get("type")}
            />
          ) : (
            <PropKeyView path={this.props.path} propKey={this.props.propKey} />
          )}
        </Box>
      </Box>
    );
  }
}

PropertyEditor.propTypes = {
  cancel: PropTypes.func,
  onFormSchemaChange: PropTypes.func,
  field: PropTypes.object,
  path: PropTypes.array
};

export default PropertyEditor;
