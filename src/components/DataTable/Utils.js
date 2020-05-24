function toString(value) {
    return value == null ? '' : value + '';
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isNull(d) {
    return d === null || d === undefined;
}

export function isEmpty(d) {
    if (isNull(d)) return true;

    if(d === '') return true;

    return (
        (Array.isArray(d) || isNaN(d)) &&
        (d.length === 0 || Object.keys(d).length === 0)
    );
}

export function isArray(ary) {
    return Array.isArray(ary);
}

export function sortByKey(array, key) {
    if (!key) return array;

    let isAsc = true;

    if (key.charAt(0) === '-') {
        isAsc = false;
        key = key.substr(1);
    }

    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (isAsc)
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));

        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

export function searchByKeys(array, keys, str) {
    const searchQuery = escapeRegExp(str);
    const regExp = new RegExp(toString(searchQuery), 'gi');

    return array.filter((item) => {
        const matches = keys.map(searchKey => {
            const value = item[searchKey] || '';
            return value === searchQuery || !isEmpty(toString(value).match(regExp));
        });

        return matches.includes(true);
    });
}