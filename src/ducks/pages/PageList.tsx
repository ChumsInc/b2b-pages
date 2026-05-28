import {startTransition, useEffect, useState} from 'react';
import {SortableTable, type SortProps, TablePagination} from "@chumsinc/sortable-tables";
import type {ContentPage} from "chums-types/b2b";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadPage, selectFilteredList, selectListLoading, selectSort, setSort} from "./index";
import classNames from "classnames";
import ProgressBar from "react-bootstrap/ProgressBar";
import PageFilters from "./components/PageFilters";
import {pageListFields} from "@/ducks/pages/pageListFields.tsx";


const PageList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectFilteredList);
    const loading = useAppSelector(selectListLoading);
    const sort = useAppSelector(selectSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const selectRowHandler = (row: ContentPage) => {
        dispatch(loadPage(row.id));
    }

    useEffect(() => {
        startTransition(() => {
            setPage(0)
        })
    }, [sort, rowsPerPage]);

    useEffect(() => {
        if (list.length < page * rowsPerPage) {
            startTransition(() => {
                setPage(0)
            })
        }
    }, [list.length, page, rowsPerPage]);


    const sortChangeHandler = (sort: SortProps<ContentPage>) => {
        dispatch(setSort(sort));
    }

    const pagedData = list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="container-fluid">
            <PageFilters/>
            {loading && <ProgressBar animated striped className="my-1" variant="primary" now={100}/>}
            <SortableTable size="xs" currentSort={sort} onChangeSort={sortChangeHandler} fields={pageListFields}
                           data={pagedData}
                           keyField="id"
                           rowClassName={(row) => classNames({'table-warning': !row.status})}
                           onSelectRow={selectRowHandler}/>
            <TablePagination page={page} onChangePage={setPage} rowsPerPage={rowsPerPage} size="sm"
                             rowsPerPageProps={{onChange: setRowsPerPage}}
                             count={list.length}/>
        </div>
    );

}

export default PageList;
