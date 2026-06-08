import express from "express";
import connectDB from "./db.js";
import Agendamento from "./models/agendamento.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao banco de dados MongoDB
connectDB();

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

// Rota inicial de boas-vindas
app.get("/", (req, res) => {
  res.send("API do Petshop PetLions está rodando!");
});

// 1. Cadastrar Agendamento (CREATE)
app.post("/agendamentos", async (req, res) => {
  try {
    const { nomePet, especie, nomeDono, telefoneDono, servico, data } = req.body;

    let valor = 0;

    if (especie === "Cão") {
      if (servico === "Banho") {
        valor = 50;
      } else if (servico === "Tosa") {
        valor = 60;
      } else if (servico === "Banho e Tosa") {
        valor = 100;
      }
    } else if (especie === "Gato") {
      if (servico === "Banho") {
        valor = 60;
      } else if (servico === "Tosa") {
        valor = 70;
      } else if (servico === "Banho e Tosa") {
        valor = 110;
      }
    } else if (especie === "Outro") {
      if (servico === "Banho") {
        valor = 40;
      } else if (servico === "Tosa") {
        valor = 50;
      } else if (servico === "Banho e Tosa") {
        valor = 80;
      }
    }

    const novoAgendamento = new Agendamento({
      nomePet,
      especie,
      nomeDono,
      telefoneDono,
      servico,
      data,
      valor,
    });

    await novoAgendamento.save();
    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar agendamento", error: error.message });
  }
});

// 2. Listar Todos os Agendamentos (READ)
app.get("/agendamentos", async (req, res) => {
  try {
    const agendamentos = await Agendamento.find();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos", error: error.message });
  }
});

// 3. Buscar por Nome do Pet (QUERY PARAMS)
app.get("/agendamentos/busca", async (req, res) => {
  try {
    const { nome } = req.query;

    let filtro = {};

    if (nome) {
      filtro.nomePet = { $regex: nome, $options: "i" };
    }

    const agendamentos = await Agendamento.find(filtro);
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar busca", error: error.message });
  }
});

// 4. Atualizar Status do Agendamento (UPDATE)
app.patch("/agendamentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!agendamentoAtualizado) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json(agendamentoAtualizado);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar status", error: error.message });
  }
});

// 5. Remover Agendamento (DELETE)
app.delete("/agendamentos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const agendamentoDeletado = await Agendamento.findByIdAndDelete(id);

    if (!agendamentoDeletado) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar agendamento", error: error.message });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
