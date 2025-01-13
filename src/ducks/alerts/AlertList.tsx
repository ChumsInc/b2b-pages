import React from 'react';
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import {useAppDispatch} from "../../app/configureStore";
import ContextAlert from "./ContextAlert";

const AlertList = () => {
    const dispatch = useAppDispatch();
    const alerts = useSelector(selectAlerts);

    const dismissHandler = (key: string | number) => dispatch(dismissAlert(key));

    return (
        <div>
            {Object.keys(alerts).map(key => (
                <ContextAlert key={key} color={alerts[key].color} dismissible onClose={() => dismissHandler(key)}
                              count={alerts[key].count}>
                    {!!alerts[key].error && (
                        <div style={{whiteSpace: 'pre-wrap'}}>{alerts[key].error?.stack}</div>
                    )}
                </ContextAlert>
            ))}
        </div>
    )
}

export default AlertList;
