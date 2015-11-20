
$(document).on("ready",function(){

	$(".js-search").on("click",function(){

		var userSong=$(".js-userSong").val();
		
		if(userSong){	
			$.ajax({
					type:"GET", 
					url:'https://api.spotify.com/v1/search?type=track&query='+ userSong,
					success: showSongDetails,
					error: errorGettingSong,
					dataType: "json"
		    });
		};
	});

	var musicState=false;
	playMusic();
	var i=0;
	

		function showSongDetails(songRequested){
			console.log("Song List:", songRequested);
			var songTitle=songRequested.tracks.items[0].name;
			var ArtistName= songRequested.tracks.items[0].artists[0].name;
			var albumImageUrl=songRequested.tracks.items[0].album.images[0].url;
			var albumImageTag="<img src= "+ albumImageUrl +">" +"</img>";
			$(".cover").append(albumImageTag);
			$(".title").text(songTitle);
			$(".author").text(ArtistName);
			var songSample=songRequested.tracks.items[0].preview_url;
			console.log(songSample);
			$(".js-audio").attr("src",songSample);
			$(".btn-play").toggleClass('disabled');
			musicState = false;
			
		};

		function errorGettingSong(){
			var errorMessage='<p>Error getting that song.</p>';
			$(".js-show-error").append(errorMessage);
		};
		function playMusic(){
			$(".btn-play").on("click",function(){
				$('.js-audio').prop('currentTime');

				
				function printTime () {
  					var current = $('.js-audio').prop('currentTime');
 					console.debug('Current time: ' + current);
 					$('.js-progress-bar').attr('value',current);
 				 	// Have printTime be called when the time is updated
                	
	            };
	        $('.js-audio').on('timeupdate', printTime);

            

				// console.log("PLAY?", musicState);
				musicState=!musicState;
			    if(musicState)
			 		$(".js-audio").trigger('play');
				else
					$(".js-audio").trigger('pause');
            });	
	    };
		
});




