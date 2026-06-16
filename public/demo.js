const input = document.getElementById("tx-input");
const result = document.getElementById("demo-result");
const statusEl = document.getElementById("demo-status");
const chips = document.getElementById("example-chips");
const tour = document.getElementById("tour-steps");
const analyzeBtn = document.getElementById("analyze-btn");

let examples = [];

function setStatus(text, tone = "idle") {
  statusEl.textContent = text;
  statusEl.dataset.tone = tone;
}

function renderJson(data) {
  result.innerHTML = `<code>${escapeHtml(JSON.stringify(data, null, 2))}</code>`;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function analyze(txHash, cached) {
  input.value = txHash;
  setStatus("Analyzing…", "busy");
  renderJson({ txHash, status: "fetching from /query/:txHash …" });

  try {
    const res = await fetch(`/query/${encodeURIComponent(txHash)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || res.statusText);
    setStatus("Live RPC result", "ok");
    renderJson(data);
  } catch (err) {
    if (cached) {
      setStatus("Cached example (RPC unavailable)", "cached");
      renderJson(cached);
    } else {
      setStatus("Error", "error");
      renderJson({ error: err.message, txHash });
    }
  }
}

function mountExamples(data) {
  examples = data.examples || [];
  (data.tour || []).forEach((step) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${step.step}. ${step.title}</strong><span>${step.body}</span>`;
    tour.appendChild(li);
  });

  examples.forEach((ex) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = ex.label;
    btn.title = ex.description;
    btn.addEventListener("click", () => analyze(ex.txHash, ex.cached));
    chips.appendChild(btn);
  });
}

analyzeBtn.addEventListener("click", () => {
  const tx = input.value.trim();
  if (!tx) return;
  const match = examples.find((e) => e.txHash === tx);
  analyze(tx, match?.cached);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") analyzeBtn.click();
});

fetch("/examples.json")
  .then((r) => r.json())
  .then(mountExamples)
  .catch(() => setStatus("Examples failed to load", "error"));
