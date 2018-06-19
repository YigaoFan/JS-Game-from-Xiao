var Scene = function(game) {
	var s = {
		game: game,
	}
	//初始化
	 paddle = Paddle(game)
	 ball = Ball(game)

	var score = 0
	var blocks = loadLevel(game, 1)
	
	game.registerAction('ArrowLeft', function() {
		paddle.moveLeft()
	}) 
	game.registerAction('ArrowRight', function() {
		paddle.moveRight()
	})
	game.registerAction(' ', function() {
		ball.fire()
	})

	s.draw = function() {
		//draw背景
		game.context.fillStyle = '#554'
		game.context.fillRect(0, 0, 400, 300)
		//draw
		game.drawImage(paddle)
		game.drawImage(ball)
		//draw block
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.alive) {
				game.drawImage(block)
			}
		}
		//draw lables
		game.context.fillText('分数： ' + score, 10, 280)

	}
	s.update = function() {
		if (window.paused) {
			return 
		}
		ball.move()
		//判断游戏结束
		if (ball.y > paddle.y + paddle.h) {
			var end = SceneEnd(game)
			game.replaceScene(end)
		}
		//判断相撞
		if (paddle.collide(ball)) {
			//这个应该调用函数
			ball.rebound()
		}
		//判断ball和blocks相撞
		for (var i = 0; i < blocks.length; i++) {
			var b = blocks[i]
			if (b.collide(ball)) {
				log('block 相撞')
				b.kill()
				ball.rebound()
				//更新分数
				score += 100
			}
		}
	}
	//mouse event
	var enableDrag = false
	game.canvas.addEventListener('mousedown', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		log(x, y, event)
		//检查是否点中了ball
		if (ball.hasPoint(x, y)) {
			//设置拖拽状态
			enableDrag = true
		}
	})
	game.canvas.addEventListener('mousemove', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		if (enableDrag) {
			ball.y = y
			ball.x = x
		}
	})
	game.canvas.addEventListener('mouseup', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		log(x, y, 'up')
		enableDrag = false
	})

	return s
}
