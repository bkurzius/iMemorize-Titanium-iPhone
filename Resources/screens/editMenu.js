var EditMenu = {
	// data
	_orientationModes : {},
	// ui
	editMenuModal : {},
	handleTableClick : {},
	nav : {},
	table : {},
	done : {},
	modalWin : {},
	inited : false
};

EditMenu.init = function() {
	_orientationModes = [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT];
	Ti.API.info('EditMenu.init1');
	EditMenu.draw();
	Ti.API.info('EditMenu.init2');
	EditMenu.setEventListeners();
	Ti.API.info('EditMenu.init3');
	EditMenu.buttonStyle = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
};

EditMenu.draw = function() {
	EditMenu.editMenuModal = Ti.UI.createWindow({
		height : 500,
		top : 0,
		backgroundColor : "#FFFFFF",
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		fullscreen : true
	});
	EditMenu.initTable();
	Ti.API.info('EditMenu.draw 5');
	EditMenu.done = Titanium.UI.createButton({
		title : "Done",
		width:100,
		height:40,
		top:5,
		style:EditMenu.buttonStyle,
		borderRadius:10,
		font:{fontSize:16,fontFamily:AddQuote._fontFamily,fontWeight:'bold'},
	});

	EditMenu.nav = Ti.UI.iOS.createNavigationWindow({
		window : EditMenu.editMenuModal
	});

	EditMenu.editMenuModal.add(EditMenu.table);
	EditMenu.editMenuModal.add(EditMenu.done);
	EditMenu.editMenuModal.open({
		modal : true
	});

};

EditMenu.handleEditDoneBtnClick = function() {
	EditMenu.editMenuModal.close();
	Titanium.App.fireEvent('closeEditMenuEvent', {});
};

EditMenu.handleTableClick = function(e) {
	Ti.API.info('handleTableClick breakpoint');

	if (e.rowData.title == 'Edit Quote') {
		Titanium.API.info('clicked Edit Quote');
		//Titanium.App.Properties.setString("quoteEditAction_preference", "edit");
		Titanium.App.fireEvent('showQuoteEditorEvent', {});
		Titanium.App.fireEvent('closeEditMenuEvent', {});
		EditMenu.editMenuModal.close();
	} else if (e.rowData.title == 'Delete Quote') {
		Titanium.API.info('clicked Delete Quote');
		Titanium.App.fireEvent('deleteQuoteEvent', {});
		Titanium.App.fireEvent('closeEditMenuEvent', {});
		EditMenu.editMenuModal.close();
	}

};

EditMenu.setEventListeners = function() {
	EditMenu.table.addEventListener('click', EditMenu.handleTableClick);
	EditMenu.done.addEventListener('click', EditMenu.handleEditDoneBtnClick);
};

EditMenu.showMenu = function() {
	if (!EditMenu.inited) {
		EditMenu.init();
		EditMenu.inited = true;
	} else {
		EditMenu.initTable();
		EditMenu.editMenuModal.add(EditMenu.table);
		if (!TiUtils.isAndroid()) {
			EditMenu.editMenuModal.open({
				modal : true
			});
		} else {
			EditMenu.editMenuModal.open({
				modal : false
			});
		}
	}

};

EditMenu.initTable = function() {
	EditMenu.table = Ti.UI.createTableView({
		data : [{
			title : "Edit Quote",
			hasChild : true,
			header : 'Saved Quote Options'
		}, {
			title : "Delete Quote"
		}]
	});
		EditMenu.table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
		EditMenu.table.top = 45;

	EditMenu.table.addEventListener('click', EditMenu.handleTableClick);
};

EditMenu.hideMenu = function() {
	//EditMenu.editMenuModal.close();
};
