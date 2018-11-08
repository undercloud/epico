import QValidator from './../validator';

var QAbstractInput = {
	abstractProps: {
		id: String,
		name: String,
		disabled: [Boolean, String],
		required: [Boolean, String],
		value: String
	},
	get abstractEditableProps () {
		return Object.assign({}, this.abstractProps, {
			autocomplete: [Boolean, String],
			autofocus: [Boolean, String],
			pattern: String,
			readonly: [Boolean, String],
			minlength: {
				type: [Number, String],
				validator: QValidator.isPositiveInt
			},
			maxlength: {
				type: [Number, String] ,
				validator: QValidator.isPositiveInt
			},
			placeholder: String,
		});
	},
	extendsProps (props) {
		return Object.assign({}, this.abstractProps, props);
	},
	extendsEditableProps (props) {
		return Object.assign(
			{},
			this.abstractEditableProps,
			props
		);
	},
	draw (defaultAttributes, attributes) {
		var mappedAttributes = {};
		Object.keys(defaultAttributes).forEach(function(key){
			mappedAttributes[':' + key] = key;
		})

		var isEmpty = function (what) {
			return what === null || what === undefined || what == '';
		};

		var attributes = Object.assign({}, mappedAttributes, attributes);

		var pairs = [];
		for (var key in attributes) {
			if (attributes.hasOwnProperty(key) && !isEmpty(attributes[key])) {
				pairs.push(key + '="' + attributes[key] + '"');
			}
		}

		return pairs.join(' ');
	}
}

export default QAbstractInput;