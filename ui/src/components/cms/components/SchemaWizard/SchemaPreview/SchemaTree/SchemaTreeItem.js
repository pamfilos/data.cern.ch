import React from "react";
import { connect } from "react-redux";

import Box from "grommet/components/Box";
import Label from "grommet/components/Label";

import FormAddIcon from "grommet/components/icons/base/FormAdd";
import FormEditIcon from "grommet/components/icons/base/FormEdit";

import { PropTypes } from "prop-types";
import { selectProperty } from "../../../../../../actions/schemaWizard";

class SchemaTreeItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick = () => {
    this.props.selectProperty(this.props.rawErrors[0]);
  };

  _addProperty = () => {
    this.props.addProperty(this.props.path);
  };

  _addItem = () => {
    this.props.addItem(this.props.path);
  };

  render() {
    return (
      <Box
        colorIndex={this.props.colorIndex || "light-2"}
        separator="all"
        pad="small"
        direction="row"
        align="center"
        justify="between"
        wrap={false}
      >
        {this.props.schema ? (
          <Box
            onClick={this._onClick.bind(this)}
            direction="row"
            align="center"
            wrap={false}
          >
            <Label size="small" margin="none">
              <strong>
                {mapType2Icon[this.props.schema.type] || "missing"}
              </strong>
            </Label>
            <Box flex={false} pad={{ horizontal: "small" }}>
              {this.props.schema.title || this.props.id}
            </Box>
            <FormEditIcon />
          </Box>
        ) : null}
        {this.props.schema ? (
          <Box direction="row" align="center" wrap={false} flex={false}>
            {this.props.schema.type == "object" ? (
              <FormAddIcon onClick={this._addProperty} />
            ) : null}
            {this.props.schema.type == "array" ? (
              <FormAddIcon onClick={this._addItem} />
            ) : null}
          </Box>
        ) : null}
      </Box>
    );
  }
}

SchemaTreeItem.propTypes = {
  schema: PropTypes.object,
  id: PropTypes.string,
  path: PropTypes.array
};

function mapDispatchToProps(dispatch) {
  return {
    selectProperty: path => dispatch(selectProperty(path))
  };
}
export default connect(
  state => state,
  mapDispatchToProps
)(SchemaTreeItem);

let mapType2Icon = {
  object: "{ }",
  array: "[ ]",
  boolean: "0/1",
  string: "abc",
  number: "123.45"
};
