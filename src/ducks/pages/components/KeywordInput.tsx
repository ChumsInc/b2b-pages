import {useId} from 'react';
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";
import KeywordExistsAlert from "@/components/AlertExistingKeyword";
import {InputGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import PageFormGroup from "./PageFormGroup";

export interface KeywordInputProps extends FormControlProps {
    pageId: number;
    value: string;
}

export default function KeywordInput({pageId, value, onChange, id: propsId, ...rest}: KeywordInputProps) {
    const _id = useId();
    const id = propsId ?? _id;

    return (
        <PageFormGroup id={id} required label="Keyword">
            <Col sm>
                <InputGroup size="sm">
                    <InputGroup.Text>ID: <span className="ms-1">{pageId || 'NEW'}</span></InputGroup.Text>
                    <FormControl type="text" size="sm" name="keyword" value={value} onChange={onChange} required={true} id={id} {...rest}/>
                </InputGroup>
                <KeywordExistsAlert keyword={value ?? ''} pageId={pageId}/>
            </Col>
        </PageFormGroup>
    )
}
