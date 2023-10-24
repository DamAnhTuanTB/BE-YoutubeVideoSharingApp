export const formatedResponse = (data: any) => {
  const id = data._id.toString() || data.id;
  const dataFormated = { ...data, id };
  delete dataFormated['_id'];
  delete dataFormated['__v'];
  return dataFormated;
};

export const getParamsPagination = (args: PagingParms) => {
  const limit = args?.limit || 10;
  const page = args?.page || 1;
  const skip = (page - 1) * limit;
  return { skip, limit, page };
};

export const checkYoutubeURL = (url: string) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|shorts\/)?([a-zA-Z0-9_-]+)(\S+)?$/;
  return youtubeRegex.test(url);
};

export const getYoutubeVideoId = (url: string) => {
  const regex =
    /(?:\?v=|\/embed\/|\/v\/|\/watch\?v=|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]+)/;

  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return '';
  }
};
