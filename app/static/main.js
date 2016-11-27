var carouselContainer = $('.carousel__container');
var carousel = $('.carousel');
var carouselOrder = [];
var currentSlide;

function initCarousel(){
	console.log('test');
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
					runners.push("<div class='runner "+sortedResults[j].partyCode.toLowerCase()+"'>"+sortedResults[j].name+"</div>");
				}
				var itemClass = 'item__'+id;
				var carouselItem = "<li class='carousel__item "+itemClass+"'>"+name+"<div class='results'>"+runners.join('')+"</div></li>";

				carouselOrder.push({"id": id, "target":itemClass});
				carousel.append(carouselItem);
			}
			currentslide = 0;
			var slideWidth = $('.carousel .carousel__item').outerWidth();
			carouselContainer.css({'width': slideWidth*3+30+'px'});
			carousel.css({'left': slideWidth*(-1)-10+'px'});
			$('.carousel .carousel__item:first').before($('.carousel .carousel__item:last'));

		}
	});
}

function nextClick(){
	var slide = $('.carousel .carousel__item');
	var spacing = slide.outerWidth() + 10;
	var leftIndent = parseInt(carousel.css('left')) - spacing;
	carousel.animate({'left': leftIndent},200,'linear',function(){
		carousel.css({'left': '-310px'});
			$('.carousel .carousel__item:last').after($('.carousel .carousel__item:first'));
	});
}

function prevClick(){
	var slide = $('.carousel .carousel__item');
	var spacing = slide.outerWidth()  + 10;
	var leftIndent = parseInt(carousel.css('left')) + spacing;
	carousel.animate({'left': leftIndent},200, 'linear',function(){
		carousel.css({'left': '-310px'});
			$('.carousel .carousel__item:first').before($('.carousel .carousel__item:last'));
	});
}
