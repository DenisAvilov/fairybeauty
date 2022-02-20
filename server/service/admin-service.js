const UserModel = require('../models/user-model')
const UserDto = require('../dtos/user-dto')
class AdminService {
    async info() {
        const users = await UserModel.find()
        const usersDto = users.map((user) => {
            return new UserDto(user)
        })
        return { usersDto }


    }
}

module.exports = new AdminService()