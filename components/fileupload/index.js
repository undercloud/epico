import QAbstractInput from './../abstractinput';
import QValidator from './../validator';

var QFileUpload = Paysage.createClass({
	props: QAbstractInput.extendsProps({
		multiple: {
			type: [Boolean, String],
			validator (v) {
				return QValidator.isBooleanOr(v, 'multiple')
			}
		},
		draggable: {
			type: [Boolean, String],
			validator (v) {
				return QValidator.isBooleanOr(v, 'draggable')
			}
		}
	}),
	phrases: {
		dropFile: 'Drag and drop your file here\n OR',
		selectFile: 'Select File'
	},
	constructor () {
		this.isDraggableEvent = false;
		this.selectedFilesList = [];
	},
	handleFileSelect (files) {
		if (files.length){
			for (var i = 0; i < files.length; i++) {
				this.selectedFilesList.push(files[i])
			}

			console.log(this.selectedFilesList);
		}
	},
	stopEventBubbling (event) {
		event.preventDefault();
		event.stopPropagation();
	},
	onDropFile (event) {
		this.stopEventBubbling(event);
		if (this.draggable) {
			this.handleFileSelect(event.dataTransfer.files);
			this.isDraggableEvent = false;
		}
	},
	deleteFile (fileIndex) {
		this.selectedFilesList.splice(fileIndex, 1);
	},
	helpers: {
		fileExtension (name) {
			return name.split('.').pop();
		},
		humanFileSize (size) {
		    var i = Math.floor( Math.log(size) / Math.log(1024) );
		    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
		}
	},
	draw () {
		var fileHandle = QAbstractInput.draw(QAbstractInput.abstractProps, {
			'class': 'q-fileupload__input',
			'type': 'file', 
			':multiple': 'multiple',
			'@change': 'handleFileSelect($event.target.files)'
		});

		return (
			`<span class="q-fileupload">
				<span 
					class="q-fileupload__handle" 
					:class="{ 'q-fileupload__handle--draggable': draggable, 'q-fileupload__handle--draggable-active': isDraggableEvent}"
					@dragover="isDraggableEvent = true;stopEventBubbling($event)"
					@dragleave="isDraggableEvent = false;stopEventBubbling($event)"
					@drop="onDropFile($event)">
					<q-icon 
						name="icon-cloud-upload" 
						:size="draggable ? 'huge' : 'default'"
						class="q-fileupload--no-pointer-events"></q-icon>	
					<template v-if="draggable">
						<span class="q-fileupload__label--draggable q-fileupload--no-pointer-events">{{ phrases.dropFile }}</span>
						<label>
							<q-button>
								{{ phrases.selectFile }}
								<input ` + fileHandle + ` />
							</q-button>
						</label>
					</template>
					<template v-else>
						<label>
							<span class="q-fileupload__label">{{ phrases.selectFile }}</span>
							<input ` + fileHandle + ` />
						</label>
					</template>
				</span>
				<span v-for="(selectedFile, fileIndex) in selectedFilesList" class="q-fileupload__selected-file">
					<span class="q-fileupload__selected-file-icon">
						<q-icon name="icon-file-empty" size="medium"></q-icon>
						<span class="q-fileupload__selected-file-extension">{{ helpers.fileExtension(selectedFile.name) }}</span>
					</span>
					<span class="q-fileupload__selected-file-info">	
						<span>
							<span class="q-fileupload__selected-file-name">{{ selectedFile.name }}</span>
							<span class="q-fileupload__selected-file-size">{{ helpers.humanFileSize(selectedFile.size) }} </span>
							<span class="" @click="deleteFile(fileIndex)">	
								<q-icon name="icon-close"></q-icon>
							</span>
						</span>
						<q-progress></q-progress>
						<span></span>
					</span>
				</span>
			</span>`
		)
	}
})

export default QFileUpload;