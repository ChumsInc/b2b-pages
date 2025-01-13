import React, {useId} from 'react';
import FormGroup from "react-bootstrap/FormGroup";
import {FormCheckProps, FormLabel} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import Row from "react-bootstrap/Row";

export interface KeywordStatusProps {
    slots: {
        status: FormCheckProps;
        requiresLogin: FormCheckProps;
    }
}

export default function PageStatus({slots}: KeywordStatusProps) {
    const statusId = slots.status.id ?? useId();
    const requiresLoginId = slots.requiresLogin.id ?? useId();

    return (
        <FormGroup as={Row} gap={3}>
            <FormLabel column="sm" sm={4}>Status</FormLabel>
            <Col sm>
                <FormCheck id={statusId} {...slots.status} label="Enabled" inline className="me-5"/>
                <FormCheck id={requiresLoginId} {...slots.requiresLogin} label="Requires Login" inline/>
            </Col>
        </FormGroup>
    )
}
