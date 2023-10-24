import { AuthModule } from '../auth.module';

describe('Auth Module', () => {
  let module: AuthModule;

  beforeEach(() => {
    module = new AuthModule();
  });

  it('should be defined auth module', () => {
    expect(module).toBeDefined();
  });
});
