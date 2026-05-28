import {useId} from 'react';
import {type FormSelectProps, InputGroup} from "react-bootstrap";
import PageFormGroup, {type PageFormGroupProps} from "./PageFormGroup";
import Col from "react-bootstrap/Col";
import SEOChangeSelect from "@/components/SEOChangeSelect";
import SEOPrioritySelect from "@/components/SEOPrioritySelect";

export interface PageSEOOptionsProps extends PageFormGroupProps {
    slots: {
        changes: FormSelectProps & Required<Pick<FormSelectProps, 'value' | 'onChange'>>;
        priority: FormSelectProps & Required<Pick<FormSelectProps, 'value' | 'onChange'>>;
    }
}

export default function PageSEOOptions({label, slots}: PageSEOOptionsProps) {
    const _changesId = useId();
    const _priorityId = useId();
    const changesId = slots.changes.id ?? _changesId;
    const priorityId = slots.priority.id ?? _priorityId;

    return (
        <PageFormGroup label={label}>
            <Col>
                <InputGroup size="sm">
                    <InputGroup.Text as="label" htmlFor={changesId}>Change Freq</InputGroup.Text>
                    <SEOChangeSelect  {...slots.changes}
                                      value={slots.changes.value as string} onChange={slots.changes.onChange}
                                      id={changesId}/>
                </InputGroup>
            </Col>
            <Col>
                <InputGroup size="sm">
                    <InputGroup.Text as="label" htmlFor={priorityId}>Priority</InputGroup.Text>
                    <SEOPrioritySelect {...slots.priority}
                                       value={slots.priority.value as number} onChange={slots.priority.onChange}
                                       id={priorityId}/>
                </InputGroup>
            </Col>
        </PageFormGroup>
    )
}
