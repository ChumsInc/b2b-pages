import type {SortProps} from "chums-types";
import type {ContentPage} from "b2b-types";

export const pageListSorter = (sort: SortProps<ContentPage>) => (a: ContentPage, b: ContentPage) => {
    const sortMod = sort.ascending ? 1 : -1;
    switch (sort.field) {
        case 'keyword':
        case 'title':
        case 'filename':
        case 'changefreq':
            return (
                (a[sort.field] ?? '').toLowerCase() === (b[sort.field] ?? '').toLowerCase()
                    ? (a.id - b.id)
                    : ((a[sort.field] ?? '').toLowerCase() > (b[sort.field] ?? '').toLowerCase() ? 1 : -1)
            ) * sortMod;
        case 'priority':
            return (
                a.priority === b.priority
                    ? (a.id - b.id)
                    : (a.priority - b.priority)
            ) * sortMod;
        default:
            return (a.id - b.id) * sortMod;
    }
}
