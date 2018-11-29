var QFilters = {
	numberFormatter (value) {
		value = parseFloat(value, 10) || 0

		return new Intl.NumberFormat().format(value)
	}
}

export default QFilters