import QAbstractInput from './../abstractinput';
import QValidator from './../validator';

var QRange = Paysage.createClass({
	model: {
	    prop: 'value',
	    event: 'input',
	},
	props: QAbstractInput.extendsEditableProps({
		step: {
			type: [Number, String],
			required: true,
			validator: QValidator.isPositiveNumeric
		},
		min: {
			type: [Number, String],
			required: true,
			validator: QValidator.isNumeric
		},
		max: {
			type: [Number, String],
			required: true,
			validator: QValidator.isNumeric
		},
		hintVisible: {
			type: [String, Boolean],
			default: false,
			validator: QValidator.isBoolean
		}
	}),
	get decorFillWidth () {
		return (((this.value - this.min) / (this.max - this.min)) * 100) + '%';
	},
	decorHintAlign () {
		var w = this.decorFillWidth.replace('%','');
		var s = 20 / 100 * w - 10;
		var h = (
			this.$refs.hint
				? this.$refs.hint.offsetWidth
				: 0
		);

		return 'calc(' + w + '% - ' + (h / 2) + 'px - ' + s + 'px)';
	},
	mounted: function () {
		this.$refs.hint.style.left = this.decorHintAlign();
	},
	draw () {
		return (
			`<span class="q-range">
				<input ` + QAbstractInput.draw(QAbstractInput.abstractEditableProps, {
					'ref': 'input',
					'class': 'q-input__range',
					'type': 'range',
					':min': 'min',
					':max': 'max',
					':step': 'step',
					'@change': "$emit('change', $event.target.value, $event)",
					'@input': "$emit('input', $event.target.value, $event)"
				}) + ' />' +
				`<span class="q-range__fill-range" :style="{width: decorFillWidth}"></span>
				<span class="q-range__hint-value" :class="{'q-range__hint-value--visible': ('true' == '' + hintVisible)}" ref="hint" :style="{left: decorHintAlign()}">{{ value }}</span>
			</span>`
		)
	}
})

export default QRange;