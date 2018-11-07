import QAbstractInput from './../abstractinput';

var QCheckBox = Paysage.createClass({
	model: {
	    prop: 'checked',
	    event: 'change'
	},
	props: QAbstractInput.extendsProps({
		checked: [Boolean, String],
		label: String
	}),
	draw () {
		return (
			`<label class="q-checkbox">
				<span class="q-checkbox__flex">
					<input ` + QAbstractInput.draw(QAbstractInput.abstractProps, {
						'class': 'q-checkbox__input', 
						'type': 'checkbox',
						':checked': 'checked',
	      				'@change': "$emit('change', $event.target.checked, $event)"
					}) + ' />' + 
					`<slot :checked="checked">
						<span class="q-checkbox__handle"></span>
					</slot>
					<span v-if="label" class="q-checkbox__label">
						{{ label }}
					</span>
				</span>
			</label>`
		);
	}
});

export default QCheckBox;