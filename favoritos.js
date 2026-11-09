window.AcervoComponentes = window.AcervoComponentes || {};
window.AcervoComponentes.favoritos = ({ favorites, book, shelf }) =>
    `<h1>Meus favoritos</h1>${shelf('', favorites.map(book)) || '<p class="mu">Você ainda não favoritou livros.</p>'}`;