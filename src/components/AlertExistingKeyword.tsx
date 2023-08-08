import React from 'react';
import {useAppSelector} from "../app/configureStore";
import {selectKeywordsList} from "../ducks/keywords";
import {Alert} from "chums-components";

const AlertExistingKeyword = ({keyword, id}: { keyword: string; id: number }) => {
    const keywords = useAppSelector(selectKeywordsList);
    const [kw] = keywords
        .filter(kw => !(kw.pagetype === 'page' && kw.id === id))
        .filter(kw => kw.keyword === keyword);
    return kw
        ? <Alert color="warning" title="Warning:">'{kw.keyword}' already exists. (type: {kw.pagetype})</Alert>
        : null
}
export default AlertExistingKeyword;
