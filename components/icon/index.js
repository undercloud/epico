import QValidator from './../validator'

var QIcon = Paysage.createClass({
    props: {
        name: {
            type: String,
            required: true,
            validator: QValidator.isNotEmpty
        },
        size: {
            type: String,
            default: 'default',
            validator (v) {
                return ['mini','small','default','medium','big','huge'].includes(v)
            }
        },
        pack: {
            type: String,
            default: 'default',
            validator: QValidator.isNotEmpty
        }
    },
    get iconName () {
        var source = window.epico.config.QIcon.iconPath
        if ('undefined' === typeof source[this.pack]) {
            console.warn('Icon pack is not defined: ' + this.pack + ':' + this.name)
        }

        return source[this.pack] + '#' + this.name
    },
    get iconSize () {
        return 'q-icon--size-' + this.size
    },
    draw () {
        return (
            `<span class="q-icon" :class="iconSize">
                <svg class="q-icon__svg" xmlns="http://www.w3.org/2000/svg">
                    <use
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        :xlink:href="iconName">
                    </use>
                </svg>
            </span>`
        )
    }
})

export default QIcon