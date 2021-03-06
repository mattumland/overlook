class CurrentUser {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  getFirstName() {
    return this.name.slice(0, this.name.indexOf(' '));
  }
}

export default CurrentUser;
