import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Label from "grommet/components/Label";

import Create from "./components/CMSIndex";
// import SchemaWizard from "./components/SchemaWizard";
import SchemaWizard from "./containers/SchemaWizard";
import { schemaChange, getSchemas } from "../../actions/schemaWizard";

import _omit from "lodash/omit";
import CMSIndex from ".";

const slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

class IndexPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // let availableSchemas = localStorage.getItem("availableSchemas") || "{}";
  //   // availableSchemas = JSON.parse(availableSchemas);

  //   // let _selectedSchema =
  //   //   Object.keys(availableSchemas).length > 0
  //   //     ? availableSchemas[Object.keys(availableSchemas)[0]].schema
  //   //     : null;
  //   // this.state = {
  //   //   schema: Object.keys(availableSchemas) ? _selectedSchema : null,
  //   //   uiSchema: {},
  //   //   availableSchemas
  //   // };

  //   // schemaChange(_selectedSchema);
  // }

  onCreateContentType = content_type => {
    let name = content_type.formData.name;
    let description = content_type.formData.description;
    const _id = slugify(Math.random().toString() + "_" + name);
    this.initSchema(_id, name, description);
  };

  _initSchemaStructure = (name, description) => ({
    schema: {
      title: name,
      description: description
    }
  });

  _addSchemaToLocalStorage = (_id, name, description) => {
    let newAvailableSchemas = Object.assign(this.state.availableSchemas, {
      [_id]: this._initSchemaStructure(name, description)
    });

    localStorage.setItem(
      "availableSchemas",
      JSON.stringify(newAvailableSchemas)
    );
  };

  initSchema = (_id, name, description) =>
    this.setState(this._initSchemaStructure(name, description), () =>
      this._addSchemaToLocalStorage(_id, name, description)
    );

  onSelectAvailableSchema = schemaId => {
    if (schemaId in this.state.availableSchemas)
      this.setState({ schema: this.state.availableSchemas[schemaId].schema });
  };

  onSchemaTreeItemClick = path => {};

  onFieldTypeSelect = event => {
    console.log("eevent:", event);
  };

  render() {
    return (
      <Box flex={true} wrap={true}>
        <CMSIndex />
      </Box>
    );
  }
}

IndexPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object
};

// function mapStateToProps(state) {
//   return {
//     selected: state.schemaWizard.get("selected")
//   };
// }

// function mapDispatchToProps() {
//   return {};
// }

export default IndexPage;
