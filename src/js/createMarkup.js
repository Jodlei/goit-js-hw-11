export function createMurkup(images) {
  return images
    .map(image => {
      return `<div class="photo-card">
      <a href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>likes:${image.likes}</b>
        </p>
        <p class="info-item">
          <b>Views:${image.views}</b>
        </p>
        <p class="info-item">
          <b>Comments:${image.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads:${image.downloads}</b>
        </p>
      </div>
      </a>
    </div>`;
    })
    .join('');
}
