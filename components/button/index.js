var QButton = Paysage.createClass({
	props: {
		type: {
			type: String,
			default: 'button'
		}
	},
	draw () {
		return (
			`<button class='q-button' :type="type">
				<slot></slot>
			</button>`
		)
	}
});

export default QButton;