export class useLocalStorage {
  constructor() {
    this.storage = localStorage.getItem("user") || null;
  }
  getUserId() {
    const user = this.storage
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    return user?.userId;
  }

  getUser() {
    const user = this.storage
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    return user;
  }
}
