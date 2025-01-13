import React from 'react';
import Row from "react-bootstrap/Row";
import FormGroup, {FormGroupProps} from "react-bootstrap/FormGroup";
import FormLabel, {FormLabelProps} from "react-bootstrap/FormLabel";

export interface PageFormGroupProps extends FormGroupProps {
    id?: string;
    gap?: number;
    label: string | React.ReactNode;
    required?: boolean;
    labelProps?: FormLabelProps;
    children?: React.ReactNode;
}

export default function PageFormGroup({gap, className, id, label, required, labelProps, children}: PageFormGroupProps) {
    return (
        <FormGroup as={Row} gap={gap ?? 3} id={id} className={className ?? "mb-1"}>
            <FormLabel column="sm" sm={4} htmlFor={id} {...labelProps}>
                {label}
                {required && <span className="ms-1">*</span>}
            </FormLabel>
            {children}
        </FormGroup>
    )
}
