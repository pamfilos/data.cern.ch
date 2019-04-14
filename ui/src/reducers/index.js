import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import search from "./searchReducer";
import auth from "./authReducer";
import drafts from "./drafts";
import published from "./published";
import users from "./users";
import dashboard from "./dashboard";
import workflows from "./workflows";
import schemaWizard from "./schemaWizard";

const rootReducer = history =>
  combineReducers({
    auth,
    users,
    drafts,
    dashboard,
    search,
    published,
    workflows,
    schemaWizard,
    routing: connectRouter(history),
    router: connectRouter(history)
  });

export default rootReducer;
