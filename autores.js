window.AcervoComponentes = window.AcervoComponentes || {};
window.AcervoComponentes.autores = ({ authors, letter, escapeHTML }) => {
    const invert = name => {
        const parts = name.split(' ');
        const surname = parts.pop();
        return parts.length ? surname + ', ' + parts.join(' ') : surname;
    };
    const firstLetter = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')[0].toUpperCase();
    const items = authors.map(name => ({ name: invert(name), original: name }))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt'));
    const availableLetters = new Set(items.map(item => firstLetter(item.name)));
    const selectedLetter = availableLetters.has(letter) ? letter : [...availableLetters].sort()[0];

    return `<h1>Catálogo &gt; Autores</h1><section class="card"><p class="mu">Clique na letra para visualizar a lista.</p><div class="al">${[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(value => `<button data-a="ltr" data-v="${value}"${availableLetters.has(value) ? '' : ' disabled'}${value == selectedLetter ? ' class="on"' : ''}>${value}</button>`).join('')}</div></section><section class="card"><h2>${selectedLetter}</h2><div class="cols">${items.filter(item => firstLetter(item.name) == selectedLetter).map(item => `<a href="#catalogo" data-a="au" data-v="${escapeHTML(item.original)}">${escapeHTML(item.name)}</a>`).join('')}</div></section>`;
};