  // TODO: possible bug on: when a note is entered
// and some combination of key up/down/left/right
// is pressed, it stores wrong data
 define([
  'underscore',
  'jquery'
  ],
  function(_,$) {

	var TabGenerator = function(options) {

		this.init = function() {
            this.cursorIdSel = '#tabs-cursor';
			this.tabInput = options.input || this.find(this.cursorIdSel);

			if (!this.tabInput){
				throw "Could not find tab input";
			}
            this.currentRow = 1;
            this.appendRowFn = options.appendRowFn || function () {};
            this.paintedRows = options.paintedRows || 1;
            this.rowGap = options.drawMultiRow || false;
			this.notes = that.options.notes || $('.notes');
			this.bendBtn = that.options.bendBtn || $('#bendBtn');
			this.tabs = [];
			this.tabsIndex = 0;			/* current Y */
			this.tabsStringIndex = 0;	/* current string */
			this.intervall = 4;			/* current rest */
			this.bars = 0;				/* current bar / space */
			this.noteDiv = "#crotchet";	/* Current interval image */
			this.note_color = "white";
            this.tabInputClone = this.tabInput.clone();

			// Listeners
			this.tabInput.on('keyup', $.proxy(that.__keypressed, that));
			this.notes.on('click', $.proxy(that.__noteChangeClicked, that));
			this.bendBtn.on('click', $.proxy(that.__bendBtnClicked, that));
            this.on('click', this.__tabsAreaClicked.bind(this));

		};

		this.getTabInput = function() {
			var fret = this.tabInput.val();
                fret = parseInt(fret, 10);
                fret = isNaN(parsedFret) ? -1 : parsedFret;
            return fret;
		};

		this.getTabs = function() {
            var tabs = this.tabs;
            $('*[data-index]').filter(function(i, el) {return !!el.value })
            .map(function(i,el) {
                //if ( !tabs[el.])
                var $el = $(el);
                var is = $el.attr('data-index').split(',');
                var index = is[0],
                    string = is[1];
                var rest = $el.attr('data-interval');

                if ( !tabs[index] ) {
                    tabs[index] = {};
                    tabs[index].rest = rest;
                    tabs[index].stringz = {};
                }

                tabs[index].stringz[string] = el.value;
            });

			return {
				tempo: "125",
				// tabs: this.tabs
                tabs : tabs
			};
		};

		this.getNextMoveWidth = function() {
			return this.width() / (this.intervall*4);
		};

		// this.createNoteObject = function(fret,tabsIndex,tabsStringIndex) {
		// 	var parsedFret = parseInt(fret, 10);
		// 	parsedFret = isNaN(parsedFret) ? -1 : parsedFret;
        //
		// 	if ( !this.tabs[tabsIndex] ){
		// 		this.tabs[tabsIndex] = {};
		// 	}
        //
		// 	this.tabs[tabsIndex].rest = this.intervall;
		// 	if (!this.tabs[tabsIndex].stringz) {
		// 		this.tabs[tabsIndex].stringz = {};
		// 	}
        //
		// 	// add the fret at the given string
		// 	this.tabs[tabsIndex].stringz[tabsStringIndex] = parsedFret;
        //     console.log('t: ' + JSON.stringify(this.tabs))
		// 	return parsedFret;
		// };

		this.moveBarForward = function() {
			var fret = this.getTabInput();
			this.tabsIndex ++;
			this.bars += 1/this.intervall;

			// at the end
			if ( this.bars !== 4){
				var intervallWidthPx = this.getNextMoveWidth();
				this.tabInput.css({ left: "+=" + intervallWidthPx + "px"}, 1);
			}
			return fret;
		};

		this.moveBarBackwards = function() {
            if ( this.tabsIndex === 0 ) { return ''; }
            var fret = this.getTabInput();
            //fret = this.createNoteObject(fret, this.tabsIndex, this.tabsStringIndex);

			var intervallWidthPx = this.getNextMoveWidth();
			this.tabInput.css({ left: "-=" + intervallWidthPx + "px"}, 1);
			this.tabsIndex --;
			this.bars -= 1/this.intervall;
			return fret;
		};

		this.moveBarDownOrUpwards = function(dir) {

            /* Height between strings. - 2: duno why */
			var height = Math.floor(this.height() / 6) - 2;

            if (dir === 'up'){
                // dont move on edge cases
                if ( this.tabsStringIndex === 0 ) { return ''; }

                this.tabInput.css({ top: "-=" + height}, 1);
                this.tabsStringIndex --;
            } else {
                // dont move on edge cases
                if ( this.tabsStringIndex === 5 ) { return ''; }

                this.tabInput.css({ top: "+=" + height}, 1);
                this.tabsStringIndex ++;
            }

			var fret = this.getTabInput();
			// if ( !isNaN (parseInt(fret, 10)) ){
			// 	this.createNoteObject(fret, this.tabsIndex, this.tabsStringIndex);
			// }
			return fret;
		};

        this.__tabsAreaClicked = function (e) {
            this.tabInput.focus();
        };

		this.__bendBtnClicked = function(e) {
			if (!this.currDecorators){
				this.currDecorators = {};
			}
			this.currDecorators.bend = true;
		};

		this.__keypressed = function(e) {
			var key = e.keyCode;
			var fret = "";
            var tabIndex = this.tabsIndex, stringIndex = this.tabsStringIndex;
            var inputStartPos = this.tabInput.position();
            switch(key){
                case 13: // enter
                    fret = this.moveBarForward();
                    break;

                case 39: // right
                    fret = this.moveBarForward();
                    break;

                case 37: // left
                    fret = this.moveBarBackwards();
                    break;

                case 38: // up
                    fret = this.moveBarDownOrUpwards('up');
                    break;

                case 40: // down
                    fret = this.moveBarDownOrUpwards('down');
                    break;
                default:
                    return;
            }
			if ( fret === -1 || fret === '-1' ) { fret = ''; }


            // if current pos dont exist, draw number.
            var sel = '[data-index="' + tabIndex + ',' + stringIndex + '"]';
            var $existingInput = $(sel);
             var $value = $("<input type='text' class='tabs-cursor note' " +
                 "data-index='" + tabIndex + "," + stringIndex + "' style='color:"
                 + this.note_color + ";' value='" + fret + "' autocomplete='off' " +
                 "maxlength='2' data-interval='" + this.interval + "'>");
             $value.offset(inputStartPos);
             this.tabInput.before($value);
             this.tabInput.val("");

            // if new pos exists, capture it
            sel = '[data-index="' + this.tabsIndex + ',' + this.tabsStringIndex + '"]';
            $existingInput = $(sel);
            if ( $existingInput.length > 0 ) {
                this.tabInput.remove();
                this.tabInput = $existingInput;
                this.tabInput.focus();
                this.tabInput.removeClass('note');
                this.tabInput.attr('id', this.cursorIdSel);
                this.tabInput.on('keyup', this.__keypressed.bind(this));
            }

			if (this.currDecorators){
				var img = $("<img src='img/notes/arrow_white.png' class='bendImg'>");
				img.offset($(label).position());
				label.after(img);
				this.currDecorators = null;
			}

			if ( this.bars === 4 ) {
				this.clearAndIterateBars();
			}
		};

		this.__noteChangeClicked = function(e) {
			var divId = e.currentTarget.id;
			switch (true) {
				case /^semibreve$/.test(divId):
					this.intervall = 1;
					this.note_color = "red";
					break;
				case /^minim$/.test(divId):
					this.intervall = 2;
					this.note_color = "blue";
					break;
				case /^crotchet$/.test(divId):
					this.intervall = 4;
					this.note_color = "white";
					break;
				case /^quaver$/.test(divId):
					this.intervall = 8;
					this.note_color = "yellow";
					break;
				case /^semiquaver$/.test(divId):
					this.intervall = 16;
					this.note_color = "purple";
					break;
				case /^demisemiquaver$/.test(divId):
					this.intervall = 32;
					this.note_color = "green";
					break;
				case /^hemidemisemiquaver$/.test(divId):
					this.intervall = 64;
					this.note_color = "brown";
					break;
			}
			$(this.noteDiv).removeClass("selected");
			this.noteDiv = "#" + divId;
			$(this.noteDiv).addClass("selected");
            this.tabInput.focus();
		};

		this.clearAndIterateBars = function() {
            // vertical UI
            if ( this.rowGap ) {
                this.currentRow ++;
                if ( this.currentRow > this.paintedRows ) {
                    this.appendNewRow();
                }
                var oldTop = this.tabInput.css('top').replace(/px$/, '');
                oldTop = parseInt(oldTop, 10);
                var top = this.height() + oldTop + this.rowGap + 'px';
                this.tabInput.css('top', top);

            // horizontal UI
            } else {
                $('.note').remove();
            }

			this.painTabInputField();
			this.bars = 0;
		};

        this.appendNewRow = function () {
            this.appendRowFn();
        };

		this.painTabInputField = function() {
			var intervallWidthPx = this.getNextMoveWidth();
			// Set tab-input start location
			this.tabInput.css('left', ((intervallWidthPx / 2) + "px"));
		};

		var that = this;
		this.options = options;
		this.init();
		return this;
	};


	$.fn.tabGenerator = TabGenerator;

    return $;
});
