var QValidator = {
	isNotEmpty (v) {
		return !!v.length
	},
	isInt (v) {
		return parseInt(v) == v
	},
	isPositiveInt (v) {
		if (!QValidator.isInt(v)) {
			return false
		}

		return v >= 0
	},
	isNumeric (v) {
		return parseFloat(v) == v
	},
	isPositiveNumeric (v) {
		return (parseFloat(v) == v && v >= 1)
	},
	isBoolean (v) {
		return ['true','false'].includes('' + v)
	},
	isBooleanOr (v, eq) {
		eq = Array.isArray(eq) ? eq : [eq]

		return v === true || v === false || eq.includes(v)
	}
}

export default QValidator