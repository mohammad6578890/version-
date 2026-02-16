const STORAGE_KEY = 'scrap-erp-state';

const defaultState = {
  branches: ['Downtown', 'Industrial Zone', 'Airport Road'],
  selectedBranch: 'Downtown',
  inventoryKg: {
    Downtown: 0,
    'Industrial Zone': 0,
    'Airport Road': 0,
  },
  debtUsd: {
    Downtown: 0,
    'Industrial Zone': 0,
    'Airport Road': 0,
  },
  activity: [],
};

const state = loadState();

const branchSelect = document.getElementById('branchSelect');
const inventoryTotal = document.getElementById('inventoryTotal');
const debtTotal = document.getElementById('debtTotal');
const purchaseForm = document.getElementById('purchaseForm');
const debtForm = document.getElementById('debtForm');
const activityList = document.getElementById('activityList');
const activityTemplate = document.getElementById('activityTemplate');

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function asMoney(value) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function asWeight(value) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function renderBranchOptions() {
  branchSelect.innerHTML = '';
  state.branches.forEach((branch) => {
    const option = document.createElement('option');
    option.value = branch;
    option.textContent = branch;
    if (branch === state.selectedBranch) option.selected = true;
    branchSelect.append(option);
  });
}

function renderSummary() {
  inventoryTotal.textContent = asWeight(state.inventoryKg[state.selectedBranch] || 0);
  debtTotal.textContent = asMoney(state.debtUsd[state.selectedBranch] || 0);
}

function renderActivity() {
  activityList.innerHTML = '';
  state.activity.slice(0, 12).forEach((item) => {
    const row = activityTemplate.content.firstElementChild.cloneNode(true);
    row.querySelector('.activity-time').textContent = item.time;
    row.querySelector('.activity-text').textContent = item.text;
    activityList.append(row);
  });
}

function addActivity(text) {
  const now = new Date();
  state.activity.unshift({
    time: now.toLocaleTimeString(),
    text,
  });
  state.activity = state.activity.slice(0, 50);
}

branchSelect.addEventListener('change', (event) => {
  state.selectedBranch = event.target.value;
  saveState();
  renderSummary();
});

purchaseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const material = document.getElementById('material').value.trim();
  const weight = Number(document.getElementById('weight').value);
  const unitPrice = Number(document.getElementById('unitPrice').value);

  if (!material || weight <= 0 || unitPrice <= 0) return;

  state.inventoryKg[state.selectedBranch] += weight;
  addActivity(
    `${state.selectedBranch}: Purchased ${asWeight(weight)} kg ${material} @ $${asMoney(unitPrice)} / kg`,
  );

  purchaseForm.reset();
  saveState();
  renderSummary();
  renderActivity();
});

debtForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const customer = document.getElementById('customer').value.trim();
  const amount = Number(document.getElementById('amount').value);

  if (!customer || amount <= 0) return;

  state.debtUsd[state.selectedBranch] += amount;
  addActivity(`${state.selectedBranch}: Debt added for ${customer} ($${asMoney(amount)})`);

  debtForm.reset();
  saveState();
  renderSummary();
  renderActivity();
});

renderBranchOptions();
renderSummary();
renderActivity();
