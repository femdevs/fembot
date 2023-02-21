import discord
import random

client = discord.Client(intents=discord.Intents.all())

image_links = [
    "https://images.alphacoders.com/889/thumb-1920-889928.png",
    "https://i.pinimg.com/originals/95/9a/fe/959afe4a11c1723f5772c59383df30ec.jpg",
    "https://preview.redd.it/png-astolfo-v0-51c3jgxbctt91.png?auto=webp&s=bf4aeacc6dcdd364ca949c28ebb327baade2fb00",
    "https://pbs.twimg.com/profile_images/1583915521606549505/fbPq2k5l_400x400.jpg",
    "https://i0.wp.com/megamousearts.com/wp-content/uploads/2021/05/Website-tiny-Astolfo.jpg?fit=900%2C1350&ssl=1",
    "https://pbs.twimg.com/media/Eyt-AeoXMAIX1Xz.jpg:large",
    "https://i.ebayimg.com/images/g/jvwAAOSw05FjTJRK/s-l1600.png",
    "https://w0.peakpx.com/wallpaper/57/154/HD-wallpaper-astolfo-anime-fate-grand-order-trap.jpg",
    "https://alchetron.com/cdn/astolfo-cd94a209-0df6-4766-a5de-2e3fcf49c5f-resize-750.jpeg",
    "https://img.devilchan.com/sample/2022/06/08/00/48/13902/fate-grand-order-fate-series-astolfo-fate-13902-496x702.webp",
    "https://i.pinimg.com/736x/4e/ff/88/4eff88b2a7725320b8ed279dad62dd36.jpg",
    "https://i.kym-cdn.com/photos/images/original/002/021/406/e92"
]

thebo_links = [
    "https://cdn.discordapp.com/attachments/1040327100181270679/1077283426987679824/theboys.png",
    "https://media.discordapp.net/attachments/1040327100181270679/1077283454045147296/the_bo.jpg?width=691&height=559",
    "https://media.discordapp.net/attachments/1040327100181270679/1077283727870271529/image.png",
    "https://media.discordapp.net/attachments/1040327100181270679/1077283850935336960/the-boys-saison-3-1.png?width=894&height=559",
    "https://img.seriesonline.gg/xxrz/250x400/418/d7/64/d76490dba9831502963013285425627e/d76490dba9831502963013285425627e.jpg"
]

@client.event
async def on_ready():
    print("Logged in as {0.user}".format(client))
    
@client.event
async def on_message(message):
    if message.author.bot:
        return
    text = message.content.lower()
    if text.startswith("!"):
        command = text.replace("!", "").split()[0]
        match command:
            case "help":
                await message.channel.send("Commands: !help, !astolfo, !thebo, !thegoods")
            case "astolfo":
                random_image_link = random.choice(image_links)
                await message.channel.send(random_image_link)
            case "thebo":
                random_thebo_link = random.choice(thebo_links)
                await message.channel.send(random_thebo_link)
            case "thegoods":
                await message.channel.send(content="Uwu, here you go!", file=discord.File(filename="the_goods.mp3", fp="the_goods.mp3"))
    
    elif text.endswith("uwu") or text.startswith("uwu"):
        await message.channel.send("rawr :3")
    elif text.endswith("owo") or text.startswith("owo"):
        await message.channel.send(">w< teehee")

@client.event
# member join event
async def on_member_join(member):
    memberAvatar = member.avatar_url
    memberCreatedTimestamp = f'<t:{(member.created_at.timestamp()/1000).__floor__()}:F>'
    logChannel = client.get_channel(1040327100181270679)
    embed = discord.Embed(title="Member Joined", description=f"{member.mention} has joined the server!", color=0x00ff00)
    embed.set_thumbnail(url=memberAvatar)
    embed.add_field(name="Account Created", value=memberCreatedTimestamp, inline=True)
    embed.add_field(name="Member Count", value=member.guild.member_count, inline=True)
    await logChannel.send(embed=embed)


client.run("MTA3NzI0MDMxMTg3NDU5Njk0NQ.GLnGUD.ssM6dK_yhvm_v55yaUtCHsqqhHZaR8HIQ98dIc")
