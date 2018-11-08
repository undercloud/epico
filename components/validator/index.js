
var QValidator = {
	isNotEmpty (v) {
		return !!v.length;
	},
	isInt: function (v) {
		return parseInt(v) == v;
	},
	isPositiveInt (v) {
		if (!QValidator.isInt(v)) {
			return false;
		}

		return v >= 0;
	}
}

export default QValidator;