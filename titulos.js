window.AcervoComponentes = window.AcervoComponentes || {};
window.AcervoComponentes.titulos = ({ books, letter, escapeHTML }) => {
    const firstLetter = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')[0].toUpperCase();
    const items = books.map(book => ({ name: book.t, id: book.id }))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt'));
    const availableLetters = new Set(items.map(item => firstLetter(item.name)));
    const selectedLetter = availableLetters.has(letter) ? letter : [...availableLetters].sort()[0];

    return `<h1>Catálogo &gt; Títulos</h1><section class="card"><p class="mu">Clique na letra para visualizar a lista.</p><div class="al">${[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(value => `<button data-a="ltr" data-v="${value}"${availableLetters.has(value) ? '' : ' disabled'}${value == selectedLetter ? ' class="on"' : ''}>${value}</button>`).join('')}</div></section><section class="card"><h2>${selectedLetter}</h2><div class="cols">${items.filter(item => firstLetter(item.name) == selectedLetter).map(item => `<a href="#livro-${item.id}">${escapeHTML(item.name)}</a>`).join('')}</div></section>`;
};