class CurrentUser {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
  }

  getFirstName() {
    return this.name.slice(0, this.name.indexOf(' '));
  }
}

export default CurrentUser;
