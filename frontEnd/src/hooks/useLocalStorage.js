class UseLocalStorage {
  constructor() {
    this.storage = localStorage.getItem("user") || null;
  }

  setUser(user){
    localStorage.setItem("user", JSON.stringify(user));
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

export const useLocalStorage = new UseLocalStorage()
