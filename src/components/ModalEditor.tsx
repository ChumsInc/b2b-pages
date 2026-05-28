import {startTransition, useEffect, useState} from 'react';
import Modal, {type ModalProps} from "react-bootstrap/Modal";
import Editor, {type EditorProps} from "@monaco-editor/react";
import Button from "react-bootstrap/Button";
import {useBootstrapTheme} from "@/app/useBootstrapTheme.ts";

interface ModalEditorProps extends ModalProps {
    title: string,
    content: string|null,
    editDisabled?: boolean,
    slotProps?: {
        editor?: EditorProps
    }
    onClose: (content: string) => void,
    onCancel: () => void,
}

export default function ModalEditor({title, content, show, editDisabled, slotProps, onClose, onCancel}: ModalEditorProps) {
    const [html, setHTML] = useState(content ?? '');
    const bsTheme = useBootstrapTheme();

    const theme = bsTheme === 'dark' ? 'vs-dark' : 'vs';

    useEffect(() => {
        startTransition(() => {
            setHTML(content ?? '');
        })
    }, [content]);

    const changeHandler = (value: string|undefined) => {
        setHTML(value ?? '');
    }

    return (
        <Modal show={show} onHide={() => onCancel()} size="xl" title={title} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Editor language="html" value={html} options={{tabSize: 4}}
                        theme={theme}
                        height="75vh"
                        {...slotProps?.editor}
                        onChange={changeHandler}/>
            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="primary" disabled={editDisabled} onClick={() => onClose(html)} className="me-1">
                    Close / Apply Changes
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onCancel()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
};
