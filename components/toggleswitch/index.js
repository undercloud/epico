import QAbstractInput from './../abstractinput';
import QValidator from './../validator';

var QToggleSwitch = Paysage.createClass({
	model: {
	    prop: 'checked',
	    event: 'change'
	},
	props: QAbstractInput.extendsProps({
		checked: [Boolean, String],
		label: String,
		validator (v) {
			return QValidator.isBooleanOr(v, 'checked');
		}
	}),
	draw () {
		return (
			`<label class="q-toggleswitch">
				<span class="q-toggleswitch__flex">
					<input ` + QAbstractInput.draw(QAbstractInput.abstractProps, {
						'class': 'q-toggleswitch__input', 
						'type': 'checkbox',
						':checked': 'checked',
	      				'@change': "$emit('change', $event.target.checked, $event)"
	      			}) + ' />' + 
					`<span class="q-toggleswitch__handle"></span>
				    <span v-if="label" class="q-toggleswitch__label">{{ label }}</span>
				</span>
			</label>`
		)
	}
});

export default QToggleSwitch;