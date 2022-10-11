const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '09bfc18ea3584c25bcddbe4ef985de4a',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
