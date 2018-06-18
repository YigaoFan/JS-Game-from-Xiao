var loadLevel = function(game, n) {
			n = n - 1
			var level = levels[n]
			var blocks = []
			//log(level)
			for (var i = 0; i < level.length; i++) {
				var p = level[i]
				var b = Block(game, p)
				blocks.push(b)
			}
			return blocks
		}

var blocks = []
var enableDebugMode = function(game, enable) {
	if (!enable) {
		return
	}

	window.paused = false
	window.addEventListener('keydown', function(event) {
		var k = event.key
		if (k == 'p') {
			window.paused = !window.paused
		} else if ('1234567'.includes(k)) {
			//为了debug临时加的载入关卡功能
			blocks = loadLevel(game, k)
		} 
	})

	//控制速度
	document.querySelector('#id-input-speed').addEventListener('input', function() {
		var input = event.target
		//log(event, input.value)
		window.fps = Number(input.value + 1)
	})
}

var __main = function() {
	var images = {
		ball: 'ball.png',
		block: 'block.png',
		paddle: 'paddle.png',
	}
	var game = GuaGame(60, images, function(g) {

		var paddle = Paddle(game)
		var ball = Ball(game)

		var score = 0
		blocks = loadLevel(game, 1)

		//var paused = false
		game.registerAction('ArrowLeft', function() {
			paddle.moveLeft()
		}) 
		game.registerAction('ArrowRight', function() {
			paddle.moveRight()
		})
		game.registerAction(' ', function() {
			ball.fire()
		})

		game.update = function() {
			if (window.paused) {
				return 
			}

			ball.move()
			//判断相撞
			if (paddle.collide(ball)) {
				//这个应该调用函数
				ball.speedY *= -1
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
				log(x, y, 'drag')
				ball.x = x
				ball.y = y
			}
		})
		game.canvas.addEventListener('mouseup', function(event) {
			var x = event.offsetX
			var y = event.offsetY
			log(x, y, 'up')
			enableDrag = false
		})

		game.draw = function() {
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
	})

	enableDebugMode(game, true)
	
	
}

__main()