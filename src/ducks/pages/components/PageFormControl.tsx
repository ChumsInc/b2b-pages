import {useId} from 'react';
import Col from "react-bootstrap/Col";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";
import PageFormGroup from "./PageFormGroup";

export interface PageFormControlProps extends FormControlProps {
    label: string;
}

export default function PageFormControl({label, value, onChange, required, ...rest}: PageFormControlProps) {
    const id = rest.id ?? useId();
    return (
        <PageFormGroup gap={3} id={id} label={label} required={required}>
            <Col sm>
                <FormControl size="sm" type="text" id={id} value={value} onChange={onChange}
                             required={required} {...rest} />
            </Col>
        </PageFormGroup>
    )
}
