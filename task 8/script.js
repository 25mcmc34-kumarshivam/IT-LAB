$(document).ready(function () {

    let books = [];

    // Load XML using AJAX
    $.ajax({
        url: "books.xml",
        type: "GET",
        dataType: "xml",
        success: function (xml) {

            $(xml).find("book").each(function () {
                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publication_date: $(this).find("publication_date").text()
                };

                books.push(book);
            });

            populateFilters(books);
            displayBooks(books);
        }
    });

    // Populate Dropdowns
    function populateFilters(data) {
        let genres = [...new Set(data.map(book => book.genre))];
        let authors = [...new Set(data.map(book => book.author))];

        genres.forEach(g => {
            $("#genreFilter").append(`<option value="${g}">${g}</option>`);
        });

        authors.forEach(a => {
            $("#authorFilter").append(`<option value="${a}">${a}</option>`);
        });
    }

    // Display Books in Table
    function displayBooks(data) {
        let tbody = $("#bookTable tbody");
        tbody.empty();

        data.forEach(book => {
            tbody.append(`
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.price}</td>
                    <td>${book.publication_date}</td>
                </tr>
            `);
        });
    }

    // Filter Function
    function applyFilters() {
        let selectedGenre = $("#genreFilter").val();
        let selectedAuthor = $("#authorFilter").val();
        let minPrice = parseFloat($("#minPrice").val()) || 0;
        let maxPrice = parseFloat($("#maxPrice").val()) || Infinity;

        let filtered = books.filter(book => {
            return (
                (selectedGenre === "" || book.genre === selectedGenre) &&
                (selectedAuthor === "" || book.author === selectedAuthor) &&
                (book.price >= minPrice && book.price <= maxPrice)
            );
        });

        displayBooks(filtered);
    }

    $("#genreFilter, #authorFilter, #minPrice, #maxPrice").on("change keyup", applyFilters);
});