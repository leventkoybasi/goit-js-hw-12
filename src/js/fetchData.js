import axios from "axios";

export async function getImages(page, searchRequest) {
  const params = {
    key: "47351881-fae358547c7b758473d632e4f",
    q: searchRequest,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const res = await axios.get("https://pixabay.com/api/", { params });
  return res.data;
}
