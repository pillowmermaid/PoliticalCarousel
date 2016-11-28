var carouselContainer = $('.carousel__container'),
		carousel 					= $('.carousel'),
		desktopBreak 			= 1024,
		tabletBreak 			= 768,
		mobileBreak 			= 640,
		slideWidth				= 0,
		slideWidthMargin 	= 0,
 		carouselItems 		= [];

function initCarousel(){
	window.addEventListener('resize', function(){
		if (window.innerWidth >= 1300){
			slideWidthMargin = 20;
			setTimeout(resizeCarousel(4), 500);
		}
		else if (window.innerWidth < 1300 && window.innerWidth > 1024) {
			slideWidthMargin = 20;
			setTimeout(resizeCarousel(3), 500);
		}
		else if (window.innerWidth <= 1024 && window.innerWidth >= 768) {
			slideWidthMargin = 10;
			setTimeout(resizeCarousel(3), 500);
		}
		else {
			slideWidthMargin = 10;
			setTimeout(resizeCarousel(1), 500);
		}
	});
	$.ajax({
		dataType: 'jsonp',
    contentType: "application/jsonp; charset=utf-8",
		jsonpCallback: 'gNews_getRidingDetailsCallback',
		url: '/static/electionfeed.json',
		success: function(data){
			for(var i = 0; i < data.length; i++){
				var name = data[i].name;
				var id = data[i].id;
				var runners = [];
				sortedResults = data[i].results.sort(function(a,b){return parseFloat(a.votes)-(b.votes)}).reverse();
				for(var j = 0; j < sortedResults.length; j++){
					if(j === 0){
						runners.push(
							"<div class='runner winner "+sortedResults[j].partyCode.toLowerCase()+"'><span class='name'>"+sortedResults[j].name+"</span><span class='votes'><span class='count'>"+sortedResults[j].votes+"</span> votes</span><div class='bg'></div></div>"
						);
					}
					else {
						runners.push(
							"<div class='runner "+sortedResults[j].partyCode.toLowerCase()+"'><span class='name'>"+sortedResults[j].name+"</span><span class='votes'><span class='count'>"+sortedResults[j].votes+"</span> votes</span><span class='party-tag'></span><div class='bg'></div></div>"
						);
					}

				}
				var itemClass = 'item__'+id;
				var carouselItem = "<li class='carousel__item "+itemClass+"'><h2>"+name+"</h2><div class='results'>"+runners.join('')+"</div></li>";

				carouselItems.push({"id": id, "target":itemClass});
				carousel.append(carouselItem);
			}
			var cellCount;
			if (window.innerWidth >= 1300){
				slideWidthMargin = 20;
				cellCount = 4;
			}
			else if (window.innerWidth < 1300 && window.innerWidth > 1024) {
				slideWidthMargin = 20;
				cellCount = 3;
			}
			else if (window.innerWidth <= 1024 && window.innerWidth >= 768) {
				slideWidthMargin = 10;
				cellCount = 3;
			}
			else {
				slideWidthMargin = 10;
				cellCount = 1;
			}
			resizeCarousel(cellCount);
			revealCarousel();
			$('.carousel .carousel__item:first').before($('.carousel .carousel__item:last'));
		}
	});
}

function revealCarousel(){
			$('.carousel__item').each(function(i){
				var $slide = $(this);
				setTimeout(function(){
					$slide.animate({"opacity": 1}, 150);
				}, 100*i);
			});
	}

function addFade(i){
		$('.'+carouselItems[i].target).addClass('fadein');
}

function resizeCarousel(numCells){
		slideWidth = $('.carousel .carousel__item').outerWidth();
		if (numCells > 1){
			carouselContainer.css({'width': slideWidth*numCells+slideWidthMargin*numCells+'px'});
		}
		else {
			carouselContainer.css({'width': '100%'});
		}
		carousel.css({'left': slideWidth*(-1)-slideWidthMargin+'px', 'width': slideWidth*carouselItems.length});
}

function nextClick(){
	var spacing = slideWidth + slideWidthMargin;
	var leftIndent = parseInt(carousel.css('left')) - spacing;
	carousel.animate({'left': leftIndent},200,'linear',function(){
		carousel.css({'left': (-1)*spacing+'px'});
			$('.carousel .carousel__item:last').after($('.carousel .carousel__item:first'));
	});
}

function prevClick(){
	var spacing = slideWidth  + slideWidthMargin;
	var leftIndent = parseInt(carousel.css('left')) + spacing;
	carousel.animate({'left': leftIndent},200, 'linear',function(){
		carousel.css({'left': (-1)*spacing+'px'});
			$('.carousel .carousel__item:first').before($('.carousel .carousel__item:last'));
	});
}
