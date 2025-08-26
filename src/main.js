function convertLinksToMarkDown() {
	walkActiveCells((cell) => {
		const richTexts = cell.getRichTextValues();
		for (const i in richTexts) {
			for (const j in richTexts[i]) {
				const url = richTexts[i][j].getLinkUrl();
				if (!!url) {
					const r = richTexts[i][j];
					const text = r.getText();
					const md = `[${text}](${url})`;
					console.log(`replace "${text}" to "${md}"`);
					richTexts[i][j] = r.copy().setText(md).build();
				}
			}
		}
		cell.setRichTextValues(richTexts);
	});
}

function walkActiveCells(callback) {
	var app = SpreadsheetApp;
	var spread = app.getActive();
	var sheet = app.getActiveSheet();
	for (const range of sheet.getActiveRangeList().getRanges()) {
		for (let r = 1; r <= range.getNumRows(); r++) {
			for (let c = 1; c <= range.getNumColumns(); c++) {
				callback(range.getCell(r, c));
			}
		}
	}
}
