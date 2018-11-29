import QValidator from './../validator'

var QAbstractInput = {
    abstractProps: {
        id: String,
        name: String,
        disabled: {
            type: [Boolean, String],
            validator (v) {
                return QValidator.isBooleanOr(v, 'disabled')
            }
        },
        required: {
            type: [Boolean, String],
            validator (v) {
                return QValidator.isBooleanOr(v, 'required')
            }
        },
        value: [String, Number]
    },
    get abstractEditableProps () {
        return Object.assign({}, this.abstractProps, {
            autocomplete: {
                type: [Boolean, String],
                validator (v) {
                    return QValidator.isBooleanOr(v, ['on','off'])
                }
            },
            autofocus: {
                type: [Boolean, String],
                validator (v) {
                    return QValidator.isBooleanOr(v, 'autofocus')
                }
            },
            pattern: String,
            readonly: {
                type: [Boolean, String],
                validator (v) {
                    return QValidator.isBooleanOr(v, 'readonly')
                }
            },
            minlength: {
                type: [Number, String],
                validator: QValidator.isPositiveInt
            },
            maxlength: {
                type: [Number, String],
                validator: QValidator.isPositiveInt
            },
            placeholder: String,
            spellcheck: {
                type: [Boolean, String],
                validator: QValidator.isBoolean
            },
            tabindex: {
                type: [Number, String],
                validator: QValidator.isPositiveInt
            }
        })
    },
    extendsProps (props) {
        return Object.assign({}, this.abstractProps, props)
    },
    extendsEditableProps (props) {
        return Object.assign(
            {},
            this.abstractEditableProps,
            props
        )
    },
    draw (defaultAttributes, attributes) {
        var mappedAttributes = {}
        Object.keys(defaultAttributes).forEach(function(key){
            mappedAttributes[':' + key] = key
        })

        var isEmpty = function (what) {
            return what === null || what === undefined || what == ''
        }

        var attributes = Object.assign({}, mappedAttributes, attributes)

        var pairs = []
        for (var key in attributes) {
            if (attributes.hasOwnProperty(key) && !isEmpty(attributes[key])) {
                pairs.push(key + '="' + attributes[key] + '"')
            }
        }

        return pairs.join(' ')
    }
}

export default QAbstractInput