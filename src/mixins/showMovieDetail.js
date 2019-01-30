export default {
    data () {
        return {
            detailComp: null,
            selectedMovie: {}
        }
    },

    methods: {
        handleMovieSelect(movie) {
            this.selectedMovie = movie;
            this.showDetail();
        },

        showDetail() {

            // 创建movieDetail组件api
            this.detailComp = this.detailComp || this.$createMovieDetail({
                $props: {
                    movie: 'selectedMovie'
                }
            })
            this.detailComp.show()
            this.$nextTick(_ => {
                this.detailComp.init()
            })
        }
    }
}