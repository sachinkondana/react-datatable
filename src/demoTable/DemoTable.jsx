import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';

import CountryActions from './actions';

import './DemoTable.module.scss';

const TABLE_COLUMNS = [{
  name: 'Name',
  key: 'name',
  sortByKey: 'name', // this gives flexbality over display content
}, {
  name: 'Code',
  key: 'alpha2Code',
  sortByKey: 'alpha2Code',
}, {
  name: 'Capital',
  key: 'capital',
  sortByKey: 'capital',
}, {
  name: 'Region',
  key: 'region',
  sortByKey: 'region',
}, {
  name: 'Area (km²)',
  key: 'area',
  sortByKey: 'area',
}];

function DemoTable() {
  const [list, setList] = useState(null);

  useEffect(() => {
    CountryActions.getCountries().then(d => setList(d));
  }, []);

  return (
    <DataTable
      columns={TABLE_COLUMNS}
      data={list}
      isStickyHeader
      pagination
      pageLimit={10}
    />
  );
}

export default DemoTable;
