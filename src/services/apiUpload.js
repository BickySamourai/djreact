import request from './request';


function submitUploadForm(title, artist, description, categorie, album, file) {
 // fields = ('id', 'title', 'artist', 'description', 'release_date', 'category', 'user', 'album', 'url', 'music_cover')

  return request({
    url: 'api/upload',
    method: 'POST',
    data: {
      title,
      artist,
      description,
      releaseDate: '',
      categorie,
      album,
      file
    }
  });
}

const ApiUpload = {
  submitUploadForm
}

export default ApiUpload;