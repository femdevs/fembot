import nextcord
from nextcord.ext import commands
from nextcord import Interaction
import random

client = nextcord.Client(command_prefix="!",
                         intents=nextcord.Intents.all()
                         )



@client.event
async def on_ready():
    print("Logged in as {0.user}".format(client))

@client.event
async def on_message(message):
    if message.content.startswith("!astolfo"):
        random_image_link = random.choice(image_links)
        await message.channel.send(random_image_link)
        
@client.command()
async def astolfo(ctx):
   image_links = [
    "https://images.alphacoders.com/889/thumb-1920-889928.png",
    "https://i.pinimg.com/originals/95/9a/fe/959afe4a11c1723f5772c59383df30ec.jpg",
    "https://preview.redd.it/png-astolfo-v0-51c3jgxbctt91.png?auto=webp&s=bf4aeacc6dcdd364ca949c28ebb327baade2fb00",
    "https://pbs.twimg.com/profile_images/1583915521606549505/fbPq2k5l_400x400.jpg",
   ]
   randImgLink=random.choice(image_links)
   asMessage=nextcord.Embed


client.run("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc")