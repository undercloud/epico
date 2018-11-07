import QAbstractInput from './../abstractinput';

var QInput = Paysage.createClass({
	model: {
	    prop: 'value',
	    event: 'change',
	},
	props: QAbstractInput.extendsEditableProps({
		type: {
			type: String,
			default: 'text'
		},
		multiline: {
			type: [Boolean, String],
			default: false
		},
		rows: {
			type: Number,
			default: 5
		},
		showablePassword: {
 			type: [Boolean, String],
 			default: false
 		}
	}),
	get dynamicType() {
		if (this.showablePassword) {
			if (this.showPassword) {
				return 'text';
			} else {
				return 'password';
			}
		}

		return this.type;
	},
	hasFocus: false,
	showPassword: false,
	togglePassView () {
		this.showPassword = !this.showPassword;
	},
	draw () {
		var pairs = QAbstractInput.draw(QAbstractInput.abstractEditableProps, {
			'class': 'q-input__input',
			':type': 'dynamicType',
			'@change': "$emit('change', $event.target.value, $event)",
			'@input': "$emit('input', $event.target.value, $event)",
			'@blur': "hasFocus = false; $emit('blur', $event)",
			'@focus': "hasFocus = true; $emit('focus', $event)",
			'@keydown': "$emit('keydown', $event)",
			'@keypress': "$emit('keypress', $event)",
			'@keyup': "$emit('keyup', $event)",
			'@select': "$emit('select', $event)",
			'@copy': "$emit('copy', $event)",
			'@cut': "$emit('cut', $event)",
			'@paste': "$emit('paste', $event)",
			'@invalid': "$emit('invalid', $event)"
		});

		return (
			`<span class="q-input" :class="{'q-input--focus': hasFocus}">
				<template v-if="multiline">
					<textarea ` + pairs +` :rows="rows"></textarea>
				</template>
				<template v-else>
					<span class="q-input__flex">
						<span 
							class="q-input__pre-content" 
							v-if="!!$slots.default || !!$scopedSlots.default">
							<slot :hasFocus="hasFocus"></slot>
						</span>
						<input ` + pairs + ` />
						<span  
							v-if="showablePassword"
							@click="togglePassView" 
							class="q-input__post-content">
	 						<q-icon 
	 							pack="default-system" 
	 							:name="showPassword ? 'eye' : 'eye-blind'"></q-icon>
	 					</span>
	 				</span>
				</template>
			</span>`
		);
	}
})

export default QInput;