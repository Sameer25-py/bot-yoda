//initializations
const Discord = require('discord.js');
const { Client } = require('discord.js');
const variables = require('./variables.json');
const utility = require('./utility.js')
client = new Client()
first_invoker = false;
////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  //setting activity
  client.user.setActivity('type <>help for commands')
  .then(presence =>
    {
    console.log(`Activity set to ${presence.activities[0].name}`)})
  .catch(console.error);
});

///////////////////////////////////////////////////////////////////////////////////////////////////





client.on('message', message => {


    if (message.author.id === client.user.id) {
      return
    }
    if (message.content === variables.PREFIX + 'scramble'){
      //checking voicestate of summoner
      if (message.member.voice.channel) {

        //fetching all users connected to the invoked voice channel
        usermap = message.member.voice.channel.members
        userlist = []
        for ([key, value] of usermap) {
          userlist.push(value)
        }
        //collecting users split
        split = utility.scramble(userlist)
        team1 = split.team1
        team2 = split.team2


        //sending users to the channels
        team1.forEach(user => {
          user.voice.setChannel(variables.TEAM1)
        })
        team2.forEach(user => {
          user.voice.setChannel(variables.TEAM2)
        })
      }
      else {
        message.reply('You need to join a voice channel first!')
      };
    }
    else if (message.content === variables.PREFIX + 'reshuffle') {
      team1 = []
      team2 = []
      userlist = []
      stat = false
      if (message.member.voice.channel) {

        //fetching users from team1 and team2 and general vc
        client.channels.fetch(variables.TEAM1).then(data1 => {
          client.channels.fetch(variables.TEAM2).then(data2 => {

            //concatinating members in one array
            for ([key, value] of data1.members) {
              userlist.push(value)
            }
            for ([key, value] of data2.members) {
              userlist.push(value)
            }

            //checking if the invoked user is present in either channels
            for (i = 0; i < userlist.length; i++) {
              if (message.member === userlist[i]) {
                stat = true
              }
            }
            //fetching from general channel
            client.channels.fetch(variables.GENERAL).then(data3 => {
              for ([key, value] of data3.members) {
                userlist.push(value)
              }

              //splitting again
              split = utility.scramble(userlist)
              team1 = split.team1
              team2 = split.team2

              //split only if invoked user is present in either channel
              if (stat) {
                //sending users to the channels
                team1.forEach(user => {
                  user.voice.setChannel(variables.TEAM1)
                })
                team2.forEach(user => {
                  user.voice.setChannel(variables.TEAM2)
                })
              }
              //if invoker not in either channel
              else {
                message.reply("You need to join ***Team 1*** or ***Team 2*** voice channel first!")

              }

            })


          })

        })

      }
      //if invoker not in voice channel
      else {
        message.reply("You need to join ***Team 1*** or ***Team 2*** voice channel first!")
      }

    }
    else if (message.content === variables.PREFIX + 'toss') {
      result = utility.toss()
      if (result) {
        message.channel.send(`${message.author} tossed a coin:***Heads***`)
      }
      else {
        message.channel.send(`${message.author} tossed a coin:***Tails***`)
      }

    }
    else if(message.content === variables.PREFIX + 'help'){
        message.channel.send("> **<>toss**: Toss a coin\n> **<>scramble**: Split players from #General to #Team1 and #Team2\n> **<>reshuffle**: reshuffle scrambled teams and #General members")  
    }

  

});


client.login(variables.TOKEN);