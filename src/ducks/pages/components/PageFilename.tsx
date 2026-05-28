import {useId} from 'react';
import FormGroup from "react-bootstrap/FormGroup";
import {FormLabel} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";


export default function PageFilename({value, onChange, id: propsId, ...rest}: FormControlProps) {
    const _id = useId();
    const id = propsId ?? _id;
    return (
        <FormGroup as={Row} gap={3}>
            <FormLabel column="sm" sm={4} htmlFor={id}>Filename</FormLabel>
            <Col sm>
                <FormControl size="sm" type="text" id={id} value={value} onChange={onChange} {...rest} />
            </Col>
        </FormGroup>
    )
}
