import {useEffect} from 'react';
import {useAppDispatch} from "./configureStore";
import {loadPages} from "@/ducks/pages";
import {loadKeywords} from "@/ducks/keywords";
import PageList from "../ducks/pages/PageList";
import EditPage from "../ducks/pages/EditPage";
import AppAlertList from "../ducks/alerts/AppAlertList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppContainer from "@/app/AppContainer.ts";


const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadPages());
        dispatch(loadKeywords())
    }, []);

    return (
        <AppContainer>
            <AppAlertList/>
            <Row className="row g-3">
                <Col xs={12} md={6}>
                    <PageList/>
                </Col>
                <Col xs={12} md={6}>
                    <EditPage/>
                </Col>
            </Row>
        </AppContainer>
    )
}

export default App;
