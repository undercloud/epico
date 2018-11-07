import QAbstractInput from './../abstractinput';

var QRadio = Paysage.createClass({
	model: {
	    prop: 'modelValue',
	    event: 'change'
	},
	props: QAbstractInput.extendsProps({
		checked: [Boolean, String],
		label: String,
		modelValue: {
            default: undefined
		}
	}),
    get state () {
	    if (this.modelValue === undefined) {
    	    return this.checked;
    	}

    	return ('' + this.modelValue === '' + this.value);
	},
    toggle (event) {
		this.$emit('change', this.state ? '' : this.value, event);
	},
	watch: {
        checked(newValue) {
            if (newValue !== this.state) {
                this.toggle();
            }
        }
    },
    mounted () {
    	if (this.checked && !this.state) {
			this.toggle();
        }
    },
	draw () {
		return (
			`<label class="q-radio">
				<span class="q-radio__flex">
					<input ` + QAbstractInput.draw(QAbstractInput.abstractProps, {
						'class': 'q-radio__input', 
						'type': 'radio',
						':checked': 'state',
	      				'@change': 'toggle'
					}) + ' />' +
	      			`<slot :checked="state">
	      				<span class="q-radio__handle"></span>
					</slot>
					<span v-if="label" class="q-radio__label">
						{{ label }}
					</span>
				</span>
			</label>`
		);
	}
});

export default QRadio;