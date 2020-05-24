import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DataTableRow from './DataTableRow';
import DataTableHeaderCell from './DataTableHeaderCell';
import DataTableCell from './DataTableCell';

import { isArray, isEmpty, sortByKey, searchByKeys } from './Utils';

import './icons/style.css';
import styles from './DataTable.module.scss';

const TOTAL_PAGINATION = 5;

function DataTable(props) {
    const { columns, data, isStickyHeader, pagination, pageLimit } = props;
    const [sortKey, setSortKey] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [limit, setLimit] = useState(pageLimit);
    const [page, setPage] = useState(0);

    if (!isArray(data)) return <></>;

    const santizeData = (d) => {
        let finalData = d;

        if (!isEmpty(searchQuery)) {
            const searchKeys = columns.map(d => d.key);
            finalData = searchByKeys(d, searchKeys, searchQuery)
        }

        if (!isEmpty(sortKey)) {
            finalData = sortByKey(finalData, sortKey);
        }

        return finalData;
    };

    const sortColumn = (key) => {
        if (key) {
            if (sortKey === key) {
                setSortKey(`-${key}`);
            } else {
                setSortKey(key);
            }
        }
    };

    const isSortedColumn = (key) => {
        // assuming there won't be any secondary sorting
        return [key, `-${key}`].includes(sortKey);
    };

    const getEmptyText = () => {
        if (isEmpty(data)) {
            return 'No Data';
        }

        if (!isEmpty(searchQuery)) {
            return `No results found for '${searchQuery}'`;
        }
    };

    const onChangePageLimit = (e) => {
        const value = e.target.value;

        if (!isEmpty(value)) {
            setPage(0);
            setLimit(parseInt(value));
        }
    };

    const onChangeSearchQuery = (e) => {
        setPage(0);
        setSearchQuery(e.target.value);
    }

    const renderRows = (item, index) => {
        return (
            <DataTableRow key={index}>
                {columns.map((c, cIndex) => {
                    const cellClass = isSortedColumn(c.sortByKey) ? styles.highlightCell : null;

                    return (
                        <DataTableCell className={cellClass} key={cIndex}>{item[c.key]}</DataTableCell>
                    );
                })}
            </DataTableRow>
        );
    };

    const renderSortIcon = (key) => {
        const iconClass = (sortKey === `-${key}`) ? 'icon-arrow-up2' : 'icon-arrow-down2';

        return (
            <span className={`${iconClass} ${styles.sortIcon}`}></span>
        );
    };

    const renderHeader = () => {
        const extraClasses = isStickyHeader ? styles.sticky : null;

        return (
            <DataTableRow>
                {columns.map((c, i) => {
                    const cellClass = isSortedColumn(c.sortByKey) ? styles.highlightCell : null;
                    const cursorClass = c.sortByKey ? styles.cursor : null;

                    return (
                        <DataTableHeaderCell
                            className={`${cellClass} ${cursorClass} ${extraClasses}`}
                            key={i}
                            onClick={() => sortColumn(c.sortByKey)}
                        >
                            <div>
                                {c.name}
                                {c.sortByKey && renderSortIcon(c.sortByKey)}
                            </div>
                        </DataTableHeaderCell>
                    );
                })}
            </DataTableRow>
        );
    };

    const tableData = santizeData(data);
    const startIndex = page * limit;

    // pick only display data with limits
    const tableDataWithLimits = pagination
        ? tableData.slice(startIndex, startIndex + limit)
        : tableData;

    const renderPageNumbers = () => {
        const totalPages = Math.ceil(tableData.length / limit);
        const pages = [];

        for (let i = 0; i < totalPages; i++) {
            const pageClass = (i === page) ? styles.current : null;
            pages.push(
                <div
                    className={pageClass}
                    key={i}
                    onClick={() => setPage(i)}
                >
                    {i + 1}
                </div>
            );
        }

        const start = (totalPages - page) < TOTAL_PAGINATION
            ? totalPages - TOTAL_PAGINATION
            : page;
        return pages.slice(start, page + TOTAL_PAGINATION);
    };

    const renderPagination = () => {
        const disablePrev = page === 0;
        const disableNext = tableData.length <= ((page + 1) * limit);

        const showPrevPage = () => {
            setPage(page - 1);
        };

        const showNextPage = () => {
            setPage(page + 1);
        };

        return (
            <div className={styles.pageWrap}>
                <div className={styles.page}>
                    <button onClick={showPrevPage} disabled={disablePrev}>Prev</button>
                    <div className={styles.number}>{renderPageNumbers()}</div>
                    <button onClick={showNextPage} disabled={disableNext}>Next</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.settings}>
                <div>
                    {pagination && (
                        <>
                            Show <input
                                className={styles.searchBox}
                                type="number"
                                defaultValue={limit}
                                onKeyUp={onChangePageLimit}
                                max={tableData.length}
                            /> entries
                    </>
                    )}
                </div>
                <div>
                    Search:
                        <input
                        className={styles.searchBox}
                        type="text"
                        defaultValue={searchQuery}
                        onKeyUp={onChangeSearchQuery}
                    />
                </div>
            </div>
            <table className={styles.tbl} border="0">
                <thead>
                    {renderHeader(columns)}
                </thead>
                <tbody>
                    {isEmpty(tableData) ? (
                        <tr>
                            <td colSpan={columns.length}>{getEmptyText()}</td>
                        </tr>
                    ) : tableDataWithLimits.map(renderRows)}
                </tbody>
            </table>
            {pagination && renderPagination()}
        </>
    );
}

DataTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    isStickyHeader: PropTypes.bool,
    pagination: PropTypes.bool,
    pageLimit: PropTypes.number,
};

DataTable.defaultProps = {
    data: null,
    columns: null,
    isStickyHeader: false,
    pagination: false,
    pageLimit: 5,
};

export default DataTable;