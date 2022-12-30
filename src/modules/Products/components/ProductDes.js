import React, { useEffect, useState } from "react";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useFormikContext } from "formik";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import ReactHtmlParser from 'react-html-parser';

const ProductDes = ({ des, isReinit }) => {
  const { values } = useFormikContext();
  const [block, setBlock] = useState(convertFromHTML(""));
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(block.contentBlocks, block.entityMap)
    )
  );
  // const _contentState = ContentState.createFromText('Sample content state');
  // const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
  // const [contentState, setContentState] = useState(raw); // ContentState JSON
  // const storedstate = "<p>Chi tiet<br>1</p> <p>2</p> <p>3</p> <p></p>"
  const handleChangeContent = (editorState) => {
    setEditorState(editorState);
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    values.product_des = text;
  };

  useEffect(() => {
    setBlock(convertFromHTML(des));
    // eslint-disable-next-line
  }, [des, isReinit]);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(block.contentBlocks, block.entityMap)
      )
    );
  }, [block]);

  return (
    <div>
      <label htmlFor="des">
        <span className="label-text">Product Description</span>
      </label>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChangeContent}
        wrapperClassName="wrapper-class"
        toolbarClassName="toolbar-class"
      />
      {/* <div>
        { ReactHtmlParser(storedstate) }
      </div> */}
    </div>
  );
};

export default ProductDes;
