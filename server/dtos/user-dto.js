module.exports = class {
    email
    id
    isActivated
    role
    firstName
    lastName
    subscription
    constructor(userModel) {
        this.email = userModel.email
        this.id = userModel.id
        this.isActivated = userModel.isActivated
        this.role = userModel.roles
        this.firstName = userModel.firstName
        this.lastName = userModel.lastName
        this.subscription = userModel.subscription
    }

}