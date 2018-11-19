import QValidator from './../validator';

var QProgress = Paysage.createClass({
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		type: {
			type: String,
			default: 'linear',
			validate (v) {
				return ['linear','circle'].includes(v);
			}
		},
		value: {
			type: [Number, String],
			default: 0,
			validator: QValidator.isNumeric
		},
		max: {
			type: [Number, String],
			required: true,
			validator: QValidator.isNumeric
		}
	},
	get width () {
		var width = Math.round((parseFloat(this.value) || 0) / (parseFloat(this.max) || 1) * 100, 2);
		
		if (width < 0) {
			width = 0;
		}

		if (width > 100) {
			width = 100;
		}

		return width;
	},
	get deg () {
		return 'rotate(' + (180 / 50 * this.width) + 'deg)';
	},
	draw () {
		return (
			`<span class="q-progress" :class="{ 'q-progress--circle': (type == 'circle'), 'q-progress--circle-over-50': (width > 50) }">
				<template v-if="type == 'circle'">
					<span class="q-progress__label">{{ width + '%' }}</span>
					<div class="q-progress__clipper">
						<div class="q-progress__first-50-bar"></div>
						<div class="q-progress__fill-bar" :style="{transform: deg}"></div>
					</div>
				</template>
				<template v-else>
					<span class="q-progress__fill" :style="{width: width + '%'}""></span>
				</template>
			</span>`
		)
	}
})


export default QProgress;