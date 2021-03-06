import chai from 'chai';
const expect = chai.expect;
import CurrentUser from '../src/CurrentUser.js';

describe('Current User', function() {
  describe('Initialize current user', function () {
    it('should be a function', function() {
      expect(CurrentUser).to.be.a('function');
    });

    it('should be an instance of CurrentUser', function() {
      const user = new CurrentUser();
      expect(user).to.be.an.instanceof(CurrentUser);
    });

    it('should be able to have an id', function() {
      const user = new CurrentUser(25);
      expect(user.id).to.equal(25);
    });

    it('should be able to have a name', function() {
      const user = new CurrentUser(25, 'Bilboink Burgers');
      expect(user.id).to.equal(25);
      expect(user.name).to.equal('Bilboink Burgers');
    });
  });

  describe('Current User methods', function() {
    it.only('should be able to return the first name only', function() {
      const user = new CurrentUser(25, 'Bilboink Burgers');
      expect(user.getFirstName()).to.equal('Bilboink');
    })

  })
});
