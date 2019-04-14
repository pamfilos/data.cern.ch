import React from "react";
import { PropTypes } from "prop-types";

import Box from "grommet/components/Box";
import JSONViewer from "./JSONViewer";
import { Header, Anchor } from "grommet";
import SchemaTree from "../../../containers/SchemaTree";

class SchemaPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "tree"
    };
  }

  render() {
    return (
      <Box
        dirrection="column"
        flex={true}
        justify="between"
        size={{ width: { max: "medium" } }}
      >
        <Header
          size="small"
          colorIndex="grey-4"
          margin="none"
          pad={{ horizontal: "small" }}
        >
          Schema View:
          <a
            style={{ padding: "0 10px", margin: "0 5px" }}
            onClick={() => this.setState({ view: "tree" })}
          >
            Tree
          </a>
          <a
            style={{ padding: "0 10px", margin: "0 5px" }}
            onClick={() => this.setState({ view: "json" })}
          >
            JSON view
          </a>
        </Header>

        {this.state.view == "tree" ? (
          <SchemaTree />
        ) : (
          <Box>
            <JSONViewer title="Schema" data={this.props.schema} />
            <JSONViewer title="UI Schema" data={this.props.uiSchema} />
          </Box>
        )}
      </Box>
    );
  }
}

SchemaPreview.propTypes = {
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};

export default SchemaPreview;
