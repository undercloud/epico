import QAbstractInput from './../abstractinput'
import QValidator from './../validator'
import QFilters from './../filters'

var QRange = Paysage.createClass({
	model: {
	    prop: 'value',
	    event: 'input',
	},
	filters: {
		numberFormatter: QFilters.numberFormatter
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
		var expression = (((this.value - this.min) / (this.max - this.min)) * 100)
        if (isNaN(expression) || !isFinite(expression)) {
            expression = 0
        }

        return  expression
	},
	decorHintAlign () {
		var w = this.decorFillWidth
		var s = 20 / 100 * w - 10
		var h = (
			this.$refs.hint
				? this.$refs.hint.offsetWidth
				: 0
		)

		return 'calc(' + w + '% - ' + (h / 2) + 'px - ' + s + 'px)'
	},
	mounted: function () {
		this.$refs.hint.style.left = this.decorHintAlign()
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
				}) + ` />
				<span class="q-range__fill-range" :style="{width: decorFillWidth + '%'}"></span>
				<span
                    class="q-range__hint-value"
                    :class="{'q-range__hint-value--visible': ('true' == '' + hintVisible)}"
                    ref="hint"
                    :style="{left: decorHintAlign()}">{{ value | numberFormatter }}</span>
			</span>`
		)
	}
})

export default QRange