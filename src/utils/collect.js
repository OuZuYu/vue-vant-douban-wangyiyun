export function getWantSeeMovies () {
    return localStorage.wantSeeMovies ? JSON.parse(localStorage.wantSeeMovies) : [];
}

// 在想看数组中添加或移除电影
export function setWantSeeMovie (movie) {
    let wantSeeMoviesArr = getWantSeeMovies();
    let index = wantSeeMoviesArr.findIndex(movieItem => movieItem.id === movie.id);
    if (index > -1) {
        wantSeeMoviesArr.splice(index, 1);
    } else {
        wantSeeMoviesArr.unshift(movie);
    }
    localStorage.wantSeeMovies = JSON.stringify(wantSeeMoviesArr);
    return wantSeeMoviesArr;
}

export function getHaveSeenMovies() {
    return localStorage.haveSeenMovies ? JSON.parse(localStorage.haveSeenMovies) : [];
}

// 在已看数组中添加或移除电影
export function setHaveSeenMovie(movie) {
    let haveSeenMoviesArr = getHaveSeenMovies();
    let index = haveSeenMoviesArr.findIndex(movieItem => movieItem.id === movie.id);

    if (index > -1) {
        haveSeenMoviesArr.splice(index, 1);
    } else {
        haveSeenMoviesArr.unshift(movie);
    }
    localStorage.haveSeenMovies = JSON.stringify(haveSeenMoviesArr);
    return haveSeenMoviesArr;
}

// 电影对象工厂
export function setMovieObj (movie) {
    return {
        id: movie.id,
        title: movie.title,
        images: movie.images,
        rating: movie.rating,
        directors: movie.directors,
        casts: movie.casts
    }
}

// 检查是否已经存到了想看
export function checkWantSee (id) {
    let wantSeeMovies = getWantSeeMovies();
    let index = wantSeeMovies.findIndex(movie => movie.id === id);
    return index > -1;
}

// 检查是否已经存到了已看数组
export function checkHaveSeen (id) {
    let wantSeeMovies = getHaveSeenMovies();
    let index = wantSeeMovies.findIndex(movie => movie.id === id);
    return index > -1;
}