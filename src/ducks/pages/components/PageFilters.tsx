import {type ChangeEvent, useId} from 'react';
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import {loadPages, selectSearch, selectShowInactive, setSearch, toggleShowInactive} from "../index";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadKeywords} from "../../keywords/actions.ts";

export default function PageFilters() {
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectSearch);
    const showInactive = useAppSelector(selectShowInactive);
    const showInactiveId = useId()

    const reloadHandler = () => {
        dispatch(loadPages());
        dispatch(loadKeywords());
    }

    const searchChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(ev.target.value));
    }

    return (
        <Row gap={3} className="align-items-baseline mb-3">
            <Col xs="auto">Search</Col>
            <Col xs>
                <FormControl size="sm" type="search" value={search} onChange={searchChangeHandler}/>
            </Col>
            <Col xs="auto">
                <FormCheck type="checkbox" label="Show Inactive" id={showInactiveId}
                           checked={showInactive}
                           onChange={(ev) => dispatch(toggleShowInactive(ev.target.checked))}/>
            </Col>

            <Col xs="auto">
                <Button type="button" size="sm" variant="primary" onClick={reloadHandler}>Reload</Button>
            </Col>
        </Row>
    )
}
