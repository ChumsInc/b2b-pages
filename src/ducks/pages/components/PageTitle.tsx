import {useId} from 'react';
import FormGroup from "react-bootstrap/FormGroup";
import {FormLabel} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";


export default function PageTitle({value, onChange, ...rest}: FormControlProps) {
    const id = rest.id ?? useId();
    return (
        <FormGroup as={Row} gap={3} id={id}>
            <FormLabel column="sm" sm={4} htmlFor={id}>Title *</FormLabel>
            <Col sm>
                <FormControl size="sm" type="text" id={id} value={value} onChange={onChange} {...rest} />
            </Col>
        </FormGroup>
    )
}
