'use strict';

var angular = require('angularjs');
var ctrl = require('./app.controller.js');
var tools = require('./app.factory.tools.js');
var aye = require('angular-youtube-embed');

angular.module('app', ['youtube-embed'])
    .controller('ctrl', ['$scope', 'tools', 'youtubeEmbedUtils', '$filter', ctrl])
    .factory('tools', tools);

/* 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

console.log(tag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
        console.log('onYouTubeIframeAPIReady');
        player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                }
        });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
        event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
                setTimeout(stopVideo, 6000);
                done = true;
        }
}

function stopVideo() {
        player.stopVideo();
}
*/
// accepts optional transformer
// now transformers are compatible with ES6
String.prototype.template = function (fn, object) {
    'use strict';
    // Andrea Giammarchi - WTFPL License
    var
        hasTransformer = typeof fn === 'function',
        stringify = JSON.stringify,
        re = /\$\{([\S\s]*?)\}/g,
        strings = [],
        values = hasTransformer ? [] : strings,
        i = 0,
        str,
        m;
    while ((m = re.exec(this))) {
        str = this.slice(i, m.index);
        if (hasTransformer) {
            strings.push(str);
            values.push('(' + m[1] + ')');
        } else {
            strings.push(stringify(str), '(' + m[1] + ')');
        }
        i = re.lastIndex;
    }
    str = this.slice(i);
    strings.push(hasTransformer ? str : stringify(str));
    if (hasTransformer) {
        str = 'function' + (Math.random() * 1e5 | 0);
        strings = [
            str,
            'with(this)return ' + str + '(' + stringify(strings) + (
                values.length ? (',' + values.join(',')) : ''
            ) + ')'
        ];
    } else {
        strings = ['with(this)return ' + strings.join('+')];
    }
    return Function.apply(null, strings).call(
        hasTransformer ? object : fn,
        hasTransformer && fn
    );
};