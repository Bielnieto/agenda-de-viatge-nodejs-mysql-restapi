import fs from "fs/promises";
const DB_PATH = "./db/database.json";

// Helper to read clients from JSON
async function readClientsFromJson() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data).clients;
}

// Helper to write clients to JSON
async function writeClientsToJson(clients) {
  const data = JSON.stringify({ clients }, null, 2);
  await fs.writeFile(DB_PATH, data, "utf-8");
}

export const createClient = async (req, res) => {
  try {
    const { nom, cognoms, telefon, correu_electronic, desti_viatge } = req.body;
    if (!nom || !cognoms || !correu_electronic) {
      return res.status(400).json({ message: "Falten camps obligatoris" });
    }
    let clients = await readClientsFromJson();
    if (clients.some(c => c.correu_electronic === correu_electronic)) {
      return res.status(409).json({ message: "El correu electrònic ja existeix" });
    }
    const id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    const newClient = {
      id,
      nom,
      cognoms,
      telefon,
      correu_electronic,
      desti_viatge,
      created_at: new Date().toISOString()
    };
    clients.push(newClient);
    await writeClientsToJson(clients);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el client", error: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await readClientsFromJson();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtenir els clients", error: error.message });
  }
};

export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const clients = await readClientsFromJson();
    const client = clients.find(c => c.id == id);
    if (!client) {
      return res.status(404).json({ message: "Client no trobat" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error al obtenir el client", error: error.message });
  }
};

export const getClientsByDestination = async (req, res) => {
  try {
    const { destination } = req.query;
    const clients = await readClientsFromJson();
    const filtered = clients.filter(c => c.desti_viatge === destination);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Error al cercar clients pel destí de viatge", error: error.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, cognoms, telefon, correu_electronic, desti_viatge } = req.body;
    let clients = await readClientsFromJson();
    const idx = clients.findIndex(c => c.id == id);
    if (idx === -1) {
      return res.status(404).json({ message: "Client no trobat" });
    }
    // Check for duplicate email (if changed)
    if (correu_electronic && clients.some((c, i) => c.correu_electronic === correu_electronic && i !== idx)) {
      return res.status(409).json({ message: "El correu electrònic ja existeix" });
    }
    clients[idx] = {
      ...clients[idx],
      nom,
      cognoms,
      telefon,
      correu_electronic,
      desti_viatge
    };
    await writeClientsToJson(clients);
    res.json({ message: "Client actualitzat correctament" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualitzar el client", error: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    let clients = await readClientsFromJson();
    const idx = clients.findIndex(c => c.id == id);
    if (idx === -1) {
      return res.status(404).json({ message: "Client no trobat" });
    }
    clients.splice(idx, 1);
    await writeClientsToJson(clients);
    res.json({ message: "Client eliminat correctament" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el client", error: error.message });
  }
};
