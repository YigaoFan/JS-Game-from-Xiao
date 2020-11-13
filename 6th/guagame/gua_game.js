class GuaGame {
	constructor(fps, images, runCallback) {
		window.fps = fps
		this.images = images
		this.runCallback = runCallback

		this.scene = null
		this.actions = {}
		this.keydowns = {}
		this.canvas = document.querySelector('#id-canvas')
		this.context = this.canvas.getContext('2d')
		//events
		var self = this
		window.addEventListener('keydown', function (event) {
			self.keydowns[event.key] = true
		})
		window.addEventListener('keyup', function (event) {
			self.keydowns[event.key] = false
		})
		this.init()
	}

	static instance(...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	drawImage(img) {
		this.context.drawImage(img.image, img.x, img.y)
	}

	//update
	update = () => {
		this.scene.update()
	}
	//draw
	draw = () => {
		this.scene.draw()
	}
	//
	registerAction = (key, callback) => {
		this.actions[key] = callback
	}

	runloop = () => {
		//log(window.fps)
		var g = this
		//events
		var actions = Object.keys(g.actions)
		for (var i = 0; i < actions.length; i++) {
			var key = actions[i]
			if (g.keydowns[key]) {
				//if keydown, invoke the register function
				g.actions[key]()
			}
		}
		//update
		g.update()
		//clear
		g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
		//draw
		g.draw()
		//next run loop
		setTimeout(function () {
			g.runloop()
		}, 1000 / window.fps)
	}

	init = () => {
		var g = this
		var loads = []
		//预先载入所有图片
		var names = Object.keys(this.images)
		for (var i = 0; i < names.length; i++) {
			let name = names[i]
			var path = this.images[name]
			let img = new Image()
			img.src = path
			img.onload = function () {
				//存入g.images中
				g.images[name] = img
				//所有图片都载入成功后，调用run
				loads.push(1)
				if (loads.length == names.length) {
					g.run()
				}
			}
		}
	}

	imageByName = (name) => {
		var g = this
		var img = g.images[name]
		var image = {
			w: img.width,
			h: img.height,
			image: img,
		}
		return image
	}

	runWithScene = (scene) => {
		var g = this
		g.scene = scene
		//开始运行程序
		setTimeout(function () {
			g.runloop()
		}, 1000 / window.fps)
	}
	
	replaceScene = scene => {
		this.scene = scene
	}

	run = () => {
		this.runCallback(this)
	}
}
