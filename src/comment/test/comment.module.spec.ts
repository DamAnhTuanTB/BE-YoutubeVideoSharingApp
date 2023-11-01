import { CommentModule } from './../comment.module';

describe('Comment Module', () => {
  let module: CommentModule;

  beforeEach(() => {
    module = new CommentModule();
  });

  it('should be defined comment module', () => {
    expect(module).toBeDefined();
  });
});
