module.exports = function ($scope, tools, youtubeEmbedUtils, $filter) {
    $scope.videoId = '';
    $scope.entry = '';
    $scope.list = [];
    $scope.exportType = 'txt';
    $scope.addToList = function () {
        if ($scope.entry.length < 1) return;
        var currentTime = $scope.player.getCurrentTime();
        var e = {
            $id: tools.uid(),
            title: $scope.entry,
            currentTimeString: tools.secToTimeString(currentTime),
            seconds: currentTime
        };
        $scope.pushList(e);
        $scope.entry = '';
    }
    $scope.pushList = function (e) {
        $scope.list.push(e);
    }

    $scope.spliceList = function (i) {
        $scope.list.splice(i, 1);
    }
    $scope.videoId = '';

    $scope.moveTo = function (seconds) {
        $scope.player.seekTo(seconds, true);
    }

    $scope.remove = function (e) {
            var index = $scope.list.findIndex(function (element) {
                return element.$id == this;
            }, e.$id);
            if (index > -1) $scope.list.splice(index, 1);
        }
        /*	$scope.changeTime = function(i, n) {
        		console.log(i, n);
        		$scope.list[i].seconds += n;
        		$scope.list[i].currentTimeString = tools.secToTimeString($scope.list[i].seconds);
        		$scope.moveTo($scope.list[i].seconds);
        	}
        	*/
    $scope.changeTime = function ($id, n) {
        console.log($id);
        var arr = $filter('filter')($scope.list, {
            $id: $id
        });
        if (arr.length !== 1) return;
        var l = arr[0];
        //console.log(i, n);
        l.seconds += n;
        l.currentTimeString = tools.secToTimeString(l.seconds);
        $scope.moveTo(l.seconds);
    }

    $scope.toCopy = function (type) {
        var tmplts = {
            'txt': '${time} ${title}',
            'html': '<a href="http://www.youtube.com/watch?v=${videoId}&t=${time}">${title}</a>',
            'md': '[${time} ${title}](http://www.youtube.com/watch?v=${videoId}&t=${time})'
        }
        mask = tmplts[type] || tmplts['txt'];
        var arr = [].concat($scope.list);
        arr.sort(function (a, b) {
            return a.seconds - b.seconds;
        });
        return arr.map(function (e) {
            this.options.time = e.currentTimeString;
            this.options.title = e.title;
            return this.mask.template(this.options); //this.replace('%s', tools.secToTime(e.seconds) + ' ' + e.title;
        }, {
            mask: mask,
            options: {
                videoId: $scope.videoId
            }
        }).join('\n');
    }
    $scope.$watch(function () {
        return $scope.url;
    }, function (cV, pV) {
        $scope.videoId = youtubeEmbedUtils.getIdFromURL(cV);
    });
    $scope.$watch(function () {
        return $scope.entry;
    }, function (cV, pV) {
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