;(() => {
	const createElement = (tag, attrs, inner) => {
		let formatted = ''
		for(const [key, value] of Object.entries(attrs)) 
			formatted += `${key}="${value}"`
		return `<${tag} ${formatted}>${inner || ''}</${tag}>`
	}
	SVGElement.prototype.getContext = v => {
		const restricted = ['canvas']
		const allowed = ['width', 'height']
		this._default = {
			lineWidth: 1,
			strokeStyle: '#000',
			fillStyle: '#000',
			fontSize: 35,
			canvas: this
		}
		this.functions = {
			clear: () => this.canvas.innerHTML = "",
			arc: (cx, cy, r) => {
				this.canvas.innerHTML += createElement('circle', {
					cx, cy, r,
					'stroke': this._default.strokeStyle,
					'stroke-width': this._default.lineWidth,
					'fill': 'transparent'
				})
			},
			fillArc: (cx, cy, r) => {
				this.canvas.innerHTML += createElement('circle', {
					cx, cy, r,
					'fill': this._default.fillStyle,
					'stroke': 'transparent'
				})
			},
			lineTo: (x1, y1, x2, y2) => {
				this.canvas.innerHTML += createElement('line', {
					x1, y1, x2, y2,
					'stroke': this._default.strokeStyle,
					'stroke-width': this._default.lineWidth
				})
			},
			fillRect: (x, y, width, height) => {
				this.canvas.innerHTML += createElement('rect', {
					x, y, width, height,
					'fill': this._default.fillStyle,
					'stroke': 'transparent'
				})
			},
			strokeRect: (x, y, width, height) => {
				this.canvas.innerHTML += createElement('rect', {
					x, y, width, height,
					'stroke-width': this._default.lineWidth,
					'stroke': this._default.strokeStyle,
					'fill': 'transparent'
				})
			},
			strokeText: (x, y, text) => {
				y = y + this._default.fontSize
				this.canvas.innerHTML += createElement('text', {
					x, y,
					'font-size': this._default.fontSize,
					'fill': 'transparent',
					'stroke': this._default.strokeStyle,
					'stroke-width': this._default.lineWidth
				}, text)
			},
			fillText: (x, y, text) => {
				y = y + this._default.fontSize
				this.canvas.innerHTML += createElement('text', {
					x, y,
					'font-size': this._default.fontSize,
					'fill': this._default.fillStyle,
					'stroke': 'transparent'					
				}, text)	
			},
			setAttribute: (property, value) => {
				if(!property || !value) 
					throw new Error('setAttribute requires a property and value')

				let found = restricted.filter(val => val == property).length > 0
				if(found)
					throw new Error(`${found} is an immutable Object.`)
				
				this._default[property] = value

				if(allowed.includes(property))
					this.canvas.setAttribute(property, value)
			},
			getAttribute: (property) => this._default[property] 
		}
		return Object.assign(this._default, this.functions)
	}
})()