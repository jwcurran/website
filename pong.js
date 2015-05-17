$(window).load(function(){
	/******************************************************************************************************
	******************************************* BEGIN PONG ************************************************
	******************************************************************************************************/
	/*known issue - the pong webpage is not responsive to changes in browser window size*/
	var userScore = 0;
	var aiScore = 0;
	
	$('#userPaddle').css('left', $('#table').offset().left + 10);
	$('#aiPaddle').css('left', parseInt($('#table').offset().left) + parseInt($('#table').css('width')) - 10);
	document.getElementById('score').innerHTML = "<h1>"+userScore+" : "+aiScore+"</h1>";
	
	$('#table').mousemove(function(e){
		//alert('paddle: ' + (parseInt(e.pageY) + parseInt($('.paddle').css('height'))));
		if((parseInt(e.pageY) + parseInt($('.paddle').css('height'))) < (parseInt($('#table').offset().top) + parseInt($('#table').css('height')) + 10)){
			$('#userPaddle').css('top', e.pageY);
			userPaddle.top = e.pageY;
			userPaddle.bottom = e.pageY + parseInt($('.paddle').css('height'));
			//paddle.left = e.pageX; //paddle left and right never change, dumbass
			//paddle.right = e.pageX + parseInt($('.paddle').css('width'));
		}
	});
	
	var table = {
		top: parseInt($('#table').offset().top),
		bottom: parseInt($('#table').offset().top) + parseInt($('#table').css('height')),
		left: parseInt($('#table').offset().left),
		right: parseInt($('#table').offset().left) + parseInt($('#table').css('width'))
	}
	
	var userPaddle = {
		top: parseInt($('#userPaddle').offset().top),
		bottom: parseInt($('#userPaddle').offset().top) + parseInt($('.paddle').css('height')),
		left: parseInt($('#userPaddle').offset().left),
		right: parseInt($('#userPaddle').offset().left) + parseInt($('.paddle').css('width'))
	}
	
	var aiPaddle = {
		top: parseInt($('#aiPaddle').offset().top),
		bottom: parseInt($('#aiPaddle').offset().top) + parseInt($('.paddle').css('height')),
		middle: parseInt($('#aiPaddle').offset().top) + parseInt($('.paddle').css('height'))/2,
		left: parseInt($('#aiPaddle').offset().left),
		right: parseInt($('#userPaddle').offset().left) + parseInt($('.paddle').css('width')),
		intercept: 0,
		speed: 0,
		move: function(){
			if(ball.dx > 0){
				this.intercept = (this.left - ball.right) * ball.dy/ball.dx + ball.top;
				//alert(this.intercept + " " + ball.top);
				if(this.left - ball.right >= 450){this.speed = 1;}
				else if(this.left - ball.right >=350 ){this.speed = 3;}
				else{this.speed = 4;}
				if (this.middle < this.intercept){
					if(this.bottom + this.speed >= table.bottom + 10){
						this.speed = table.bottom - this.bottom + 10;
						$('#aiPaddle').css('top', this.top + this.speed);
						this.top += this.speed;
						this.middle += this.speed;
						this.bottom += this.speed;
					}else{
						$('#aiPaddle').css('top', this.top + this.speed);
						this.top += this.speed;
						this.middle += this.speed;
						this.bottom += this.speed;
					}
				}
				else if(this.middle > this.intercept){
					if(this.top - this.speed <= table.top){
						this.speed = this.top - table.top;
						$('#aiPaddle').css('top', this.top - this.speed);
						this.top -= this.speed;
						this.middle -= this.speed;
						this.bottom -= this.speed;
					}
					else{
						$('#aiPaddle').css('top', this.top - this.speed);
						this.top -= this.speed;
						this.middle -= this.speed;
						this.bottom -= this.speed;
					}
				}
			}
		}
	}
	
	var ball = {
		dx: 3,
		dy: 2,
		dt: 2,
		x: $('#table').offset().left,
		y: $('#table').offset().top,
		newX: 0,
		newY: 0,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		move: function(){
			//alert(table.bottom);		
			this.newX = this.x + this.dx * this.dt;
			this.newY = this.y + this.dy * this.dt;
			this.top = this.newY;
			this.bottom = this.newY + parseInt($('#ball').css('height'));
			this.left = this.newX;
			this.right = this.newX+ parseInt($('#ball').css('width'));
			if(this.dx > 0 && this.right >= aiPaddle.left){
				if((this.bottom >= aiPaddle.top && this.bottom <= aiPaddle.bottom) || (this.top >= aiPaddle.top && this.top <= aiPaddle.bottom)){
					this.newX = aiPaddle.left;
					this.dx *= -1;
				}
				else if(this.right >= table.right + 10){
					this.newX = table.right + 10;
					this.dx *= -1;
					//alert('YOU WIN!');
					userScore++;
					document.getElementById('score').innerHTML = "<h1>"+userScore+" : "+aiScore+"</h1>";
					if(userScore == 10){
						alert('You Win!!!');
						userScore = 0;
						aiScore = 0;
						document.getElementById('score').innerHTML = "<h1>"+userScore+" : "+aiScore+"</h1>";
					}
				}
			}
			else if(this.dx < 0 && this.left <= userPaddle.right){
				if((this.bottom >= userPaddle.top && this.bottom <= userPaddle.bottom) || (this.top >= userPaddle.top && this.top <= userPaddle.bottom)){
					this.newX = userPaddle.right;
					this.dx *= -1;
				}
				else if(this.left <= table.left){
					this.newX = table.left;
					this.dx *= -1;
					//alert('YOU LOSE!');
					aiScore++;
					document.getElementById('score').innerHTML = "<h1>"+userScore+" : "+aiScore+"</h1>";
					if(aiScore == 10){
						alert('You Lose!!!');
						userScore = 0;
						aiScore = 0;
						document.getElementById('score').innerHTML = "<h1>"+userScore+" : "+aiScore+"</h1>";
					}
				}
			}
			if(this.dy > 0 && this.bottom >= table.bottom){
				this.newY = table.bottom;
				this.dy *= -1;
			}
			else if(this.dy < 0 && this.top <= table.top){
				this.newY = table.top;
				this.dy *= -1;
			}
			this.x = this.newX;
			this.y = this.newY;
			
			//y += dy * dt;
			$('#ball').css({
				'left': this.newX,
				'top': this.newY
			});
		}
	};
	
	/*$('#table').mousemove(function(){
		//alert('ballX: ' + ball.x + ' ballY: ' + ball.y);
		ball.move();
	});*/
	
	setInterval(function(){
		ball.move();
		aiPaddle.move();
	},1);
	
});
