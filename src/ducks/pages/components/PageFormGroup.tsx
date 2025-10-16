import Row from "react-bootstrap/Row";
import FormGroup, {type FormGroupProps} from "react-bootstrap/FormGroup";
import FormLabel, {type FormLabelProps} from "react-bootstrap/FormLabel";
import type {ReactNode} from "react";

export interface PageFormGroupProps extends FormGroupProps {
    id?: string;
    gap?: number;
    label: string;
    required?: boolean;
    labelProps?: FormLabelProps;
    children?: ReactNode;
}

export default function PageFormGroup({gap, className, id, label, required, labelProps, children}: PageFormGroupProps) {
    return (
        <FormGroup as={Row} gap={gap ?? 3} id={id} className={className ?? "mb-1"}>
            <FormLabel column={true} sm={4} lg={3} htmlFor={id} {...labelProps}>
                {label}
                {required && <span className="ms-1">*</span>}
            </FormLabel>
            {children}
        </FormGroup>
    )
}
