var QButton = Paysage.createClass({
	props: {
		type: {
			type: String,
			default: 'button',
			validator (v) {
				return ['button','submit','reset'].includes(v);
			}
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