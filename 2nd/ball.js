var Ball = function(game) {
	var o = game.imageByName('ball')
	o.x = 200
	o.y = 250
	o.speedX = 4
	o.speedY = 4
	o.fired = false

	o.fire = function() {
		o.fired = true
	}
	o.move = function() {
		if (o.fired) {
			//log('move')
			if (o.x < 0 || o.x > 400) {
				o.speedX *= -1
			}
			if (o.y < 0 || o.y > 300) {
				o.speedY *= -1
			}
			//move
			o.x += o.speedX
			o.y += o.speedY
		}
	}

	o.rebound = function() {
		o.speedY *= -1
	}
	return o
}
