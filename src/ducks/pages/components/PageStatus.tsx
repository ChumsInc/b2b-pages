import {useId} from 'react';
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Col from "react-bootstrap/Col";
import FormCheck, {type FormCheckProps} from "react-bootstrap/FormCheck";
import Row from "react-bootstrap/Row";

export interface KeywordStatusProps {
    slots: {
        status: FormCheckProps;
        requiresLogin: FormCheckProps;
    }
}

export default function PageStatus({slots}: KeywordStatusProps) {
    const _statusId = useId();
    const _requiresLoginId = useId();
    const statusId = slots.status.id ?? _statusId;
    const requiresLoginId = slots.requiresLogin.id ?? _requiresLoginId;

    return (
        <FormGroup as={Row} gap={3} className="align-items-center">
            <FormLabel column={true} sm={4} lg={3}>Status</FormLabel>
            <Col xs="auto">
                <FormCheck id={statusId} {...slots.status} label="Enabled" inline className="me-5"/>
            </Col>
            <Col xs="auto">
                <FormCheck id={requiresLoginId} {...slots.requiresLogin} label="Requires Login" inline/>
            </Col>
        </FormGroup>
    )
}
