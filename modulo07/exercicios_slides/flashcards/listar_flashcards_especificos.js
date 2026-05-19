import { flashcards } from "./dados.js";

function listarFlashcardsEspecificos(idBaralho) {
  const idNum = parseInt(idBaralho);
  return flashcards.filter((fc) => fc.idBaralho === idNum);
}

export default listarFlashcardsEspecificos;
