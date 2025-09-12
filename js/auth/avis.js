/** ================================
 *  Config
 *  ================================ */
const API_BASE = "http://localhost:8000"; 
const SELECTORS = {
  form: "#form-avis",
  tripRef: "#tripRef",
  note: "#note",
  commentaire: "#commentaire",
  list: "#avis-list",
  stats: "#avis-stats",
  submitBtn: "#avis-submit"
};

/** ================================
 *  Utils
 *  ================================ */
function $(sel) { return document.querySelector(sel); }
function escapeHtml(s='') {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function stars(n=0){ return "⭐".repeat(Number(n)||0); }

/** ================================
 *  API calls
 *  ================================ */
async function apiGetAvis(tripRef) {
  const url = `${API_BASE}/get-avis.php?tripRef=${encodeURIComponent(tripRef)}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

async function apiAddAvis(payload) {
  const url = `${API_BASE}/add-avis.php`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    credentials: "include",
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

/** ================================
 *  Render
 *  ================================ */
function renderStats(container, average, count) {
  container.textContent = count
    ? `Moyenne: ${average} / 5 — ${count} avis`
    : "Aucun avis pour ce trajet";
}

function renderList(container, items=[]) {
  container.innerHTML = "";
  items.forEach(it => {
    const li = document.createElement("li");
    li.className = "avis-item";
    const note = it.note ?? 0;
    const com = escapeHtml(it.commentaire || "");
    const author = escapeHtml(it.author?.name || "Anonyme");
    const dt = it.dateAvis ? new Date(it.dateAvis).toLocaleString() : "";
    li.innerHTML = `
      <div><strong>${stars(note)}</strong> — ${com}</div>
      <small>${author} • ${dt}</small>
    `;
    container.appendChild(li);
  });
}

/** ================================
 *  State & actions
 *  ================================ */
async function loadAndRenderAvis() {
  const tripRef = $(SELECTORS.tripRef)?.value?.trim();
  if (!tripRef) return;

  const listEl = $(SELECTORS.list);
  const statsEl = $(SELECTORS.stats);
  listEl.innerHTML = "<li>Chargement…</li>";
  statsEl.textContent = "Chargement…";

  try {
    const data = await apiGetAvis(tripRef);
    if (!data.success) throw new Error(data.error || "Erreur API");
    renderStats(statsEl, data.average, data.count);
    renderList(listEl, data.items);
  } catch (e) {
    console.error(e);
    statsEl.textContent = "Erreur de chargement des avis";
    listEl.innerHTML = "<li>Impossible de charger les avis</li>";
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const tripRef = $(SELECTORS.tripRef)?.value?.trim();
  const note = parseInt($(SELECTORS.note)?.value, 10);
  const commentaire = $(SELECTORS.commentaire)?.value?.trim() || "";

  if (!tripRef || !Number.isInteger(note) || note < 1 || note > 5) {
    alert("Merci de renseigner une note (1 à 5).");
    return;
  }

  const btn = $(SELECTORS.submitBtn);
  if (btn) { btn.disabled = true; btn.textContent = "Envoi…"; }

  try {
    const payload = {
      tripRef,
      note,
      commentaire,
      // Si tu n'as pas encore d'auth, on met un auteur générique de test :
      author: { name: window.currentUserName || "passager", email: window.currentUserEmail || null }
    };
    const res = await apiAddAvis(payload);
    if (!res.success) throw new Error(res.error || "Erreur API");
    // Reset form + reload list
    $(SELECTORS.form).reset();
    await loadAndRenderAvis();
    alert("Avis ajouté ✅");
  } catch (e) {
    console.error(e);
    alert("Erreur lors de l’enregistrement de l’avis");
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "Envoyer"; }
  }
}

/** ================================
 *  Init
 *  ================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Si ton tripRef est dans l’URL (ex ?ref=170N), on peut le remplir auto :
  const urlRef = new URLSearchParams(location.search).get("ref");
  if (urlRef && $(SELECTORS.tripRef)) $(SELECTORS.tripRef).value = urlRef;

  // Charger la liste au démarrage
  loadAndRenderAvis();

  // Bind submit
  const form = $(SELECTORS.form);
  if (form) form.addEventListener("submit", handleSubmit);
});
