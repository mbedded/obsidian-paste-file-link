import { App, SuggestModal, TFile } from "obsidian";

export class FileSelectionModal extends SuggestModal<TFile> {
  private files: TFile[];
  private fileSelectedCallback: (file: TFile) => void;

  constructor(app: App, files: TFile[], fileSelectedCallback: (file: TFile) => void) {
    super(app);
    this.files = files;
    this.fileSelectedCallback = fileSelectedCallback;
  }

  getSuggestions(query: string): TFile[] {
    return this.files.filter(x =>
      x.path.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderSuggestion(file: TFile, el: HTMLElement) {
    el.createEl("div", {text: file.name});
    el.createEl("small", {text: file.path});
  }

  onChooseSuggestion(file: TFile, evt: MouseEvent | KeyboardEvent) {
    this.fileSelectedCallback(file);
  }

}
