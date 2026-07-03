# 🚛 Portal de Vistoria de Frota

Sistema de checklist para identificação de frotas aptas ao novo sistema de fixação.  
Funciona em **celular e computador** com sincronização automática via Google Sheets.

---

## 🚀 Como publicar no GitHub Pages (uma vez só)

### Passo 1 — Criar conta e repositório

1. Acesse **github.com** e crie uma conta gratuita (ou faça login)
2. Clique em **"New repository"** (botão verde no canto superior direito)
3. Preencha:
   - **Repository name:** `vistoria-frota` (ou qualquer nome sem espaços)
   - **Visibility:** ✅ Public
   - Deixe as outras opções como estão
4. Clique em **"Create repository"**

---

### Passo 2 — Fazer upload dos arquivos

1. Na página do repositório recém-criado, clique em **"uploading an existing file"**  
   *(ou arraste os arquivos para a área tracejada)*
2. Selecione e faça upload dos **dois arquivos**:
   - `index.html` ← o portal de vistoria
   - `AppsScript_Vistoria.gs` ← só para referência (não afeta o portal)
3. No campo "Commit changes", escreva: `Publicar portal de vistoria`
4. Clique em **"Commit changes"**

---

### Passo 3 — Ativar GitHub Pages

1. Dentro do repositório, clique em **Settings** (engrenagem no menu superior)
2. No menu lateral esquerdo, clique em **Pages**
3. Em **"Branch"**, selecione **`main`** e pasta **`/ (root)`**
4. Clique em **Save**
5. Aguarde ~1 minuto e atualize a página

✅ Sua URL aparecerá assim:  
**`https://SEU_USUARIO.github.io/vistoria-frota`**

Copie essa URL e compartilhe com sua equipe — **abre igual em qualquer dispositivo**.

---

## 🔗 Configurar sincronização com Google Sheets

### Passo 1 — Criar o Apps Script

1. Abra **sheets.google.com** e crie uma planilha nova (pode nomear "Vistoria Frota")
2. No menu da planilha: **Extensões → Apps Script**
3. Apague o código padrão (`function myFunction() {}`)
4. Abra o arquivo `AppsScript_Vistoria.gs` e **cole todo o conteúdo**
5. Clique no ícone 💾 para salvar

### Passo 2 — Publicar como Web App

1. Clique em **Implantar** (botão azul no canto superior direito)
2. Selecione **Nova implantação**
3. Clique no ícone de engrenagem ⚙ e selecione **Web App**
4. Configure:
   - **Descrição:** Vistoria Frota
   - **Executar como:** Eu (sua conta Google)
   - **Quem pode acessar:** Qualquer pessoa
5. Clique em **Implantar**
6. Autorize as permissões solicitadas
7. **Copie a URL** gerada (começa com `https://script.google.com/macros/s/...`)

### Passo 3 — Conectar o portal ao Sheets

1. Abra o portal (`https://SEU_USUARIO.github.io/vistoria-frota`)
2. Clique no ícone **⚙ Sheets não configurado** no topo
3. Cole a URL copiada no campo
4. Clique em **Testar conexão** — deve aparecer ✓ verde
5. Clique em **Salvar URL**

🎉 **Pronto!** A partir de agora todas as vistorias sincronizam automaticamente entre celular, computador e qualquer outro dispositivo.

---

## 📱 Como usar no celular (atalho na tela inicial)

**Android (Chrome):**
1. Abra a URL no Chrome
2. Toque nos 3 pontinhos (menu)
3. Toque em **"Adicionar à tela inicial"**

**iPhone (Safari):**
1. Abra a URL no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Toque em **"Adicionar à Tela Inicial"**

---

## ❓ Dúvidas frequentes

**As fotos sincronizam entre dispositivos?**  
As fotos ficam salvas localmente em cada dispositivo (para não sobrecarregar o Google Sheets). Todos os outros dados da vistoria (campos, parecer, observações) sincronizam normalmente.

**Funciona sem internet?**  
Sim. Você pode preencher vistorias offline — elas ficam salvas localmente. Quando a internet voltar, o botão **↻ Sync** envia tudo para o Sheets.

**Como atualizar o portal depois?**  
Substitua o `index.html` no GitHub (arrastar o novo arquivo e confirmar). O GitHub Pages atualiza automaticamente em ~1 minuto.
