var QIcon = Paysage.createClass({
	props: {
		name: {
			type: String,
			required: true
		},
		size: {
			type: String,
			default: 'default'
		},
		pack: {
			type: String,
			default: 'default'
		}
	},
	get iconName () {
		var source = window.epico.config.QIcon.iconPath;
		if ('undefined' === typeof source[this.pack]) {
			console.warn('Icon pack is not defined: ' + this.pack + ':' + this.name);
		}

		return source[this.pack] + '#' + this.name;
	},
	get iconSize () {
		return 'q-icon--size-' + this.size;
	},
	draw () {
		return (
			`<span class="q-icon" :class="iconSize">
				<svg xmlns="http://www.w3.org/2000/svg">
					<use
						xmlns:xlink="http://www.w3.org/1999/xlink"
						:xlink:href="iconName">
					</use>
				</svg>
			</span>`
		);
	}
});

export default QIcon;