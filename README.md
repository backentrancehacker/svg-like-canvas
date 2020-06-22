# svg-like-canvas
Interacting with svgs have never been easier!

## Supported Methods
The current methods that work with svg-like-canvas include 
* arc
* fillArc
* lineTo
* fillRect
* strokeRect
* fillRect
* strokeText
* fillText

There are also other methods for personal convenience, including `setAttribute`, `getAttribute`, and `clear`. 

## Attributes
There are several attributes that are used in svg-like-canvas. The default values for the canvas include:
* lineWidth: 1,
* strokeStyle: #000
* fillStyle: #000
* fontSize: 35
You can change these default attributes with `ctx.setAttribute` and retrieve them with either `ctx.getAttribute` or `ctx[attributeName]`.


## Example Usage
`index.html`
``` html
<svg id="canvas"></svg>
```
`script.js`
``` javascript
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext()
// you do not need to pass 2d into getContext
```

### Setting Canvas Dimensions
```
ctx.setAtribute('width', 50)
ctx.setAtribute('height', 50)
```

### Animations
Animations are possible in svg-like-canvas. Here is a simplistic animation that features a moving circle.
``` javascript
class Circle {
	constructor(x, y, r) {
		this.x = x
		this.y = y
		this.r = r
		this.dir = 1
	}
	boundary() {
		if(this.x >= ctx.width - this.r || this.x <= this.r) this.dir *= -1
	}
	update() {
		this.x += this.dir
		this.boundary()
		this.render()
	}
	render() {
		ctx.fillArc(this.x, this.y, this.r)
	}
}

const circle = new Circle(20, 125, 20)

const draw = () => {
	let start
	const step = stamp => {
		if(typeof start == 'undefined') start = stamp
		const elapsed = stamp - start

		ctx.clear()
		ctx.fillText(20, 20, 'Hello World')
		circle.update()

		window.requestAnimationFrame(step)
	}
	window.requestAnimationFrame(step)
}
draw()
```

## Other Notes
svg-like-canvas is built on ES6, so it may not be compatible with all browsers. However, it will still work in all modern, updated browsers such as Chrome.