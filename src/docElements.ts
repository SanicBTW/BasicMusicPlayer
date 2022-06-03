var audioElement = new Audio();
var curPlayingInfo = document.getElementById("curplayinginfo");
//gotta make buttons event based
var playButton = document.getElementById("playButton");
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");
var songList = document.getElementById("funnyList");
var songListLabel = document.getElementById("funnyListInfo");
var customServerInput = document.getElementById("funnyServer");
var infoThingy = document.getElementById("info"); //idk how to name this one lol

export default {audioElement, curPlayingInfo, playButton, prevButton, nextButton, songList, songListLabel, customServerInput, infoThingy};