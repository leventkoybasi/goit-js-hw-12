export function createImage(image) {
  image.forEach((img) => {
    const imgCard = `
      <li class="imgCard">
        <a class="imgTag" href="${img.largeImageURL}">
          <img class="img" src=${img.webformatURL} alt=${img.tags} />
        </a>
        <div class="card-content">
          <div class="container-content">
            <div class="content-title">Likes</div>
            <div class="content-value">${img.likes}</div>
          </div>
          <div class="container-content">
            <div class="content-title">Views</div>
            <div class="content-value">${img.views}</div>
          </div>
          <div class="container-content">
            <div class="content-title">Comments</div>
            <div class="content-value">${img.comments}</div>
          </div>
          <div class="container-content">
            <div class="content-title">Downloads</div>
            <div class="content-value">${img.downloads}</div>
          </div>
        </div>
      </li>
    `;
    app.innerHTML += imgCard;
  });
}
