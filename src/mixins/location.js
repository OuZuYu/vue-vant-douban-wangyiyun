import { mapActions } from 'vuex'

export default {
    data() {
        return {
        }
    },

    methods: {
        ...mapActions({
            storeCity: 'SetCity'
        }),

        // 直接用百度地图api获取城市
        getCity() {
            return new Promise((resolve, reject) => {
                if (this.$store.state.location.hasCity) {
                    resolve();
                }
                let myCity = new BMap.LocalCity();
                myCity.get(res => {
                    this.storeCity(res.name);
                    resolve(res.name);
                })
            })
        },

        /* 获取位置h5版
        getLocationData () {
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setLocation(position);
            }, error => {
                this.$notify({
                    message: '获取位置失败，请稍后再试！',
                    duration: 2000,
                    background: '#FF8C69'
                });
            });
        } else {
            this.$notify({
                message: '您的设备不支持navigator！',
                duration: 2000,
                background: '#FF8C69'
            });
        }
        },
        setLocation (position) {
            this.SaveLocation(position);
        }*/
    }
}