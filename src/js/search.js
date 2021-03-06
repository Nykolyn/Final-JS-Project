import { refs } from "./constants";
import { createElementWithClass, createListItem } from "./view";
import * as api from "./services/api";
//------------------------------------
import * as switchP from "./switchPages";

const searchPrvsBtn = document.querySelector(".searchPrvs");
const searchNextBtn = document.querySelector(".searchNext");
export const searchButtonDiv = document.querySelector(".searchSwitchPages");
//------------------------------------

searchPrvsBtn.disabled = true;
let value;
let searchCounter = 1;
searchButtonDiv.addEventListener("click", searchSwitchPages);

export const onSearch = event => {
  event.preventDefault();
  //----------------------------------
  searchCounter = 1;
  if (searchCounter < 2) {
    switchP.buttonDiv.style.display = "none";
    searchPrvsBtn.classList.add("disabled");
  }
  //-----------------------------------
  value = refs.searchInput.value.trim();
  refs.filmsList.innerHTML = "";

  Array.from(refs.mainSection.children).forEach(child =>
    child.textContent.includes("Sorry, no films are found... :(") ||
    child.textContent.includes("films were found") ||
    child.textContent.includes("film was found")
      ? child.remove()
      : null
  );

  if (value !== "") {
    api.searchFilm(value).then(films => {
      if (!films.results.length) {
        const noFilmText = createElementWithClass("h2", "film-not-found");
        const noFilmDiv = createElementWithClass("div", "outer-div");
        const innerDiv = createElementWithClass("div", "film-not-found-div");
        noFilmDiv.prepend(noFilmText, innerDiv);
        noFilmText.textContent = "Sorry, no films are found... :(";
        refs.mainSection.prepend(noFilmDiv);
        switchP.buttonDiv.style.display = "none";
      } else {
        films.results.forEach(film => createListItem(film));
        const result = films.total_results.toString().split("");

        switch (result.length) {
          case 7:
            result.splice(4, 0, " ");
            break;
          case 6:
            result.splice(3, 0, " ");
            break;
          case 5:
            result.splice(2, 0, " ");
            break;
          case 4:
            result.splice(1, 0, " ");
            break;
        }

        if (films.results.length === 1) {
          refs.mainSection.insertAdjacentHTML(
            "afterbegin",
            `<div class="outer-div"><p class="total-films">1 film was found.</p></div>`
          );
        } else {
          refs.mainSection.insertAdjacentHTML(
            "afterbegin",
            `<div class="outer-div"><p class="total-films">${result.join(
              ""
            )} films were found.</p></div>`
          );
        }
        if (films.results.length <= 19) {
          switchP.buttonDiv.style.display = "none";
        }
        if (films.results.length >= 20) {
          switchP.buttonDiv.style.display = "none";
          searchButtonDiv.style.display = "flex";
        }
      }
    });
  } else {
    api
      .getFilms()
      .then(films => films.results.forEach(film => createListItem(film)));

    switchP.buttonDiv.style.display = "flex";
    searchCounter = 1;
    searchButtonDiv.style.display = "none";
  }
  //--------------------------------------------------------------------
  if (searchCounter < 2) {
    searchPrvsBtn.classList.add("disabled");
  }
};
export function searchSwitchPages(event) {
  refs.filmsList.innerHTML = "";

  if (searchCounter >= 1) {
    searchPrvsBtn.classList.remove("disabled");
  }

  if (event.target === searchNextBtn) {
    searchCounter++;
    searchPrvsBtn.disabled = false;

    return fetch(api.FIND_FILM_URL + value + `&page=${searchCounter}`)
      .then(response => response.json())
      .then(data => {
        data.results.map(el => createListItem(el));
      });
  } else if (event.target === searchPrvsBtn) {
    searchCounter -= 1;
    if (searchCounter <= 1) {
      searchCounter = 1;
      searchPrvsBtn.disabled = true;
    }
    if (searchCounter < 2) {
      searchPrvsBtn.classList.add("disabled");
    }

    return fetch(api.FIND_FILM_URL + value + `&page=${searchCounter}`)
      .then(response => response.json())
      .then(data => {
        data.results.map(el => createListItem(el));
      });
  }
}
