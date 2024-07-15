import React, {useEffect} from 'react';
import {useAppDispatch} from "./configureStore";
import {loadPages} from "../ducks/pages";
import {loadKeywords} from "../ducks/keywords";
import PageList from "../ducks/pages/PageList";
import EditPage from "../ducks/pages/EditPage";
import AlertList from "../ducks/alerts/AlertList";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadPages());
        dispatch(loadKeywords())
    }, []);

    return (
        <div>
            <AlertList/>
            <div className="row g-3">
                <div className="col-6">
                    <PageList/>
                </div>
                <div className="col-6">
                    <EditPage/>
                </div>
            </div>
        </div>
    )
}

export default App;
