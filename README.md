## Demo link
https://nifty-wiles-952c5f.netlify.app/

Please make sure to create '.env' file to run demo(if not created already).

### .env
```
REACT_APP_API_URL=https://restcountries.eu/rest/v2
```


How to use?

```
<DataTable
    columns={TABLE_COLUMNS}
    data={list}
    isStickyHeader
    pagination
    pageLimit={10}
/>
```

Here `list` is an array consists of all data.

and 

TABLE_COLUMNS will be configurable column array and it looks like bellow,

```
const TABLE_COLUMNS = [{
  name: 'Name',
  key: 'name',
  sortByKey: 'name', // this gives flexibility over display content
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
```

## Available configurations

`sortByKey` - this will provide an option at table header to sort column

`key` - to map data in the cell

`isStickyHeader` - To enable sticky header on page scroll

`pagination` - To enable pagination

`pageLimit` - Number of items per page

#### Defaults:
`sortByKey` - user defined

`key` - user defined

`isStickyHeader` - false

`pagination` - false

`pageLimit` - 5


## Available Scripts

In the project directory, you can run:

### `npm i`

To install all project dependencies. Then

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
