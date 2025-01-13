import React, {useId} from 'react';
import FormControl, {FormControlProps} from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import KeywordExistsAlert from "../../../components/AlertExistingKeyword";
import {InputGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import PageFormGroup from "./PageFormGroup";

export interface KeywordInputProps extends FormControlProps{
    pageId: number;
    value: string;
}
export default function KeywordInput({pageId, value, onChange, ...props}:KeywordInputProps) {
    const id = props.id ?? useId();
    return (
        <PageFormGroup id={id} required label="Keyword">
            <Col sm>
                <InputGroup size="sm">
                    <InputGroup.Text>ID: <span className="ms-1">{pageId || 'NEW' }</span></InputGroup.Text>
                    <FormControl type="text" size="sm" value={value} onChange={onChange} required={true}/>
                </InputGroup>
                <KeywordExistsAlert keyword={value ?? ''} pageId={pageId}/>
            </Col>
        </PageFormGroup>
    )
}
