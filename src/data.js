import jsonp from 'jsonp';

var data = (function getChannels() {
		const channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", 
		"freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
		"brunofin", "comster404"];
		
		var channels = [];
		var url;
		
		for (var i = 0; i < channelNames.length; i++) {
			url = `https://api.twitch.tv/kraken/streams/${channelNames[i]}`;
			jsonp(url, (err, data) => {
				if (err) {
					console.log(err);
					return "Error";
				}
				
				channels.push(data);
				console.log(channels);
				if (i === channelNames.length - 1) {
					return channels;
				}
			});
		}
							
})();

export default data;
