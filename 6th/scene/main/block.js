var Block = function(game, position) {
	//position是[0, 0]格式
	var p = position
	var img = game.imageByName('block')
	var o = {
		x: p[0],
		y: p[1],
		alive: true,
		lifes: p[2] || 1
	}
	o.image = img.image
	o.w = img.w
	o.h = img.h

	o.kill = function() {
		o.lifes--
		if (o.lifes < 1) {
		o.alive = false
		}
	}

	var aInb = function(x, x1, x2) {
		return x >= x1 && x <= x2
	}
	o.collide = function(ball) {
		//if (ball.y + ball.h> o.y) {
		//	if (ball.x > o.x && ball.x < o.w+ o.x) {
		//		log('相撞')
		//		return true
		//	}
		//}
		//return false
		var a = o
		var b = ball
		if (o.alive) {
			if (aInb(a.x, b.x, b.x+b.w) && aInb(a.y, b.y, b.y+b.h)) {
				return true
			} else if (aInb(b.x, a.x, a.x+a.w) && aInb(b.y, a.y, a.y+a.h)) {
				return true
			} else {
				return false
			}
		}

		return false
		//if (aInb(a.x, b.x, b.x+b.w) || aInb(b.x, a.x, a.x+a.w)) {
		//	if (aInb(a.y, b.y, b.y+b.h) || aInb(b.y, a.y, a.y+a.h)) {
		//		return true
		//	}
		//}
	}
	return o
}
