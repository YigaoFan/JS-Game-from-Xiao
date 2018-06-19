var SceneEnd = function(game) {
	var s = {
		game: game,
	}
	s.draw = function() {
		//draw lables
		game.context.fillText('游戏结束！', 100, 280)
	}
	s.update = function() {
	}
	return s
}
