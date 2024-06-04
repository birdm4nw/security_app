import asyncio
import telegram

# Telegram Requirenments
TOKEN = 'telegram-token'
chat_id = 'chat-id'

# Channel ID Sample: -1001829542722

bot = telegram.Bot(token=TOKEN)

async def send_message(text, chat_id):
    async with bot:
        await bot.send_message(text=text, chat_id=chat_id)


async def send_document(document, chat_id):
    async with bot:
        await bot.send_document(document=document, chat_id=chat_id)


async def send_photo(photo, chat_id):
    async with bot:
        await bot.send_photo(photo=photo, chat_id=chat_id)


async def send_video(video, chat_id):
    async with bot:
        await bot.send_video(video=video, chat_id=chat_id)


async def main():
    # Sending a message
    await send_message(text='Hi Friend!, How are you?', chat_id=chat_id)



if __name__ == '__main__':
    asyncio.run(main())
