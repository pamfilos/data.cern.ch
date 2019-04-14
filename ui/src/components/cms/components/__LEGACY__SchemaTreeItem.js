import React from "react";

import Box from "grommet/components/Box";
import Label from "grommet/components/Label";

import FormAddIcon from "grommet/components/icons/base/FormAdd";
import FormEditIcon from "grommet/components/icons/base/FormEdit";

import { PropTypes } from "prop-types";

class SchemaTreeItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick = type => {
    let propKey = this.props.path.schema.pop();
    this.props.onItemClick(propKey, this.props.path.schema);
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
            onClick={this._onClick}
            direction="row"
            align="center"
            wrap={false}
          >
            <Label size="small" margin="none">
              <strong>
                {mapType2Icon[this.props.schema.type] || "missing"}
              </strong>
            </Label>
            <Box flex={true} pad={{ horizontal: "small" }}>
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

export default SchemaTreeItem;

let mapType2Icon = {
  object: "{ }",
  array: "[ ]",
  boolean: "0/1",
  string: "abc",
  number: "123.45"
};
