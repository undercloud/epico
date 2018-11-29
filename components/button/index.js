import QValidator from './../validator'

var QButtonGroup = Paysage.createClass({
    draw () {
        return (
            `<span class="q-buttongroup">
                <slot></slot>
            </span>`
        )
    }
})

var QButton = Paysage.createClass({
    props: {
        type: {
            type: String,
            default: 'button',
            validator (v) {
                return ['button','submit','reset'].includes(v)
            }
        },
        disabled: {
            type: [Boolean, String],
            default: false,
            validator (v) {
                return QValidator.isBooleanOr(v, 'disabled')
            }
        }
    },
    draw () {
        return (
            `<button class='q-button' :type="type" :disabled="disabled">
                <slot></slot>
            </button>`
        )
    }
})

export { QButton, QButtonGroup }