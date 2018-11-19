
import QIcon from './components/icon';
import QRadio from './components/radio';
import QCheckBox from './components/checkbox';
import QToggleSwitch from './components/toggleswitch';
import QInput from './components/input';
import QRange from './components/range';
import QButton from './components/button';
import QProgress from './components/progress';
import QFileUpload from './components/fileupload';

import { Datetime } from 'vue-datetime';

var componentsMap = {
	'q-radio': QRadio,
	'q-checkbox': QCheckBox,
	'q-toggleswitch': QToggleSwitch,
	'q-input': QInput,
	'q-range': QRange,
	'q-button': QButton,
	'q-icon': QIcon,
	'q-progress': QProgress,
	'q-fileupload': QFileUpload,
	'q-datetime-helper': Datetime
}

for (var name in componentsMap) {
	Paysage.register(componentsMap[name], name);
}
