import React from "react";

import Box from "grommet/components/Box";

import { Route } from "react-router-dom";

import DraftEditorHeader from "./DraftEditorHeader";
import DraftDefaultHeader from "./DraftDefaultHeader";

import PropTypes from "prop-types";

class DraftHeader extends React.Component {
  render() {
    return (
      <Box colorIndex="grey-4" flex={false} justify="between" direction="row">
        <Route
          path="/drafts/:draft_id/edit"
          render={props => (
            <DraftEditorHeader {...props} formRef={this.props.formRef} />
          )}
        />
        <Route
          path="/drafts/create/:schema_id"
          render={props => (
            <DraftEditorHeader {...props} formRef={this.props.formRef} />
          )}
        />
        <Route
          path="/drafts/:draft_id/settings"
          component={DraftDefaultHeader}
        />
        <Route exact path="/drafts/:draft_id" component={DraftDefaultHeader} />
      </Box>
    );
  }
}

DraftHeader.propTypes = {
  formRef: PropTypes.object
};

export default DraftHeader;
