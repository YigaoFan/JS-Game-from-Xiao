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
		window.fps = Number(input.value) + 1
	})
}

var __main = function() {
	var images = {
		ball: 'ball.png',
		block: 'block.png',
		paddle: 'paddle.png',
	}
	var game = GuaGame(10, images, function(g) {
		var s = Scene(g)
		g.runWithScene(s)
	})
	enableDebugMode(game, true)
	
}

__main()
