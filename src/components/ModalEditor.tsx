import React, {useEffect, useState} from 'react';
import Modal from "chums-components/dist/Modal";
import Editor, {DiffEditor, useMonaco} from "@monaco-editor/react";

interface ModalEditorProps {
    title: string,
    content: string,
    onClose: (content: string) => void,
    onCancel: () => void,
}

const ModalEditor: React.FC<ModalEditorProps> = ({title, content, onClose, onCancel}) => {
    const [html, setHTML] = useState(content || '');

    useEffect(() => {
        setHTML(content);
    }, [content]);

    return (
        <Modal onClose={onCancel} size="lg" title={title}>
            <Editor language="html" value={html} options={{tabSize: 4}}
                      theme="github"
                    height="75vh"
                      onChange={(value => setHTML(value ?? ''))}/>
            <div>
                <button onClick={() => onClose(html)} className="btn btn-sm btn-primary me-1">Close / Apply Changes
                </button>
                <button onClick={() => onCancel()} className="btn btn-sm btn-secondary">Cancel</button>
            </div>
        </Modal>
    )
};

export default ModalEditor;
