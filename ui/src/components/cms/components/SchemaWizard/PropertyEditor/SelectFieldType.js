import React from "react";

import Box from "grommet/components/Box";
import Paragraph from "grommet/components/Paragraph";
import Label from "grommet/components/Label";
import Heading from "grommet/components/Heading";

import DraggableBox from "./DraggableBox";
import { commonSchema } from "../../utils/schemas";

import { PropTypes } from "prop-types";

const fieldTypes = {
  string: {
    title: "Text",
    description: "Titles, names, paragraphs, IDs, list of names",
    child: {},
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {}
    }
  },
  number: {
    title: "Number",
    description: "IDs, order number, rating, quantity",
    child: {},
    default: {
      schema: {
        type: "number"
      },
      uiSchema: {}
    }
  },
  object: {
    title: "JSON Object",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {}
    }
  },
  reference: {
    title: "Reference",
    description: "For example, an analysis can reference its author(s)",
    child: {},
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {}
    }
  },
  boolean: {
    title: "Boolean",
    description: "Yes or no, 1 or 0, true or false",
    child: {},
    default: {
      schema: {
        type: "boolean",
        properties: {}
      },
      uiSchema: {}
    }
  },
  array: {
    title: "Array",
    description:
      "A list of things. List of strings, numbers, objects, references",
    child: {},
    default: {
      schema: {
        type: "array",
        items: {}
      },
      uiSchema: {}
    }
  },
  accordion: {
    title: "Accordion",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:object": "accordionObjectField"
      }
    }
  }
};

class SelectFieldType extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick = type => {
    let { path: schemaPath, uiPath: uiSchemaPath } = this.props.path.toJS();
    let schema = this.props.schema ? this.props.schema.toJS() : {};
    let uiSchema = this.props.uiSchema ? this.props.uiSchema.toJS() : {};
    let { ["properties"]: properties, ["items"]: items, ...rest } = schema;
    let { ...uiRest } = uiSchema;

    let newType = type.default.schema.type;
    if (newType == "object") {
      schema = { ...rest, ...type.default.schema };
      uiSchema = { ...uiRest, ...type.default.uiSchema };
    } else if (newType == "array")
      schema = {
        ...rest,
        ...type.default.schema,
        ...{ items: { type: "object", properties: properties } }
      };
    else schema = { ...rest, ...type.default.schema };

    this.props.selectFieldType(
      { schema: schemaPath, uiSchema: uiSchemaPath },
      { schema, uiSchema }
    );
  };

  render() {
    return (
      <Box flex={true}>
        <Box
          direction="row"
          flex={false}
          wrap={true}
          justify="start"
          align="between"
        >
          {Object.entries(fieldTypes).map(([key, type]) => (
            <Box basis="1/2" key={key} pad="small">
              <DraggableBox data={type} key={key}>
                <Box
                  onClick={this._onClick.bind(this, type)}
                  colorIndex="grey-4"
                  flex={false}
                  separator="all"
                  pad={{ horizontal: "small" }}
                  direction="row"
                  justify="between"
                  align="center"
                >
                  <Label size="small">{type.title}</Label>
                </Box>
              </DraggableBox>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

SelectFieldType.propTypes = {
  selectFieldType: PropTypes.func,
  path: PropTypes.array,
  propKey: PropTypes.string
};

export default SelectFieldType;
