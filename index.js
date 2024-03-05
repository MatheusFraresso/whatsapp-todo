// written by Matheus Fraresso in march 2024

//Imports
const { Client, RemoteAuth } = require("whatsapp-web.js")
const { MongoStore } = require("wwebjs-mongo")
const mongoose = require("mongoose")
const MONGODB_URI =
  "mongodb+srv://matheusmfraresso:4AyZ63AJqc80koWu@cluster0.xfgcgez.mongodb.net/whatsapp-todo-api"
const qrcode = require("qrcode-terminal")
const cron = require("node-cron")
const tasks = require("./tasks.json")

//Consts
const matheus = tasks.filter((task) => task.responsavel !== "A")
const amanda = tasks.filter((task) => task.responsavel !== "M")
const MATHEUS_PHONE = "5541984398092@c.us"
const AMANDA_PHONE = "554191856682@c.us"

//Variables

//Connet to mongo to persist authentication
sendMessage()
async function sendMessage(phone, message) {
  await mongoose.connect(MONGODB_URI)

  const store = new MongoStore({ mongoose: mongoose })
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 60000,
    }),
  })

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true })
  })
  client.on("remote_session_saved", () => {
    client
      .sendMessage(phone || MATHEUS_PHONE, message || "remote session saved")
      .then(() => console.log("MSG enviada!"))
  })
  client.on("ready", () => {
    client
      .sendMessage(phone || MATHEUS_PHONE, message || "ready")
      .then(() => console.log("MSG enviada!"))
  })

  client.initialize()
}

cron.schedule("35 9,12,18,21 * * * *", () => {
  const message = `Teste de API todo`
  sendMessage(MATHEUS_PHONE, message)
  sendMessage(AMANDA_PHONE, message)
})

//daily tasks for matheus 9:30 am
cron.schedule("30 9,12,18,20 * * * *", () => {
  const message = `Bom dia! Vamos lembrar de fazer as tarefas hoje?`
  sendMessage(MATHEUS_PHONE, message)
})
cron.schedule("30 18 * * * *", () => {
  const message =
    `Bom dia Meu chuchuzinho amado, vamos lembrar de fazer as tarefas de hoje?` +
    sendMessage(AMANDA_PHONE, message)
})
//Monday Tasks
cron.schedule("30 9 * * * 1", () => {
  const matheus_message =
    "Tarefas de Segunda!! \n" +
    matheus.filter((task) =>
      task.dias.find((dia) => dia === 1).map((task) => `${task.descricao}\n`)
    )
  const amanda_message =
    "Tarefas de Segunda!! \n" +
    amanda.filter((task) =>
      task.dias.find((dia) => dia === 1).map((task) => `${task.descricao}\n`)
    )

  sendMessage(AMANDA_PHONE, amanda_message)
  sendMessage(MATHEUS_PHONE, matheus_message)
})
//Tuesday Tasks
cron.schedule("30 9 * * * 2", () => {
  const matheus_message =
    "Tarefas de terça!! \n" +
    matheus.filter((task) =>
      task.dias.find((dia) => dia === 2).map((task) => `${task.descricao}\n`)
    )
  const amanda_message =
    "Tarefas de terça!! \n" +
    amanda.filter((task) =>
      task.dias.find((dia) => dia === 2).map((task) => `${task.descricao}\n`)
    )

  sendMessage(AMANDA_PHONE, amanda_message)
  sendMessage(MATHEUS_PHONE, matheus_message)
})
//Wednesday Tasks
cron.schedule("30 9 * * * 3", () => {
  const matheus_message =
    "Tarefas de quarta!! \n" +
    matheus.filter((task) =>
      task.dias.find((dia) => dia === 3).map((task) => `${task.descricao}\n`)
    )
  const amanda_message =
    "Tarefas de quarta!! \n" +
    amanda.filter((task) =>
      task.dias.find((dia) => dia === 3).map((task) => `${task.descricao}\n`)
    )

  sendMessage(AMANDA_PHONE, amanda_message)
  sendMessage(MATHEUS_PHONE, matheus_message)
})
//Thursday Tasks
cron.schedule("30 9 * * * 4", () => {
  const matheus_message =
    "Tarefas de quinta!! \n" +
    matheus.filter((task) =>
      task.dias.find((dia) => dia === 4).map((task) => `${task.descricao}\n`)
    )
  const amanda_message =
    "Tarefas de quinta!! \n" +
    amanda.filter((task) =>
      task.dias.find((dia) => dia === 4).map((task) => `${task.descricao}\n`)
    )

  sendMessage(AMANDA_PHONE, amanda_message)
  sendMessage(MATHEUS_PHONE, matheus_message)
})
//Friday Tasks
cron.schedule("30 9 * * * 5", () => {
  const matheus_message =
    "Tarefas de sexta!! \n" +
    matheus.filter((task) =>
      task.dias.find((dia) => dia === 5).map((task) => `${task.descricao}\n`)
    )
  const amanda_message =
    "Tarefas de sexta!! \n" +
    amanda.filter((task) =>
      task.dias.find((dia) => dia === 5).map((task) => `${task.descricao}\n`)
    )

  sendMessage(AMANDA_PHONE, amanda_message)
  sendMessage(MATHEUS_PHONE, matheus_message)
})
//Saturday Tasks
cron.schedule("30 9 * * * 6", () => {
  const matheus_message =
    "Sábado é dia de faxina!! \n" +
    matheus.filter((task) =>
      task.dias.find((dia) => dia === 6).map((task) => `${task.descricao}\n`)
    )
  const amanda_message =
    "Sábado é dia de faxina!! \n" +
    amanda.filter((task) =>
      task.dias.find((dia) => dia === 6).map((task) => `${task.descricao}\n`)
    )

  sendMessage(AMANDA_PHONE, amanda_message)
  sendMessage(MATHEUS_PHONE, matheus_message)
})
