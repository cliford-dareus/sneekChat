export class useLocalStorage {
  constructor() {}
  getUserId() {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    return user?.userId;
  }

  getUser() {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    return user;
  }
}
