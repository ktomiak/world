// backend/chatServer.js
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import amqp from "amqplib";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const RABBIT_URL = "amqp://localhost";
const EXCHANGE = "admin_chat";
let channel;

// 🔹 Połączenie z RabbitMQ
(async () => {
  const conn = await amqp.connect(RABBIT_URL);
  channel = await conn.createChannel();
  await channel.assertExchange(EXCHANGE, "fanout", { durable: false });

  const { queue } = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(queue, EXCHANGE, "");

  // odbiór wiadomości z kolejki i wysyłanie do klientów
  channel.consume(
    queue,
    (msg) => {
      if (msg.content) {
        const message = msg.content.toString();
        wss.clients.forEach((ws) => {
          if (ws.readyState === ws.OPEN) ws.send(message);
        });
      }
    },
    { noAck: true }
  );
})();

// 🔹 WebSocket — odbiór i publikacja do RabbitMQ
wss.on("connection", (ws) => {
  ws.on("message", async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg && msg.text) {
        const enriched = {
          author: msg.author || "Anonim",
          text: msg.text,
          timestamp: msg.timestamp || Date.now(),
        };
        channel.publish(EXCHANGE, "", Buffer.from(JSON.stringify(enriched)));
      }
    } catch (err) {
      console.error("Błąd formatu wiadomości:", err);
    }
  });
});

server.listen(4000, () =>
  console.log("✅ Chat serwer działa na http://localhost:4000")
);
