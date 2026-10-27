const $ = s => document.querySelector(s);
const fmt = n => MONEDA + n.toLocaleString("es-AR");
const total = p => Object.values(p.stock).reduce((a, b) => a + b, 0);
const estado = p => { const t = total(p); return t === 0 ? ["out","Agotado"] : t <= 3 ? ["low","Últimas unidades"] : ["ok","Disponible"]; };
const slides = p => (p.fotos && p.fotos.length) ? p.fotos : [null, null, null];
const bg = (p, src, i) => src
  ? `background-image:url('${src}')`
  : `background:linear-gradient(${135 + i * 40}deg,${p.color},#f9d5e0)`;

let cat = "Todas", cur = null, foto = 0, talle = null;

/* ---- Lista ---- */
const cats = ["Todas", ...new Set(PRODUCTOS.map(p => p.categoria))];
$("#chips").innerHTML = cats.map(c => `<button class="chip" data-c="${c}" aria-pressed="${c === cat}">${c}</button>`).join("");
$("#chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  cat = b.dataset.c;
  document.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b));
  render();
});
$("#q").addEventListener("input", render);
$("#onlyStock").addEventListener("change", render);

function render() {
  const q = $("#q").value.trim().toLowerCase(), only = $("#onlyStock").checked;
  const list = PRODUCTOS.map((p, i) => ({ p, i })).filter(({ p }) =>
    (cat === "Todas" || p.categoria === cat) && (!q || p.nombre.toLowerCase().includes(q)) && (!only || total(p) > 0));
  $("#grid").innerHTML = list.length ? list.map(({ p, i }) => {
    const [cls, txt] = estado(p), s = slides(p);
    return `<article class="card">
      <button class="pic" data-i="${i}" style="${bg(p, p.fotos[0], 0)}" aria-label="Ver fotos de ${p.nombre}">
        ${p.fotos.length ? "" : `<span class="ph">${p.nombre[0]}</span>`}
        <span class="tag ${cls}">${txt}</span><span class="more">${s.length} fotos</span>
      </button>
      <div class="body">
        <div class="row"><span class="name">${p.nombre}</span><span class="price">${fmt(p.precio)}</span></div>
        <span class="cat">${p.categoria}</span>
      </div></article>`;
  }).join("") : `<p class="empty">No hay prendas que coincidan. Probá con otra categoría o quitá los filtros.</p>`;
}
$("#grid").addEventListener("click", e => {
  const b = e.target.closest(".pic"); if (b) abrir(+b.dataset.i);
});

/* ---- Ventana de fotos ---- */
const modal = $("#modal");
function abrir(i) { cur = PRODUCTOS[i]; foto = 0; talle = null; pintar(); modal.showModal(); }

function pintar() {
  const s = slides(cur), [cls, txt] = estado(cur), t = total(cur);
  $("#stage").setAttribute("style", bg(cur, cur.fotos[foto], foto));
  $("#stage").textContent = cur.fotos.length ? "" : cur.nombre[0];
  $("#prev").hidden = $("#next").hidden = s.length < 2;
  $("#thumbs").innerHTML = s.map((src, k) =>
    `<button class="thumb" data-k="${k}" style="${bg(cur, src, k)}" aria-label="Foto ${k + 1}" aria-current="${k === foto}"></button>`).join("");
  const stockTxt = t === 0 ? "Sin stock por ahora"
    : talle ? `Talle ${talle}: ${cur.stock[talle]} ${cur.stock[talle] === 1 ? "unidad" : "unidades"}`
    : `${t} unidades en total · elegí un talle`;
  const msg = `Hola! Me interesa "${cur.nombre}"${talle ? ` en talle ${talle}` : ""} (${fmt(cur.precio)}). ¿Sigue disponible?`;
  $("#info").innerHTML = `
    <div class="row"><h2>${cur.nombre}</h2><span class="price">${fmt(cur.precio)}</span></div>
    <span class="tag ${cls}" style="position:static;align-self:flex-start;background:var(--rose-soft)">${txt}</span>
    <div class="sizes">${Object.entries(cur.stock).map(([z, n]) =>
      `<button class="size" data-z="${z}" ${n === 0 ? "disabled" : ""} aria-pressed="${talle === z}" aria-label="Talle ${z}${n === 0 ? ", agotado" : ""}">${z}</button>`).join("")}</div>
    <div class="stock">${stockTxt}</div>
    <a class="buy" ${t === 0 ? 'aria-disabled="true"' : `href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener"`}>${t === 0 ? "Agotado" : "Escribir a la vendedora por WhatsApp"}</a>`;
}
const mover = d => { const n = slides(cur).length; foto = (foto + d + n) % n; pintar(); };
$("#prev").onclick = () => mover(-1);
$("#next").onclick = () => mover(1);
$("#close").onclick = () => modal.close();
$("#thumbs").addEventListener("click", e => { const b = e.target.closest(".thumb"); if (b) { foto = +b.dataset.k; pintar(); } });
$("#info").addEventListener("click", e => {
  const b = e.target.closest(".size"); if (!b || b.disabled) return;
  talle = talle === b.dataset.z ? null : b.dataset.z; pintar();
});
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
modal.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") mover(-1);
  if (e.key === "ArrowRight") mover(1);
});

render();
