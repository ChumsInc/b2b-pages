import {type TextareaHTMLAttributes, useId} from 'react';
import Col from "react-bootstrap/Col";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import PageFormGroup from "./PageFormGroup";
import styled from "@emotion/styled";


export interface PageTextAreaProps extends FormControlProps {
    label: string;
    canZoom?: boolean;
    onZoom?: () => void;
    textAreaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;
}

const TextArea = styled.textarea`
    field-sizing: content;
    min-height: 5vh !important;
    max-height: 33.333vh;
    overflow: auto;
    white-space: pre-wrap;
    max-width: 100%;
`

export default function PageTextArea({
                                         label,
                                         canZoom,
                                         onZoom,
                                         textAreaProps,
                                         value,
                                         onChange,
                                         required,
                                         ...rest
                                     }: PageTextAreaProps) {
    const _id = useId();
    const id = rest.id ?? _id;
    return (
        <PageFormGroup id={id} label={(
            <>
                <label className="me-1" htmlFor={id}>{label}</label>
                <Button variant="link" disabled={!canZoom} onClick={onZoom}>
                    <span className="bi-pencil-square" title="Open in editor" />
                </Button>
            </>
        )} required={required}>
            <Col sm={8} lg={9}>
                <FormControl size="sm" as={TextArea} id={id} value={value} onChange={onChange}
                             className="font-monospace"
                             required={required}  {...textAreaProps ?? {minRows: 3, maxRows: 10}} {...rest} />
            </Col>
        </PageFormGroup>
    )
}
