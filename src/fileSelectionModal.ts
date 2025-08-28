import { App, FuzzySuggestModal, TFile } from "obsidian";

export class FileSelectionModal extends FuzzySuggestModal<TFile> {
  private files: TFile[];
  private fileSelectedCallback: (file: TFile) => void;

  constructor(app: App, files: TFile[], fileSelectedCallback: (file: TFile) => void) {
    super(app);
    this.files = files;
    this.fileSelectedCallback = fileSelectedCallback;
  }

  getItemText(file: TFile): string {
    return file.path;
  }

  getItems(): TFile[] {
    return this.files;
  }

  onChooseItem(file: TFile, evt: MouseEvent | KeyboardEvent): void {
    this.fileSelectedCallback(file);
  }

}
