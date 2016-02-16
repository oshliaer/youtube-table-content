module.exports = function($scope, tools, youtubeEmbedUtils) {
	$scope.entry = '';
	$scope.list = [];
	$scope.addToList = function() {
		if ($scope.entry.length < 1) return;
		var currentTime = $scope.player.getCurrentTime();
		var e = {
			title: $scope.entry,
			currentTimeString: tools.secToTimeString(currentTime),
			seconds: currentTime
		};
		$scope.pushList(e);
		$scope.entry = '';
	}
	$scope.pushList = function(e) {
		$scope.list.push(e);
	}

	$scope.spliceList = function(i) {
		$scope.list.splice(i, 1);
	}
	$scope.videoId = '';

	$scope.moveTo = function(seconds) {
		$scope.player.seekTo(seconds, true);
	}

	$scope.changeTime = function(i, n) {
		console.log(i, n);
		$scope.list[i].seconds += n;
		$scope.list[i].currentTimeString = tools.secToTimeString($scope.list[i].seconds);
		$scope.moveTo($scope.list[i].seconds);
	}

	$scope.toCopy = function() {
		return $scope.list.map(function(e) {
			return tools.secToTime(e.seconds) + ' ' + e.title;
		}).join('\n');
	}

	$scope.$watch(function() {
		return $scope.url;
	}, function(cV, pV) {
		$scope.videoId = youtubeEmbedUtils.getIdFromURL(cV);
	});
	$scope.$watch(function() {
		return $scope.entry;
	}, function(cV, pV) {
		if (!$scope.player) return;
		if (cV.length < 1) {
			$scope.player.playVideo()
		} else {
			$scope.player.pauseVideo();
		}
	});
	/*
	        $scope.$on('youtube.player.ended', function($event, player) {
	                player.playVideo();
	        });

	        $scope.getCurrentTime = function() {
	                console.log($scope.player.getCurrentTime());
	        }
	*/
}
