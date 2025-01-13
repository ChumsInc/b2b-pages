import React from 'react';
import {useAppSelector} from "../app/configureStore";
import {selectKeywordsList} from "../ducks/keywords";
import Alert from "react-bootstrap/Alert";

const AlertExistingKeyword = ({keyword, pageId}: { keyword: string; pageId: number }) => {
    const keywords = useAppSelector(selectKeywordsList);
    const [kw] = keywords
        .filter(kw => !(kw.pagetype === 'page' && kw.id === pageId))
        .filter(kw => kw.keyword === keyword);
    return kw
        ? <Alert variant="warning" title="Warning:">'{kw.keyword}' already exists. (type: {kw.pagetype})</Alert>
        : null
}
export default AlertExistingKeyword;
