import type {ContentPage} from "chums-types/b2b";
import type {SortableTableField} from "@chumsinc/sortable-tables";

export const pageListFields: SortableTableField<ContentPage>[] = [
    {field: 'id', title: 'ID', sortable: true, align: 'end'},
    {field: 'keyword', title: 'Keyword', sortable: true},
    {field: 'title', title: 'Name', sortable: true},
    {field: 'filename', title: 'Filename', sortable: true},
    {field: 'redirectTo', title: 'Redirect To', sortable: true}
];

