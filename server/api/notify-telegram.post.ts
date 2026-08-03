import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = config.telegramBotToken
  const chatId = config.telegramChatId

  const body = await readBody(event)

  if (!token || !chatId || token === 'your-telegram-bot-token' || chatId === 'your-telegram-chat-id') {
    console.warn('Telegram Bot Token or Chat ID not configured. Skipping notification.')
    return { success: false, message: 'Telegram credentials not configured' }
  }

  // Format pesan Markdown
  const message = `
⚠️ *LAPORAN KERUSAKAN BARU* ⚠️

*🆔 ID Laporan:* \`${body.id}\`
*🚌 No. Armada:* ${body.no_armada}
*👤 Sopir:* ${body.nama_sopir}
*📅 Tanggal:* ${body.tanggal_kerusakan} (${body.hari_kerusakan})

*📝 Deskripsi Kerusakan:*
${body.deskripsi}

*🔍 Status:* 🟡 ${body.status}

_Mohon tim Operasional segera memeriksa laporan ini di dashboard._
  `.trim()

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const res = await $fetch(url, {
      method: 'POST',
      body: {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      }
    })

    return { success: true, response: res }
  } catch (err: any) {
    console.error('Failed to send Telegram notification:', err.message || err)
    return { success: false, error: err.message || err }
  }
})
