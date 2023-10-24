import { UserModule } from '../user.module';

describe('User Module', () => {
  let module: UserModule;

  beforeEach(() => {
    module = new UserModule();
  });

  it('should be defined user module', () => {
    expect(module).toBeDefined();
  });
});
