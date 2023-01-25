import React, { useRef } from "react";
import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import tm from "markdown-it-texmath";
import Toggler from "./RichEditorPreviewPlugin";

import "react-markdown-editor-lite/lib/index.css";
import "katex/dist/katex.min.css";
import "markdown-it-texmath/css/texmath.css";
import "./styles/RichEditorWidget.css";

const RichEditorWidget = props => {
  const mdParser = new MarkdownIt();
  mdParser.use(tm, {
    engine: require("katex"),
    delimiters: "dollars",
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
  });
  let myEditor = useRef(null);

  const renderHTML = text => {
    return mdParser.render(text);
  };
  const handleEditorChange = values => {
    props.onChange(values.text);
  };

  MdEditor.use(Toggler, {
    isEditView: { html: false, md: true },
  });

  return (
    <MdEditor
      style={{ height: "500px" }}
      config={{
        canView: {
          fullScreen: false,
          md: false,
          html: false,
          ...props.canViewProps,
          ...(props.readonly || props.disabled
            ? {
                md: false,
                html: true,
                fullScreen: true,
                menu: false,
                hideMenu: false,
              }
            : {}),
        },
        view: {
          fullScreen: false,
          md: true,
          html: false,
          ...props.viewProps,
          ...(props.readonly || props.disabled
            ? {
                md: false,
                html: true,
                fullScreen: true,
                menu: false,
                hideMenu: false,
              }
            : {}),
        },
      }}
      readOnly={props.readonly}
      renderHTML={renderHTML}
      onChange={handleEditorChange}
      value={props.value}
      ref={myEditor}
    />
  );
};

RichEditorWidget.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  readonly: PropTypes.bool,
  displayedFromModal: PropTypes.bool,
  canViewProps: PropTypes.object,
  viewProps: PropTypes.object,
};

export default RichEditorWidget;