import importDataField from "./importDataField";
import CapFiles from "./CapFiles";
import JSONEditorField from "./JSONEditorField/JSONEditorField";
import AccordionJSONEditorField from "./JSONEditorField/AccordionJSONEditorField";
import ServiceIDGetter from "./ServiceIDGetter";
import PasteArrayField from "./PasteArrayField";

const fields = {
  ImportDataField: importDataField,
  CapFiles: CapFiles,
  jsoneditor: JSONEditorField,
  accordion_jsoneditor: AccordionJSONEditorField,
  idFetcher: ServiceIDGetter,
  PasteArrayField: PasteArrayField
};

export default fields;
