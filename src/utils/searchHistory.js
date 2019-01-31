export function getSearchHistory () {
    return localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : [];
}

export function setSearchHistory (keyword) {
    let searchHistory = getSearchHistory();

    if (!searchHistory.includes(keyword)) {
        searchHistory.unshift(keyword);
        localStorage.searchHistory = JSON.stringify(searchHistory);
        return searchHistory;
    } else {
        return false;
    }
}

export function delSearchHistory (keyword) {
    let searchHistory = getSearchHistory(),
        index = searchHistory.findIndex(val => val === keyword);

    searchHistory.splice(index, 1);
    localStorage.searchHistory = JSON.stringify(searchHistory);
    return searchHistory;
}