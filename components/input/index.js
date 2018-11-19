import QAbstractInput from './../abstractinput';
import QValidator from './../validator';

var QInput = Paysage.createClass({
	window: window,
	model: {
	    prop: 'value',
	    event: 'input',
	},
	props: QAbstractInput.extendsEditableProps({
		type: {
			type: String,
			default: 'text',
			validator (value) {
				return [
					'text','password','search',
					'date','time','datetime',
					'number','email','tel','url',
					'hidden'
				].includes(value);
			}
		},
		multiline: {
			type: [Boolean, String],
			default: false,
			validator (v) {
				return QValidator.isBooleanOr(v, 'multiline');	
			}
		},
		rows: {
			type: [Number, String],
			default: 5,
			validator: QValidator.isPositiveInt
		},
		step: {
			type: [Number, String],
			validator: QValidator.isPositiveNumeric
		},
		min: {
			type: [Number, String],
			validator: QValidator.isNumeric
		},
		max: {
			type: [Number, String],
			validator: QValidator.isNumeric
		},
		showablePassword: {
 			type: [Boolean, String],
 			default: false,
 			validator: QValidator.isBoolean
 		}
	}),
	constructor () {
		this.hasFocus = false;
		this.showPassword = false;
	},
	get readOnlyValue () {
		return this.value;
	},
	set readOnlyValue (value) {
		this.$emit('change', value);
		this.$emit('input', value);
	},
	get dynamicType() {
		if (this.showablePassword) {
			if (this.showPassword) {
				return 'text';
			} else {
				return 'password';
			}
		}

		if (['date','time','datetime'].includes(this.type)) {
			return 'text';
		}

		return this.type;
	},
	togglePassView () {
		this.showPassword = !this.showPassword;
	},
	get hasDefaultSlot () {
		return ['search','url','tel','email','date','time','datetime','password'].includes(this.type);
	},
	get defaultSlotIcon () {
		return window.epico.config.QInput.icons[this.type];
	},
	get isDateType () {
		return 'date' == this.type || 'time' == this.type || 'datetime' == this.type;
	},
	draw () {
		var pairs = QAbstractInput.draw(QAbstractInput.abstractEditableProps, {
			'ref': 'input',
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
			`<span class="q-input" :class="{'q-input--focus': hasFocus}" v-show="!('hidden' === dynamicType)">
				<template v-if="multiline">
					<textarea ` + pairs +` class="q-input__input" :rows="rows"></textarea>
					<span v-if="maxlength" class="q-input__maxlength">{{ value.length }} / {{ maxlength }}</span>
				</template>
				<template v-else>
					<span class="q-input__flex">
						<span 
							class="q-input__pre-content" 
							v-if="!!$slots.default || !!$scopedSlots.default || hasDefaultSlot">
							<slot :hasFocus="hasFocus">
								<q-icon v-if="hasDefaultSlot" :name="defaultSlotIcon"></q-icon>
							</slot>
						</span> 
						<template v-if="isDateType">
							<q-datetime-helper
								inputClass="q-input__input" 
								v-model="readOnlyValue"
								:type="type" 
								:minDatetime="min" 
								:maxDatetime="max"
								@focus="hasFocus = true;"
								@input="hasFocus = false;">
							</q-datetime-helper>
						</template>
						<template v-else>
							<input 
								class="q-input__input"
								:type="dynamicType"
								:min="min"
								:max="max"
								:step="step" ` + 
								pairs + ` />
						</template>
						<span  
							v-if="showablePassword"
							@click="togglePassView" 
							class="q-input__post-content q-input__show-password">
	 						<q-icon :name="showPassword ? window.epico.config.QInput.showablePassword.show : window.epico.config.QInput.showablePassword.hide"></q-icon>
	 					</span>
	 					<span
							v-if="('search' === dynamicType || isDateType) && value.length"
							@click="$refs.input.value = '';$emit('change', '', $event);$emit('input', '', $event)"
							class="q-input__post-content q-input__clear">
							<q-icon :name="window.epico.config.QInput.searchClose"></q-icon>
						</span>
	 				</span>
				</template>
			</span>`
		);
	}
})

export default QInput;