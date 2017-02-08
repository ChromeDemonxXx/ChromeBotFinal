const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const request = require("request")
const revlo = require('node-revlobot-api')(config.revlokey);
const fs = require("fs");
var hasArgs = false;
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
// let guildmembers = bot.guild.members;



// if(!points[guildmembers]) points[guildmembers] = {points: 0};
// points[guildmembers].points++;
//
// var interval = setInterval(function() {
//   fs.writeFile('./points.json', JSON.stringify(points));
// let userPoints = points[guildmembers] ? points[guildmembers].points : 0;
// }, 1000);




bot.on("message", message => {

	if(message.author.bot) return;


  // if the points don't exist, init to 0;
  if(!points[message.author.id]) points[message.author.id] = {points: 0};
  points[message.author.id].points++;

  // And then, we save the edited file.
  fs.writeFile('./points.json', JSON.stringify(points));
let userPoints = points[message.author.id] ? points[message.author.id].points : 0;




	if(!message.content.startsWith(config.prefix)) return;
	let command = message.content.split(" ")[0];
	console.log("Command Executed: "+ command);
  let args = message.content.split(" ").slice(1);




  function checkForArgs(reqs)
  {
    console.log("checkForArgs Ran with args: ["+args+"]");
    if (args.length == reqs)
    {
      hasArgs = true;
      console.log("Set hasArgs to true. Args [" +args+"]");
    }
    else if (reqs == null)
    {
      if(args.length > 0)
      {
      hasArgs = true;
    }
    }
    else {
      hasArgs = false;
      console.log("Set hasArgs to false. Args [" +args+"]");
      return  message.channel.sendMessage("```"+command+ " Requires "+reqs+" arguments - Please refer to .help for more information```");
    }
  }







	var responseObject = {
  ".ayy": "Ayy, lmao!",
  ".wat": "Say what?",
  ".lol": "roflmaotntpmp",
  ".howbigaremybiceps": "Too big",
  ".swolybiblecommandments": "1: Thou shalt covet these gains\n\n"+
  "2: Bench like your life depends on it because it does.\n\n"+
  "3: Never skip leg day unless you really need a bicep pump.\n\n"+
  "4: You always need a bicep pump.\n\n"+
  "5: It's better to be seen as a douche bag than to not be seen at all.\n\n"+
  "6: Live large, die large, leave a giant coffin.\n\n"+
  "7: Fitness is 98 percent lighting, 2 percent is the sun effect on instagram.\n\n"+
  "8: It's not about how much you can lift, But how much you look Iike you can lift.\n\n"+
  "9: The day you started lifting was the day you forever became small because you'll never be as big as you want to be.",
  ".boobs": "(.)(.)",

};

  // Main responseObject sender
    if(responseObject[message.content]) {
    message.channel.sendMessage("```" + responseObject[message.content] + "```");
  }
	// Echoes whatever user inputs
	  if (command == ".echo") {
      checkForArgs();
      if (hasArgs === true)
      {
		message.channel.sendMessage("```" + args.join(" ") + "```");
  }
	}
	// Adds two user arguments
	 if (command == ".add") {
     checkForArgs(2);
     if (hasArgs === true)
     {
		 let num1 = parseInt(args[0]);
		 let num2 = parseInt(args[1]);
		 message.channel.sendMessage("```"+num1 + " + " + num2 + " = " + (num1 + num2)+"```");
     }
	 }
	// Subtracts two user arguments
	if (command == ".subtract") { checkForArgs(2);
   if (hasArgs === true)
   {
     let num1 = parseInt(args[0]);
     let num2 = parseInt(args[1]);
     message.channel.sendMessage("```"+num1 + " - " + num2 + " = " + (num1 - num2)+"```");
}

	}
	// Multiplies two user arguments
	if (command == ".multiply") {
    checkForArgs(2);
    if (hasArgs === true)
    {
      let num1 = parseInt(args[0]);
  		let num2 = parseInt(args[1]);
  		message.channel.sendMessage("```"+num1 + " * " + num2 + " = " + (num1 * num2)+"```");
}
	}
	// Divides 2 user arguments
	if (command == ".divide") {
    checkForArgs(2);
    if (hasArgs === true)
    {
      let num1 = parseInt(args[0]);
      let num2 = parseInt(args[1]);
      message.channel.sendMessage("```"+num1 + " / " + num2 + " = " + (num1 / num2)+"```");
}
	}






  if(command ==".points") {
      message.reply("```You have ["+userPoints+"] points!```");
    }
// Gets ArcheAge Service Status
  if (command == ".status")  {

  var url = "http://api.youenvy.us/?request=status&output=JSON&callback="

  request({
      url: url,
      json: true
  }, function (error, response, body) {

  if (!error && response.statusCode === 200) {

          message.channel.sendMessage("```"+
            JSON.stringify(body.envy.services[0].serviceName) + "   is currently    " + JSON.stringify(body.envy.services[0].serviceStatus)+"\n"
          + JSON.stringify(body.envy.services[1].serviceName) + "    is currently    " + JSON.stringify(body.envy.services[1].serviceStatus)+"\n"
          + JSON.stringify(body.envy.services[2].serviceName) + "       is currently    " + JSON.stringify(body.envy.services[2].serviceStatus)+"\n"
          + JSON.stringify(body.envy.services[3].serviceName) + "   is currently    " + JSON.stringify(body.envy.services[3].serviceStatus)+"\n"
          + JSON.stringify(body.envy.services[4].serviceName) + "       is currently    " + JSON.stringify(body.envy.services[4].serviceStatus)+"\n"
          + JSON.stringify(body.envy.services[5].serviceName) + "           is currently    " + JSON.stringify(body.envy.services[5].serviceStatus)+"```"); // Print the json response

      }
  else {

        message.channel.sendMessage("```"+"Error: "+ error + "\nStatus Code: " + response.statusCode+"```");
      }
  })
}
// Checks # of online users
  if(command == ".online"){
    request({
  uri: "http://crazy52.com/api/discord/discordpop.php?id=98528463983493120",
}, function(error, response, body) {
  if (!error && response.statusCode === 200) {
  message.channel.sendMessage("```Users Online: " + body + "```");
}
else {

  message.channel.sendMessage("```Error: "+ error + "\nStatus Code: " + response.statusCode + "```");
}
});


}
// Checks for account leaks
if(command == ".pwn"){
  request({
uri: "https://haveibeenpwned.com/api/breachedaccount/"+args.join(" "),
headers: {
   'User-Agent': 'ChromeBot'
 }
}, function(error, response, body) {
if (!error && response.statusCode === 200) {
message.channel.sendMessage("```Username/Email leaked on: " + body + "```");
}
else {
  if (!error && response.statusCode === 404)
  {
    message.channel.sendMessage("```No leaks found for " + args.join(" ")+"```")
  }
  else {
    message.channel.sendMessage("```Error: "+ error + "\nStatus Code: " + response.statusCode + "```");
    console.log("Site Logged: "+ "https://haveibeenpwned.com/api/breachedaccount/"+args.join(" "));
  }

}
});

}

	});


bot.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    member.guild.defaultChannel.sendMessage(`Everyone welcome ${member.user}, the newest member of ${member.guild.name}!`);
    let role = member.guild.roles.get("name", "Followers");
    member.addRole(role).catch(console.error);
});



bot.on("ready", () => {
    console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
    bot.user.setGame("Chrome's magic flute");
});
bot.on('error', e => { console.error(e); });
bot.login(config.token);
