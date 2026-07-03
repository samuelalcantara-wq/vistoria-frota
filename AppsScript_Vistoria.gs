/**
 * ================================================================
 *  VISTORIA DE FROTA — Google Apps Script (backend)
 *
 *  PASSO A PASSO (uma vez só):
 *  1. Crie uma planilha nova em sheets.google.com
 *  2. No menu, clique em Extensões → Apps Script
 *  3. Apague o código padrão e cole TODO este arquivo
 *  4. Clique em Implantar → Nova implantação
 *     Tipo: Web App
 *     Executar como: Eu (sua conta Google)
 *     Quem pode acessar: Qualquer pessoa
 *  5. Clique em Implantar → autorize → copie a URL gerada
 *  6. Cole a URL no portal (ícone ⚙ Sheets no topo)
 * ================================================================
 */

const SHEET_NAME = "Vistorias";

// ── Obtém (ou cria) a aba de dados ───────────────────────────────
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const header = [["ID","PLACA","MODELO","PAD","STATUS","ATUALIZADO_EM","JSON_COMPLETO"]];
    sheet.getRange(1,1,1,7).setValues(header).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(7, 600);
  }
  return sheet;
}

// ── Resposta JSON ─────────────────────────────────────────────────
function resp(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── doGet: trata TODAS as ações (ping, getAll, upsert, delete) ───
// Usar só GET evita o problema de redirect 302 do doPost com CORS.
function doGet(e) {
  const p      = (e && e.parameter) ? e.parameter : {};
  const action = p.action || "getAll";

  try {
    if (action === "ping") {
      return resp({ ok: true, sheetName: SpreadsheetApp.getActiveSpreadsheet().getName() });
    }

    if (action === "getAll") {
      const sheet = getSheet();
      const last  = sheet.getLastRow();
      if (last <= 1) return resp({ ok: true, data: [] });
      const rows = sheet.getRange(2, 1, last - 1, 7).getValues();
      const vehicles = [];
      rows.forEach(row => {
        const raw = row[6];
        if (raw) { try { vehicles.push(JSON.parse(raw)); } catch(_){} }
      });
      return resp({ ok: true, data: vehicles });
    }

    if (action === "upsert") {
      if (!p.data) return resp({ ok: false, error: "Parâmetro 'data' ausente" });
      const vehicle = JSON.parse(p.data);
      if (!vehicle || !vehicle.id) return resp({ ok: false, error: "ID ausente no payload" });
      upsertVehicle(vehicle);
      return resp({ ok: true });
    }

    if (action === "delete") {
      if (!p.id) return resp({ ok: false, error: "Parâmetro 'id' ausente" });
      deleteVehicle(p.id);
      return resp({ ok: true });
    }

    return resp({ ok: false, error: "Ação desconhecida: " + action });

  } catch(err) {
    return resp({ ok: false, error: err.message });
  }
}

// ── doPost: mantido por compatibilidade (redireciona para doGet) ──
function doPost(e) {
  return doGet(e);
}

// ── Upsert: insere ou atualiza linha pelo ID ──────────────────────
function upsertVehicle(v) {
  const sheet = getSheet();
  const id     = v.id;
  const placa  = (v.data && v.data.placa)   ? v.data.placa   : "";
  const modelo = (v.data && v.data.modelo)  ? v.data.modelo  : "";
  const pad    = (v.data && v.data.pad)     ? v.data.pad     : "";
  const status = v.verdict                  ? v.verdict       : "pend";
  const upd    = v.updatedAt               || new Date().toISOString();
  const json   = JSON.stringify(v);
  const row    = [id, placa, modelo, pad, status, upd, json];

  const last = sheet.getLastRow();
  if (last > 1) {
    const ids = sheet.getRange(2, 1, last - 1, 1).getValues().flat();
    const idx = ids.indexOf(id);
    if (idx >= 0) {
      sheet.getRange(idx + 2, 1, 1, 7).setValues([row]);
      return;
    }
  }
  sheet.appendRow(row);
}

// ── Delete: remove linha(s) com o ID informado ───────────────────
function deleteVehicle(id) {
  const sheet = getSheet();
  const last  = sheet.getLastRow();
  if (last <= 1) return;
  const ids = sheet.getRange(2, 1, last - 1, 1).getValues().flat();
  for (let i = ids.length - 1; i >= 0; i--) {
    if (ids[i] === id) sheet.deleteRow(i + 2);
  }
}
