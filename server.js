const express = require("express");
const app = express();
app.use(express.json());

console.log("🛒 Iniciando SOFALA Smart-List (Compras)...");

app.get("/", (req, res) => {
  res.send("Smart-List ONLINE");
});

app.post("/api/smart-list/generate", (req, res) => {
  const { command } = req.body;
  console.log(`\n🎙️ Comando Recebido: "${command}"`);

  // Simulação do processamento de linguagem natural (NLP) e cruzamento de estoque
  setTimeout(() => {
    res.json({
      status: "success",
      agent: "Katlyn AI",
      recognizedIntent: "shopping_list_generation",
      shoppingList: {
        "Carnes e Proteínas": [
          { id: 1, item: "Pernil Suíno", qty: "15 kg", urgency: "Crítico" },
          { id: 2, item: "Carne de Sol", qty: "10 kg", urgency: "Alerta" },
        ],
        Hortifruti: [
          { id: 3, item: "Cebola Roxa", qty: "5 kg", urgency: "Normal" },
          {
            id: 4,
            item: "Alface Americana",
            qty: "10 maços",
            urgency: "Crítico",
          },
        ],
        "Embalagens & Bebidas": [
          {
            id: 5,
            item: "Cerveja Krug Zero",
            qty: "4 caixas",
            urgency: "Alerta",
          },
          { id: 6, item: "Caixa Hambúrguer", qty: "200 un", urgency: "Normal" },
        ],
      },
    });
  }, 1200); // Simulando o "pensamento" da IA
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`📡 Smart-List operando na porta ${port}. Aguardando Frontend.`);
});
