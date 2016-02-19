module.exports = function() {
	return {
		secToTimeString: function(sec) {

			sec = Math.floor(sec);

			function cut(val, suffix) {
				return val ? val + suffix : '';
			}

			var hours = Math.floor(sec / 3600);
			var minutes = Math.floor((sec - (hours * 3600)) / 60);
			var seconds = sec - (hours * 3600) - (minutes * 60);

			var time = cut(hours, 'h') + cut(minutes, 'm') + cut(seconds || '0', 's');

			return time;
		},
		secToTime: function(sec) {

			sec = Math.floor(sec);
			var line = [];

			function cut(val) {
				val = '0' + val;
				return val.substr(-2, 2);
			}

			var hours = Math.floor(sec / 3600);
			if (hours) line.push(cut(hours));
			var minutes = Math.floor((sec - (hours * 3600)) / 60);
			var seconds = sec - (hours * 3600) - (minutes * 60);
			line.push(cut(minutes), cut(seconds));
			var time = line.join(':');

			return time;
		},
		uid: function() {
			return Math.floor((1 + Math.random()) * 0x1000000)
				.toString(16)
				.substring(1);
		}
	}
}
