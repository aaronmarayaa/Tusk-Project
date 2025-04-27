class UserController {
    constructor() {
      this.users = [
        {
          username: "test",
          password: "password",
        },
      ];
    }
  
    login(username, password) {
      const user = this.users.find(
        (u) => u.username === username && u.password === password
      );
      return !!user;
    }
  }
  
  module.exports = UserController;