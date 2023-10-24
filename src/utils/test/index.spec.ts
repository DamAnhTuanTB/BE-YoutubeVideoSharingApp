import {
  checkYoutubeURL,
  formatedResponse,
  getParamsPagination,
  getYoutubeVideoId,
} from '../index';

describe('Test for the functions', () => {
  it('should format the response data correctly', () => {
    const data = {
      _id: 'someId',
      name: 'John Doe',
      age: 30,
    };

    const formatted = formatedResponse(data);

    expect(formatted).toEqual({
      id: 'someId',
      name: 'John Doe',
      age: 30,
    });
  });

  it('should get pagination parameters', () => {
    const args = {
      limit: 20,
      page: 2,
    };

    const params = getParamsPagination(args);

    expect(params).toEqual({
      skip: 20,
      limit: 20,
      page: 2,
    });
  });

  it('should validate YouTube URLs', () => {
    const validUrl = 'https://www.youtube.com/watch?v=abcdef123';
    const invalidUrl = 'https://example.com';

    expect(checkYoutubeURL(validUrl)).toBe(true);
    expect(checkYoutubeURL(invalidUrl)).toBe(false);
  });

  it('should extract YouTube video ID from URL', () => {
    const url = 'https://www.youtube.com/watch?v=abcdef123';

    const videoId = getYoutubeVideoId(url);

    expect(videoId).toBe('abcdef123');
  });
});
