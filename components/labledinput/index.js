var QLabledInput = Paysage.createClass({
	draw () {
		return (
			`<span
				class="q-labledinput"
				:class="{ 'q-labledinput--with-before': !!$slots.before, 'q-labledinput--with-after': !!$slots.after }">
				<span class="q-labledinput__before" v-if="!!$slots.before">
					<slot name="before"></slot>
				</span>
				<slot name="input"></slot>
				<span class="q-labledinput__after" v-if="!!$slots.after">
					<slot name="after"></slot>
				</span>
			</span>`
		)
	}
})

export default QLabledInput