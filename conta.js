window.AcervoComponentes = window.AcervoComponentes || {};
window.AcervoComponentes.conta = ({ user, state, book, escapeHTML, formatDate, loanBadge, cover, shelf }) => {
    const loans = state.loans.filter(loan => loan.u == user.id);
    const comments = Object.entries(state.com).flatMap(([id, entries]) => entries
        .filter(comment => comment.u == user.nome)
        .map(comment => ({ id, text: comment.t })));

    return `<div class="hg"><section class="card bk"><span class="av" style="width:90px;height:90px;font-size:32px">${escapeHTML(user.nome[0])}</span><div><h2>${escapeHTML(user.nome)}</h2><p>Série/turma: ${escapeHTML(user.turma)}</p><p>${escapeHTML(user.email)}<br>${escapeHTML(user.tel)}</p></div></section><div><h2>Meus favoritos</h2>${shelf('', (state.fav[user.id] || []).map(book)) || '<p class="mu">Nenhum favorito ainda.</p>'}</div></div>
<h2>Meus empréstimos</h2><div class="g g3" style="margin-bottom:16px">${loans.map(loan => { const item = book(loan.b); return `<section class="card bk">${cover(item, 64)}<div><b>${escapeHTML(item.t)}</b><br><small>Retirado em ${formatDate(loan.r)}<br>Devolver até ${formatDate(loan.dv)}</small><br>${loanBadge(loan)}</div></section>` }).join('') || '<p class="mu">Nenhum empréstimo.</p>'}</div>
<h2>Meus comentários</h2><section class="card">${comments.map(comment => `<div class="row"><a href="#livro-${comment.id}"><b>${escapeHTML(book(comment.id).t)}</b></a><span>${escapeHTML(comment.text)}</span></div>`).join('') || '<p class="mu">Você ainda não comentou.</p>'}</section>`;
};