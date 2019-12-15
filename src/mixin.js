import get from 'lodash/get'
export default {
  methods: {
    $CHECK_IS_HOST(item) {
      const s = this.$store.state
      return s.user.uid === item.hostInfo.uid
    },
    $STATE(key) {
      return get(this.$store.state, key)
    },
    $GETTER(key, defaultValue = '') {
      return get(this.$store.getters, key, defaultValue)
    },
    $GETTER_FILTER(key, stateKey) {
      return get(this.$store.getters, key)(stateKey)
    },
    $ACTION(name, value) {
      return this.$store.dispatch(name, value)
    },
    $COMMIT(name, value) {
      return this.$store.commit(name, value)
    },
    $GO(data) {
      if (typeof data === 'string') {
        return this.$router.push({
          name: data,
        })
      } else {
        return this.$router.push(data)
      }
    },
  },
  computed: {
    $IS_HOST() {
      const s = this.$store.state
      try {
        return s.user.uid === s.room.current.hostInfo.uid
      } catch (error) {
        return null
      }
    },
    $IS_GUESS() {
      const s = this.$store.state
      try {
        return s.user.uid !== s.room.current.hostInfo.uid
      } catch (error) {
        return null
      }
    },
  },
}
