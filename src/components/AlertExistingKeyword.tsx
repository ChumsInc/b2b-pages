import {useAppSelector} from "@/app/configureStore";
import {selectAllKeywords} from "@/ducks/keywords";
import Alert from "react-bootstrap/Alert";

export default function AlertExistingKeyword({keyword, pageId}: { keyword: string; pageId: number }) {
    const keywords = useAppSelector(selectAllKeywords);
    const existing = keywords
        .filter(kw => !(kw.pagetype === 'page' && kw.id === pageId))
        .find(kw => kw.keyword === keyword);

    if (!existing) {
        return null
    }

    return (
        <Alert variant="warning" title="Warning:">
            '{existing.keyword}' already exists. (type: {existing.pagetype})
        </Alert>
    )
}
