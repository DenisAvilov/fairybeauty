const UserModel = require('../models/user-model')
const UserDto = require('../dtos/user-dto')
class ContentService {
    async users() {
        const users = await UserModel.find()
        const usersDto = users.map((user) => {
            return new UserDto(user)
        })
        console.log(usersDto)
        return { usersDto }
    }
}

module.exports = new ContentService()