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
    const statusId = slots.status.id ?? useId();
    const requiresLoginId = slots.requiresLogin.id ?? useId();

    return (
        <FormGroup as={Row} gap={3}>
            <FormLabel column={true} sm={4} lg={3}>Status</FormLabel>
            <Col sm>
                <FormCheck id={statusId} {...slots.status} label="Enabled" inline className="me-5"/>
                <FormCheck id={requiresLoginId} {...slots.requiresLogin} label="Requires Login" inline/>
            </Col>
        </FormGroup>
    )
}
