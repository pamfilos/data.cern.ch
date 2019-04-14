import React from "react";

import Box from "grommet/components/Box";
import Header from "grommet/components/Header";

import { useDrop } from "react-dnd";

import { PropTypes } from "prop-types";
import SchemaTreeItem from "./__LEGACY__SchemaTreeItem";
import HoverBox from "./HoverBox";

class SchemaTree extends React.Component {
  _addProperty = path => {
    this.props.addProperty(path);
  };

  _add = ({ schema: path, uiSchema: uiPath }, data) => {
    let schema = this.props.schema.getIn(path).toJS();
    let _path = path;
    let _uiPath = uiPath;

    let random_name = `item_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    if (schema.type) {
      if (schema.type == "object") {
        if (!schema.properties) schema.properties = {};
        _path = [...path, "properties", random_name];
        _uiPath = [...uiPath, random_name];
      } else if (schema.type == "array") {
        if (!schema.items) schema.items = {};
        _path = [...path, "items"];
        _uiPath = [...uiPath, "items"];
      }

      this.props.add({ schema: _path, uiSchema: _uiPath }, data);
    }
  };

  _renderRoot = (id, schema) => (
    <HoverBox
      addProperty={this._add}
      key={"root"}
      path={{ schema: [], uiSchema: [] }}
    >
      <Box flex={false} margin="none">
        <SchemaTreeItem
          addProperty={this._addProperty}
          colorIndex="grey-4"
          onItemClick={this.props.onItemClick}
          id={id}
          schema={schema}
          path={{ schema: [], uiSchema: [] }}
        />
        <Box margin={{ horizontal: "small" }}>
          {this._renderType(id, schema, [], [])[2]}
        </Box>
      </Box>
    </HoverBox>
  );

  _renderProperty = (id, schema, path, uiPath) => {
    let _path = path.concat([id]);
    let _uiPath = uiPath.concat([id]);

    let propPath, propUIPath, _renderType;
    if (
      schema.type == "object" ||
      schema.properties ||
      schema.type == "array"
    ) {
      [propPath, propUIPath, _renderType] = this._renderType(
        id,
        schema,
        _path,
        _uiPath
      );
    }
    return (
      <Box
        key={id}
        flex={false}
        separator="left"
        margin={{ left: "medium", top: "small" }}
      >
        <HoverBox
          addProperty={this._add}
          path={{ schema: _path, uiSchema: _uiPath }}
          propKey={id}
        >
          <SchemaTreeItem
            addProperty={this._addProperty}
            onItemClick={this.props.onItemClick}
            id={id}
            schema={schema}
            path={{ schema: _path, uiSchema: _uiPath }}
          />
          {schema.type == "object" ||
          schema.properties ||
          schema.type == "array"
            ? _renderType
            : null}
        </HoverBox>
      </Box>
    );
  };

  _renderArray = (id, schema, path, uiPath) => {
    let propPath, propUIPath, _renderType;
    if (
      schema.type == "object" ||
      schema.properties ||
      schema.type == "array"
    ) {
      [propPath, propUIPath, _renderType] = this._renderType(
        null,
        schema,
        path,
        uiPath
      );
    }
    return (
      <Box>
        {schema.type == "object" || schema.properties || schema.type == "array"
          ? _renderType
          : null}
      </Box>
    );
  };

  _renderType = (id, schema, path, uiPath = []) => {
    let result = [];
    if (schema) {
      let _path, _uiPath;
      if (schema.type == "object" || schema.properties) {
        _path = path.concat(["properties"]);
        _uiPath = uiPath.concat([]);
        Object.keys(schema.properties || {}).forEach(property => {
          result.push(
            this._renderProperty(
              property,
              schema.properties[property],
              _path,
              _uiPath
            )
          );
        });
        // return <HoverBox addProperty={this._add} path={"path"} propKey={"id"}>{result}</HoverBox>;
      } else if (schema.type == "array" && id) {
        _path = path.concat("items");
        _uiPath = uiPath.concat("items");
        console.log("RENDERING ARRAY:::::::", schema, _path, path, _uiPath, id);
        result.push(this._renderArray(id, schema.items, _path, _uiPath));
      }
      return [_path, _uiPath, result];
    } else if (id !== "root") {
      return [path, uiPath, this._renderProperty(id, schema, path, uiPath)];
    }
  };

  render() {
    return (
      <Box size="medium" colorIndex="light-1">
        <Header
          size="small"
          colorIndex="grey-3"
          margin="none"
          pad={{ horizontal: "small" }}
        >
          Schema Tree
        </Header>

        <Box flex={true} pad="small">
          {this._renderRoot("root", this.props.schema.toJS())}
        </Box>
      </Box>
    );
  }
}

SchemaTree.propTypes = {
  onItemClick: PropTypes.func
};

export default SchemaTree;
