import { VideoModule } from '../video.module';

describe('Video Module', () => {
  let module: VideoModule;

  beforeEach(() => {
    module = new VideoModule();
  });

  it('should be defined video module', () => {
    expect(module).toBeDefined();
  });
});
