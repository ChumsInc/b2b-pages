import {useId} from 'react';
import Col from "react-bootstrap/Col";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";
import PageFormGroup from "./PageFormGroup";

export interface PageFormControlProps extends FormControlProps {
    label: string;
    helpText?: string;
}

export default function PageFormControl({label, value, onChange, required, id: propsId, helpText, ...rest}: PageFormControlProps) {
    const _id = useId();
    const id = propsId ?? _id;
    return (
        <PageFormGroup gap={3} id={id} label={label} required={required}>
            <Col sm>
                <FormControl size="sm" type="text" id={id} value={value} onChange={onChange}
                             required={required} {...rest} />
                {!!helpText && (
                    <div className="text-secondary"><small>{helpText}</small></div>
                )}
            </Col>
        </PageFormGroup>
    )
}
