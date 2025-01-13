import React, {useId} from 'react';
import {FormSelectProps, InputGroup} from "react-bootstrap";
import PageFormGroup from "./PageFormGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SEOChangeSelect from "../../../components/SEOChangeSelect";
import SEOPrioritySelect from "../../../components/SEOPrioritySelect";

export interface PageSEOOptionsProps {
    label: string;
    slots: {
        changes: FormSelectProps & Required<Pick<FormSelectProps, 'value'|'onChange'>>;
        priority: FormSelectProps & Required<Pick<FormSelectProps, 'value'|'onChange'>>;
    }
}

export default function PageSEOOptions({label, slots}: PageSEOOptionsProps) {
    const changesId = slots.changes.id ?? useId();
    const priorityId = slots.priority.id ?? useId();

    return (
        <PageFormGroup label={label}>
            <Col>
                <Row gap={3}>
                    <Col xs={6}>
                        <InputGroup size="sm">
                            <InputGroup.Text as="label" htmlFor={changesId}>Change Freq</InputGroup.Text>
                            <SEOChangeSelect  {...slots.changes}
                                              value={slots.changes.value as string} onChange={slots.changes.onChange}
                                              id={changesId}/>
                        </InputGroup>
                    </Col>
                    <Col xs={6}>
                        <InputGroup size="sm">
                            <InputGroup.Text as="label" htmlFor={priorityId}>Priority</InputGroup.Text>
                            <SEOPrioritySelect {...slots.priority}
                                               value={slots.priority.value as number} onChange={slots.priority.onChange}
                                               id={priorityId} />
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
        </PageFormGroup>
    )
}
