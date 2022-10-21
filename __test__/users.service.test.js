const user_service = require('../src/services/user.service');

describe('CRUD users', () => {
  const userCreateInput = {
    name: 'ulpiano',
    email: 'ulcarmar@gmail.com',
    pass: 'my-pass',
  };

  const userCreated = {
    id: 0,
    name: 'ulpiano',
    email: 'ulcarmar@gmail.com',
    pass: 'my-pass',
  };

  const userUpdateInput = {
    name: 'ulpiano',
    email: 'ulcarmar1@gmail.com',
    pass: 'my-pass',
  };

  const userUpdated = {
    id: 0,
    name: 'ulpiano',
    email: 'ulcarmar1@gmail.com',
    pass: 'my-pass',
  };

  it('should test that the user is created', () => {
    const user = user_service.createUser(
      userCreateInput.name,
      userCreateInput.email,
      userCreateInput.pass
    );
    expect(user).toEqual(userCreated);
  });

  it('should test that the user can be retrieved by Id', () => {
    const user = user_service.retrieveUserById(userCreated.id);
    expect(user).toEqual(userCreated);
  });

  it('should test that the user can be retrieved by email', () => {
    const user = user_service.retrieveUserByEmail(userCreated.email);
    expect(user).toEqual(userCreated);
  });

  it('should test that the user can be updated', () => {
    const user = user_service.updateUser(
      userUpdated.id,
      userUpdateInput.name,
      userUpdateInput.email,
      userUpdateInput.pass
    );
    expect(user).toEqual(userUpdated);
  });

  it('should test that the user can be deleted', () => {
    const userId = user_service.deleteUser(userCreated.id);
    expect(userId).toEqual(userCreated.id);
  });
});
