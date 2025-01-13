import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Editor, {DiffEditor, useMonaco} from "@monaco-editor/react";
import Button from "react-bootstrap/Button";

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
        <Modal show onClose={onCancel} size="xl" title={title}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Editor language="html" value={html} options={{tabSize: 4}}
                        theme="github"
                        height="75vh"
                        onChange={(value => setHTML(value ?? ''))}/>
            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="primary" onClick={() => onClose(html)} className="me-1">
                    Close / Apply Changes
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onCancel()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalEditor;
