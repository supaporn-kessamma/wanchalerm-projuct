export default {
  state: () => ({
    // audios: {
    //   normalClick: '/sounds/week7-bounce.mp3',
    //   // mainTheme: '/sounds/main_theme.mp3',
    // },
    // // ไว้ตั้งค่าสำหรับผู้ใช้
    // settings: {
    //   normalClick: true,
    //   // mainTheme: false,
    // },
  }),

  mutations: {
    // SET_COMPANIES(state, val) {
    //   state.companies = val
    // },
  },
  actions: {
    // async loadCompany({ commit }) {
    //   const { data } = await this.$axios.$get(
    //     "v1/public/companies?includes=cover&page=1&perPage=9999"
    //   );
    //   commit("SET_COMPANIES", data);
    // },
    // async nuxtServerInit({ dispatch }) {
    //   await dispatch("loadCompany");
    // }
    // autoPlayaudio() {
    //   console.log(this.state.audio.mainTheme)
    //   new Audio(this.state.audio.mainTheme).play()
    // },
    // async nuxtServerInit({ dispatch }) {
    //   await dispatch('autoPlayaudio')
    // },
    // normalClick() {
    //   const sound = new Audio(this.state.audios.normalClick)
    //   if (this.state.settings.normalClick) {
    //     sound.play()
    //   } else {
    //     sound.pause()
    //     sound.currentTime = 0
    //   }
    // },
    // toggle(is) {
    //   console.log(is)
    //   this.state.settings.normalClick = !is
    // },
  },
  getters: {
    // getCompanies(state) {
    //   return state.companies;
    // }
    // getNormalClick(state) {
    //   return state.audios.normalClick
    // },
  },
}