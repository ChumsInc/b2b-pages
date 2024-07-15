import React, {ChangeEvent, useEffect, useState} from 'react';
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
import {
    loadPage,
    loadPages,
    pageListSorter,
    selectFilteredList,
    selectList,
    selectListLoading, selectSearch, selectShowInactive, selectSort,
    setSearch, setSort, toggleShowInactive
} from "./index";
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
    const list = useAppSelector(selectFilteredList);
    const loading = useAppSelector(selectListLoading);
    const search = useAppSelector(selectSearch);
    const sort = useAppSelector(selectSort);
    const showInactive = useAppSelector(selectShowInactive);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const reloadHandler = () => {
        dispatch(loadPages());
        dispatch(loadKeywords());
    }

    const selectRowHandler = (row:ContentPage) => {
        dispatch(loadPage(row.id));
    }

    useEffect(() => {
        setPage(0)
    }, [list, rowsPerPage]);

    const searchChangeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(ev.target.value));
    }

    const sortChangeHandler = (sort:SortProps) => {
        setSort(sort);
    }

    const pagedData = list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <div className="row g-3 align-items-baseline mb-3">
                <div className="col-auto">Search</div>
                <div className="col">
                    <input type="search" className="form-control form-control-sm" value={search}
                           onChange={searchChangeHandler}/>
                </div>
                <div className="col-auto">
                    <FormCheck type="checkbox" label="Show Inactive"
                               checked={showInactive}
                               onChange={(ev) => dispatch(toggleShowInactive(ev.target.checked))}/>
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-primary" onClick={reloadHandler}>Reload</button>
                </div>
            </div>
            {loading && <LoadingProgressBar animated className="my-1"/>}
            <SortableTable currentSort={sort} onChangeSort={sortChangeHandler} fields={fields} data={pagedData} keyField="id"
                           rowClassName={(row) => classNames({'table-warning': !row.status})}
                           onSelectRow={selectRowHandler}/>
            <TablePagination page={page} onChangePage={setPage} rowsPerPage={rowsPerPage}
                             onChangeRowsPerPage={setRowsPerPage} count={list.length}/>
        </div>
    );

}

export default PageList;
