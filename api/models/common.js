export default axios => ({
    extConfig() {
        return axios.$get('/api/extConfig')
    },
})
