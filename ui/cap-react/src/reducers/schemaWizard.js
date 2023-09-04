import { Map, fromJS } from "immutable";

import {
  SCHEMA_INIT,
  CURRENT_UPDATE_CONFIG,
  CURRENT_UPDATE_PATH,
  CURRENT_UPDATE_SCHEMA_PATH,
  CURRENT_UPDATE_UI_SCHEMA_PATH,
  PROPERTY_SELECT,
  CREATE_MODE_ENABLE,
  ADD_PROPERTY,
  ADD_PROPERTY_INIT,
  SCHEMA_ERROR,
  SCHEMA_INIT_REQUEST,
  UPDATE_NOTIFICATION_BY_INDEX,
  ADD_NEW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CREATE_NOTIFICATION_GROUP,
  SET_SCHEMA_PERMISSIONS
} from "../actions/schemaWizard";

const initialState = Map({
  current: fromJS({
    schema: {},
    uiSchema: {},
  }),
  initial: fromJS({
    schema: {},
    uiSchema: {},
  }),
  initialConfig: {},
  config: Map({}),
  field: null,
  propKeyEditor: null,
  error: null,
  loader: false,
  version: null,
  permissions: null,
});

export default function schemaReducer(state = initialState, action) {
  switch (action.type) {
    case SCHEMA_INIT_REQUEST:
      return initialState.set("loader", true);
    case SCHEMA_INIT:
      return state
        .set("current", fromJS(action.data))
        .set("initial", fromJS(action.data))
        .set("config", fromJS(action.configs))
        .set("version", action.configs.version)
        .set("initialConfig", action.configs)
        .set("loader", false);

    case SCHEMA_ERROR:
      return state.set("error", action.payload).set("loader", false);

    case ADD_PROPERTY_INIT:
      return state.set(
        "propKeyEditor",
        Map({ path: action.path, type: "new" })
      );
    case ADD_PROPERTY:
      return state
        .setIn(
          ["current", "schema", ...action.path, "properties", action.key],
          fromJS({})
        )
        .set("propKeyEditor", null);
    case PROPERTY_SELECT:
      return state.set(
        "field",
        fromJS({
          path: action.path.schema,
          uiPath: action.path.uiSchema,
        })
      );
    case CREATE_MODE_ENABLE:
      return state.set("field", null);
    case CURRENT_UPDATE_PATH:
      return state
        .setIn(
          ["current", "uiSchema", ...action.path.uiSchema],
          fromJS(action.value.uiSchema)
        )
        .setIn(
          ["current", "schema", ...action.path.schema],
          fromJS(action.value.schema)
        );
    case CURRENT_UPDATE_SCHEMA_PATH:
      return state.setIn(
        ["current", "schema", ...action.path],
        fromJS(action.value)
      );
    case CURRENT_UPDATE_UI_SCHEMA_PATH:
      return state.setIn(
        ["current", "uiSchema", ...action.path],
        fromJS(action.value)
      );
    case CURRENT_UPDATE_CONFIG:
      return state.set("config", fromJS(action.config));
    case UPDATE_NOTIFICATION_BY_INDEX:
      return state.setIn(action.payload.path, action.payload.value);
    case ADD_NEW_NOTIFICATION:
      return state.setIn(action.payload.path, action.payload.item);
    case REMOVE_NOTIFICATION:
      return state.setIn(action.payload.path, action.payload.notification);
    case SET_SCHEMA_PERMISSIONS:
      return state.set("permissions", action.permissions);
    case CREATE_NOTIFICATION_GROUP:
      return state.setIn(action.path, []);
    default:
      return state;
  }
}
