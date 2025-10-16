import {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Editor from "@monaco-editor/react";
import Button from "react-bootstrap/Button";

interface ModalEditorProps {
    title: string,
    content: string,
    onClose: (content: string) => void,
    onCancel: () => void,
}

export default function ModalEditor({title, content, onClose, onCancel}: ModalEditorProps) {
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
