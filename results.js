const $ = (selector) => document.querySelector(selector);
const form = $("#resultForm");
const message = $("#formMessage");
const output = $("#resultSection");

function esc(value) {
  return String(value ?? "").replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        c
      ],
  );
}

function msg(text, type = "error") {
  message.innerHTML = `<div class="msg ${type}">${esc(text)}</div>`;
}

async function loadOptions() {
  try {
    const response = await fetch("/api/public/options");
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.error || "Unable to load academic periods.");

    $("#session_id").innerHTML =
      '<option value="">Select session</option>' +
      (data.sessions || [])
        .map((x) => `<option value="${x.id}">${esc(x.name)}</option>`)
        .join("");
    $("#term_id").innerHTML =
      '<option value="">Select term</option>' +
      (data.terms || [])
        .map((x) => `<option value="${x.id}">${esc(x.name)}</option>`)
        .join("");
  } catch (error) {
    msg(
      "The result server is not available. Please contact the school administrator.",
    );
  }
}

$("#togglePin").onclick = () => {
  const pin = $("#pin");
  pin.type = pin.type === "password" ? "text" : "password";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.innerHTML = "";
  output.classList.add("hidden");

  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  button.querySelector("span").textContent = "Checking...";

  try {
    const response = await fetch("/api/result/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: $("#phone_number").value.trim(),
        pin: $("#pin").value.trim(),
        session_id: Number($("#session_id").value),
        term_id: Number($("#term_id").value),
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Unable to check result.");

    renderResult(data);
    output.classList.remove("hidden");
    output.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    msg(error.message);
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "Check Result";
  }
});

function renderResult(data) {
  const average = Number(data.summary.average || 0);
  const performance =
    average >= 75
      ? "Excellent"
      : average >= 60
        ? "Very Good"
        : average >= 50
          ? "Good"
          : average >= 40
            ? "Pass"
            : "Needs Improvement";
  output.innerHTML = `
    <div class="result-sheet">
      <div class="sheet-header">
        <div><small>Korecome Comprehensive College</small><h2>Student Result</h2><p>Official academic result statement</p></div>
        <div class="period-badge"><span>Academic Period</span><strong>${esc(data.session)} • ${esc(data.term)}</strong></div>
      </div>
      <div class="sheet-meta">
        <div><small>Student</small><strong>${esc(data.student.name)}</strong></div>
        <div><small>Phone Number</small><strong>${esc(data.student.admission_number)}</strong></div>
        <div><small>Class</small><strong>${esc(data.student.class_name)}</strong></div>
        <div><small>Performance</small><strong>${esc(performance)}</strong></div>
      </div>
      <div class="result-table-wrap"><table class="result-table"><thead><tr><th>#</th><th>Subject</th><th>CA /40</th><th>Exam /60</th><th>Total /100</th><th>Grade</th><th>Remark</th></tr></thead><tbody>${data.results.map((x, index) => `<tr><td>${index + 1}</td><td><strong>${esc(x.subject_name)}</strong>${x.subject_code ? `<small>${esc(x.subject_code)}</small>` : ""}</td><td>${Number(x.ca_score)}</td><td>${Number(x.exam_score)}</td><td><strong>${Number(x.total_score)}</strong></td><td><span class="result-grade">${esc(x.grade)}</span></td><td>${esc(x.remark)}</td></tr>`).join("")}</tbody></table></div>
      <div class="summary-bar">
        <div class="summary-box"><small>Subjects</small><strong>${data.summary.subjects}</strong></div>
        <div class="summary-box"><small>Total Score</small><strong>${data.summary.total}</strong></div>
        <div class="summary-box"><small>Average</small><strong>${data.summary.average}%</strong></div>
      </div>
      <div class="sheet-footer"><p>This result was accessed through the secure Korecome result portal.</p><button class="print-btn" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Result</button></div>
    </div>`;
}

loadOptions();
