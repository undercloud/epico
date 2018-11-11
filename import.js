
import QIcon from './components/icon';
import QRadio from './components/radio';
import QCheckBox from './components/checkbox';
import QToggleSwitch from './components/toggleswitch';
import QInput from './components/input';
import QRange from './components/range';
import QButton from './components/button';

var componentsMap = {
	'q-radio': QRadio,
	'q-checkbox': QCheckBox,
	'q-toggleswitch': QToggleSwitch,
	'q-input': QInput,
	'q-range': QRange,
	'q-button': QButton,
	'q-icon': QIcon,
}

for (var name in componentsMap) {
	Paysage.register(componentsMap[name], name);
}
