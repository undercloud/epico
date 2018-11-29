import QAbstractInput from './../abstractinput'
import QValidator from './../validator'

var QCheckBox = Paysage.createClass({
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: QAbstractInput.extendsProps({
        checked: {
            type: [Boolean, String],
            validator (v) {
                return QValidator.isBooleanOr(v, 'checked')
            }
        },
        label: String
    }),
    draw () {
        return (
            `<label class="q-checkbox">
                <span class="q-checkbox__flex">
                    <input ` + QAbstractInput.draw(QAbstractInput.abstractProps, {
                        'class': 'q-checkbox__input',
                        'type': 'checkbox',
                        ':checked': 'checked',
                        '@change': "$emit('change', $event.target.checked, $event)"
                    }) + ` />
                    <slot :checked="checked" :disabled="disabled">
                        <span class="q-checkbox__handle"></span>
                    </slot>
                    <span v-if="label" class="q-checkbox__label">
                        {{ label }}
                    </span>
                </span>
            </label>`
        )
    }
})

export default QCheckBox