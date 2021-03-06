import { refs } from "./constants";
import { createListItem } from "./view";
import { getFilms, saveFilm } from "../js/services/api";
import { getFilmsFavorite, deleteFilm } from "./services/api";
import Swal from "sweetalert2";

import * as switchP from "./switchPages";
import * as searchSwP from "./search";

const personalIdUser = sessionStorage.getItem("id");
const idUser = personalIdUser;

// ДОДАЄМО В МОЇ УЛЮБЛЕНІ
export const handleFavBtnClick = ({
  target = {
    textContent
  }
}) => {
  if (target.textContent === "my movies") {
    const release = target.closest("li").children[0].children[1].children[1]
      .children[1].textContent;

    const count = target.closest("li").children[0].children[1].children[1]
      .children[2].textContent;

    const average = target.closest("li").children[0].children[1].children[1]
      .children[3].textContent;

    const overview = target.closest("li").children[0].children[1].children[1]
      .children[4].textContent;
    const src = target.closest("li").children[0].children[0].children[0].src;
    const title = target.closest("li").children[1].textContent;
    let result;
    for (let i = src.length; i > 0; i--) {
      if (src[i] === "/") {
        result = src.substr(src.length - i + 1);
        break;
      }
    }
    const film = {
      poster_path: result,
      title: title,
      release_date: release,
      vote_count: count,
      vote_average: average,
      overview: overview,
      idUser: idUser
    };
    // ПЕРЕВІРКА НА НАЯВНІСТЬ ФІЛЬМА В МАСИВІ
    getFilmsFavorite(idUser).then(result => {
      const resultSearch = result.some(
        film => film.title === title && film.idUser === idUser
      );
      if (!resultSearch) {
        Swal.fire({
          position: "center-center",
          type: "success",
          title: "ADDED TO MY MOVIES",
          showConfirmButton: false,
          timer: 1000
        });
        saveFilm(film);
      } else {
        Swal.fire({
          position: "center-center",
          type: "info",
          title: "MOVIE IS ALREADY ADDED",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  } else {
    let titleDelete = target.closest("li").children[1].textContent;

    getFilmsFavorite(idUser)
      .then(result => {
        let deleteObj = result.find(film => film.title === titleDelete);
        deleteFilm(deleteObj.id);
        Swal.fire({
          position: "center-center",
          type: "success",
          title: "REMOVED FROM MY MOVIES",
          showConfirmButton: false,
          timer: 1000
        });
        return result.filter(el => el.id !== deleteObj.id);
      })
      .then(data => {
        refs.filmsList.innerHTML = "";

        data.forEach(
          film => film.idUser === idUser && createListItem(film, true)
        );
      });
  }
};
//ВИХІД НА ГОЛОВНУ СТОРІНКУ
function exitToFilm() {
  refs.searchForm.classList.remove("delete-form");
  favorite.textContent = "My Movies";
  refs.filmsList.innerHTML = "";
  switchP.buttonDiv.style.display = "flex";
  getFilms().then(result => {
    result.results.forEach(item => createListItem(item));
  });
  favorite.removeEventListener("click", exitToFilm);
  favorite.addEventListener("click", showFavoriteFilm);
}

// КНОПКА НА ГОЛОВНОМУ ЕКРАНІ МОЇ УЛУБЛЕННІ
const favorite = document.querySelector(".favorite");
favorite.addEventListener("click", showFavoriteFilm);

// ПОКАЗАННЯ УЛЮБЛЕННИХ ФІЛЬМІВ
function showFavoriteFilm(e) {
  if (e.target.closest("body").querySelector(".main-section .outer-div")) {
    e.target
      .closest("body")
      .querySelector(".main-section .outer-div").style.height = "10px";
    e.target
      .closest("body")
      .querySelector(".main-section .outer-div").innerHTML = "";
  }

  refs.searchForm.classList.add("delete-form");
  favorite.textContent = "All Movies";
  refs.filmsList.innerHTML = "";

  switchP.buttonDiv.style.display = "none";
  searchSwP.searchButtonDiv.style.display = "none";

  getFilmsFavorite(idUser).then(result => {
    result.forEach(film => {
      film.idUser === idUser ? createListItem(film, true) : null;
    });
  });

  favorite.removeEventListener("click", showFavoriteFilm);
  favorite.addEventListener("click", exitToFilm);
}
