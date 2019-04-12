const getters = {
    token : state => state.user.token,
    name : state => state.user.name,
    avatar : state => state.user.avatar,
    roles : state => state.user.roles,
    introduction : state => state.user.introduction,
}

export default getters