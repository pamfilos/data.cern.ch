import { connect } from "react-redux";
import PropertyEditor from "../components/SchemaWizard/PropertyEditor";
import { addProperty } from "../../../actions/schemaWizard";

function mapStateToProps(state) {
  return {
    path: state.schemaWizard.getIn(["field"]),
    propKeyEditor: state.schemaWizard.get("propKeyEditor")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addProperty: (path, key) => dispatch(addProperty(path, key))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyEditor);
