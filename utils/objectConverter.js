exports.userResponse = (users) => {

    let userArray = [];

    users.forEach(user => {
        userArray.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
        })
    })

    return userArray;
}