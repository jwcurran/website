$(window).load(function(){
	$('#menu').html('<table id="menutable">\
		<tr>\
			<td><a href="index.html"><div class="menubutton">About Me</div></td>\
			<td><a href="JohnCurranWebResume_2-10-15.pdf" target=="_blank"><div class="menubutton">Resume</div></a></td>\
			<td>\
				<div class="menubutton">\
					Portfolio\
					<div class="submenu">\
						<ul>\
							<li>\
								<a href="games.html"><div class="submenubutton">Games</div></a>\
								<div class="submenu">\
									<ul>\
										<li>\
											<a href="pong.html"><div class="submenubutton">JavaScript Pong</div></a>\
										</li>\
									</ul>\
								</div>\
							</li>\
						</ul>\
					</div>\
				</div>\
			</td>\
			<td><div class="menubutton">Blog</div></td>\
			<td><a href="pictures.html"><div class="menubutton">Pictures</div></a></td>\
		</tr>\
		<tr>\
			<td><div id="underline"></div></td>\
		</tr>\
	</table>');
	$('#underline').hide();
	$('.submenu').hide();
	var basebgcolor = $('.menubutton:not(#current)').css('background-color');
	$('.menubutton').mouseenter(function(e){
		$(this).css({
			'background-color' : '#DF7401',
			'font-weight' : 'bold',
			'box-shadow' : '10px 10px 5px #888888'
		});
		
		$('#underline').stop().show().css({
			'width' : '0px',
			'height' : '0px',
			'left' : $('#menu').offset().left // offset() works better cross browser than position() does
		});
		//alert($('#menu').position().left); //Turns out webkit browsers do not like position() here. Interesting.
		var xPos = $(this).position().left + 2; 
		$('#underline').animate(
			{
				'left' :  xPos + 30,
				'width' : '200px',
				'height' : '10px'
			},
			450
		);
		$('#underline').animate(
			{
				'left' :  xPos,
			},
			100
		);
		
		$(this).children('.submenu').stop().show("slow").css({
			'left' : parseInt($(this).position().left) + parseInt($('.menubutton').css('width'))/2,
			'top' : parseInt($(this).offset().top) + parseInt($('.menubutton').css('height')),
			'font-weight' : 'normal'
		});		
		
	}).mouseleave(function(){
		if($(this).attr('id') != "current"){
			$(this).css({
				'background-color' : basebgcolor,
				'font-weight' : 'normal'
			});
		}
		$(this).css({
			'box-shadow' : 'none'
		});
		$('#underline').stop().hide();
		$('.submenu').stop().hide("slow");
	});
	
	$('.submenu li').mouseenter(function(){
		$(this).css({
			'background-color' : '#DF7401',
			'font-weight' : 'bold'
		});
		$(this).children('.submenu').stop().show("slow").css({
			'left' : parseInt($(this).position().left) + parseInt($('.menubutton').css('width')),
			'top' : parseInt($(this).position().top) - 2,
		});
	});
	$('.submenu li').mouseleave(function(){
		$(this).css({
			'background-color' : basebgcolor,
			'font-weight' : 'normal'
		});
		$(this).children('.submenu').stop().hide("slow");
	});
});