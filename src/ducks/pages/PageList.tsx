import React, {useEffect, useState} from 'react';
import {SortableTable, SortableTableField, SortProps, TablePagination} from "chums-components";
import {ContentPage} from "b2b-types";
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {loadPage, selectFilteredList, selectListLoading, selectSort, setSort} from "./index";
import classNames from "classnames";
import ProgressBar from "react-bootstrap/ProgressBar";
import PageFilters from "./components/PageFilters";

const fields: SortableTableField<ContentPage>[] = [
    {field: 'id', title: 'ID', sortable: true, align: 'end' },
    {field: 'keyword', title: 'Keyword', sortable: true},
    {field: 'title', title: 'Name', sortable: true},
    {field: 'filename', title: 'Filename', sortable: true},
    {field: 'changefreq', title: 'SEO Change Freq.', sortable: true},
    {field: 'priority', title: 'SEO Priority', sortable: true, align: 'end'},
];

const PageList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectFilteredList);
    const loading = useAppSelector(selectListLoading);
    const sort = useAppSelector(selectSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const selectRowHandler = (row: ContentPage) => {
        dispatch(loadPage(row.id));
    }

    useEffect(() => {
        setPage(0)
    }, [list, rowsPerPage]);


    const sortChangeHandler = (sort: SortProps<ContentPage>) => {
        dispatch(setSort(sort));
    }

    const pagedData = list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <PageFilters/>
            {loading && <ProgressBar animated striped className="my-1" variant="primary" now={100}/>}
            <SortableTable currentSort={sort} onChangeSort={sortChangeHandler} fields={fields} data={pagedData}
                           keyField="id"
                           rowClassName={(row) => classNames({'table-warning': !row.status})}
                           onSelectRow={selectRowHandler}/>
            <TablePagination page={page} onChangePage={setPage} rowsPerPage={rowsPerPage}
                             onChangeRowsPerPage={setRowsPerPage} count={list.length}/>
        </div>
    );

}

export default PageList;
