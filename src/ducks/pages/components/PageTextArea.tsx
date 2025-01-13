import React, {useId} from 'react';
import FormGroup from "react-bootstrap/FormGroup";
import {FormCheckProps, FormLabel} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import Row from "react-bootstrap/Row";
import FormControl, {FormControlProps} from "react-bootstrap/FormControl";
import {TextareaAutosize, TextareaAutosizeProps} from '@mui/base/TextareaAutosize'
import Button from "react-bootstrap/Button";
import PageFormGroup from "./PageFormGroup";

export interface PageTextAreaProps extends FormControlProps {
    label: string;
    canZoom?: boolean;
    onZoom?: () => void;
    textAreaProps?: Omit<TextareaAutosizeProps, 'value'|'onChange'>;
}
export default function PageTextArea({label, canZoom, onZoom, textAreaProps, value, onChange, required, ...rest}: PageTextAreaProps) {
    const id = rest.id ?? useId();
    return (
        <PageFormGroup id={id} label={label} required={required}>
            <Col sm>
                <FormControl size="sm" as={TextareaAutosize} id={id} value={value} onChange={onChange}
                             className="font-monospace"
                             required={required}  {...textAreaProps ?? {minRows: 3, maxRows: 10}} {...rest} />
            </Col>
            {canZoom && (
                <Col sm="auto">
                    <Button type="button" size="sm" variant="outline-secondary" onClick={onZoom}>
                        <span className="bi-pencil-square" />
                    </Button>
                </Col>
            )}
        </PageFormGroup>
    )
}
