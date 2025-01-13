import React, {useEffect} from 'react';
import {useAppDispatch} from "./configureStore";
import {loadPages} from "../ducks/pages";
import {loadKeywords} from "../ducks/keywords";
import PageList from "../ducks/pages/PageList";
import EditPage from "../ducks/pages/EditPage";
import AlertList from "../ducks/alerts/AlertList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadPages());
        dispatch(loadKeywords())
    }, []);

    return (
        <div>
            <AlertList/>
            <Row className="row g-3">
                <Col xs={12} md={6}>
                    <PageList/>
                </Col>
                <Col xs={12} md={6}>
                    <EditPage/>
                </Col>
            </Row>
        </div>
    )
}

export default App;
