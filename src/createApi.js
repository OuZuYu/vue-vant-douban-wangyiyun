import CreateAPI from 'vue-create-api';
import Vue from 'vue';
import MovieDetail from '@/views/movie-detail';
import CastDetail from '@/views/movie-detail/components/CastDetail';
import SongList from '@/views/song-list-detail/index';

Vue.use(CreateAPI);

Vue.createAPI(MovieDetail)
Vue.createAPI(CastDetail)
Vue.createAPI(SongList)