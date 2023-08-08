import React, {useEffect, useState} from 'react';
import {
    FormCheck,
    LoadingProgressBar,
    SortableTable,
    SortableTableField,
    SortProps,
    TablePagination
} from "chums-components";
import {ContentPage} from "b2b-types";
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {loadPage, loadPages, pageListSorter, selectList, selectListLoading} from "./index";
import {loadKeywords} from "../keywords";
import classNames from "classnames";

const fields: SortableTableField<ContentPage>[] = [
    {field: 'id', title: 'ID', sortable: true},
    {field: 'keyword', title: 'Keyword', sortable: true},
    {field: 'title', title: 'Name', sortable: true},
    {field: 'filename', title: 'Filename', sortable: true},
    {field: 'changefreq', title: 'SEO Change Freq.', sortable: true},
    {field: 'priority', title: 'SEO Priority', sortable: true},
];

const PageList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectList);
    const loading = useAppSelector(selectListLoading);
    const [showInactive, setShowInactive] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortProps<ContentPage>>({field: 'keyword', ascending: true});
    const [data, setData] = useState<ContentPage[]>([]);

    const reloadHandler = () => {
        dispatch(loadPages());
        dispatch(loadKeywords());
    }

    const selectRowHandler = (row:ContentPage) => {
        dispatch(loadPage(row.id));
    }

    useEffect(() => {
        const regex = new RegExp('\\b' + search, 'i');
        const data = list.filter(page => showInactive || !!page.status)
            .filter(page => !search.trim() || (regex.test(page.title ?? '') || regex.test(String(page.id))))
            .sort(pageListSorter(sort));
        setData(data);
    }, [search, sort, list, showInactive]);

    const pagedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <div className="row g-3 align-items-baseline mb-3">
                <div className="col-auto">Search</div>
                <div className="col">
                    <input type="search" className="form-control form-control-sm" value={search}
                           onChange={(ev) => setSearch(ev.target.value)}/>
                </div>
                <div className="col-auto">
                    <FormCheck type="checkbox" label="Show Inactive"
                               checked={showInactive}
                               onChange={(ev) => setShowInactive(ev.target.checked)}/>
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-primary" onClick={reloadHandler}>Reload</button>
                </div>
            </div>
            {loading && <LoadingProgressBar animated className="my-1"/>}
            <SortableTable currentSort={sort} onChangeSort={setSort} fields={fields} data={pagedData} keyField="id"
                           rowClassName={(row) => classNames({'table-warning': !row.status})}
                           onSelectRow={selectRowHandler}/>
            <TablePagination page={page} onChangePage={setPage} rowsPerPage={rowsPerPage}
                             onChangeRowsPerPage={setRowsPerPage} count={data.length}/>
        </div>
    );

}

export default PageList;
