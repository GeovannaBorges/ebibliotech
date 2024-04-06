const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const url = "https://openlibrary.org/search.json?q=";
const coverUrl = "https://covers.openlibrary.org/b/id/";
const div = document.querySelector(".books-container");


const searchedBookJson = () => {
    const bookName = searchInput.value.trim();
    return bookName.length > 0 ? `${url}${bookName.split(' ').join('+')}` : url;
};


function fetchBooks(jsonUrl) {
    fetch(jsonUrl)
    .then (response => {
        if (!response.ok) {
            throw new Error("erro ao buscar dados")
        }
        return response.json()
    })
    .then (data => {
        const { numFound, docs } = data;

        console.log(`${numFound} resultados`);

        docs.forEach(doc => {
            const { title, author_name, subject, publish_date, number_of_pages_median, cover_i, edition_key } = doc;
            const bookCover = `${coverUrl}${cover_i}.jpg`;

            console.log(jsonUrl)
            console.log(`Título do livro: ${title}`);
            console.log(`Autor: ${author_name}`);
            console.log(`Gênero: ${subject}`);
            console.log(`Data de publicação: ${publish_date}`);
            console.log(`Numero de páginas: ${number_of_pages_median}`);
            console.log(`Cover id: ${cover_i}`);
            console.log(`Book cover url: ${bookCover}`);
            console.log(edition_key);

            displayBooks(numFound, bookCover, title, author_name);
        });
    })
    .catch(error => {
        console.error("ocorreu um erro", error)
    })
}

/*document.addEventListener("DOMContentLoaded", () => {
    const booksContainer = document.querySelector(".books-container")
    booksContainer.innerHTML = ""
    fetchBooks(`${url}all`)
}) */


searchBtn.addEventListener("click", () => {

    const numFoundH2 = document.querySelector(".num-found")
    numFoundH2.innerHTML = ""
    const booksContainer = document.querySelector(".books-container")
    booksContainer.innerHTML = ""
    fetchBooks(searchedBookJson())
})

document.querySelectorAll(".swiper-slide").forEach(div => {
    div.addEventListener("click", () => {
    
         const booksContainer = document.querySelector(".books-container")
         booksContainer.innerHTML = ""
        const subject = (div.getAttribute("value"))
        switch (subject) {
            case subject: fetchBooks(`${url}${subject}`);
            console.log(`${url}${subject}`)
            break;
        }
    })
}) 

function displayBooks(numFound, bookCover, title, authorName) {
    const numFoundH2 = document.querySelector(".num-found");
    numFoundH2.innerHTML = `${numFound} resultados encontrados`;

    const booksContainer = document.querySelector(".books-container");

    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    bookDiv.innerHTML = `
        <img src="${bookCover}">
        <h1 style="color:rgb(0, 102, 102)">${title}</h2>
        <h2 style="color:rgb(102, 153, 153)">${authorName}</h2>
    `;

    booksContainer.appendChild(bookDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    const booksContainer = document.querySelector(".books-container");

    booksContainer.addEventListener("click", function(event) {
        const overlay = document.getElementById('overlay');
        if (event.target.classList.contains('book')) {
            overlay.style.display = 'block';
        }
    });

    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });
});