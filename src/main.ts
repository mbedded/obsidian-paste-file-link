import { App, Editor, Plugin, PluginManifest, TFile } from "obsidian";
import { DEFAULT_SETTINGS, PastePluginSettings } from "./pastePluginSettings";
import { PasteSettingTab } from "./pasteSettingsTab";
import { FileSelectionModal } from "./fileSelectionModal";
import { Localizer } from "./localizer";

export default class PastePlugin extends Plugin {
  private _settings: PastePluginSettings;
  private readonly _localizer: Localizer;

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);

    // Get UI language and initialize localizer with supported language or fallback.
    const lang = window.localStorage.getItem('language');
    if (Localizer.isLocaleSupported(lang)) {
      this._localizer = new Localizer(lang);
    } else {
      this._localizer = new Localizer();
    }
  }

  get localizer(): Localizer {
    return this._localizer;
  }

  get settings(): PastePluginSettings {
    return this._settings;
  }

  public async onload() {
    await this.loadSettings();

    // Event-hooks
    if (this.settings.hookIntoEditorPaste) {
      this.registerEvent(this.app.workspace.on("editor-paste", this.onPaste.bind(this)));
    }
    // Commands
    this.addCommand({
      id: "paste-as-file-link",
      name: this._localizer.texts.commands["paste-as-file-link-name"],
      editorCallback: this.onPasteViaCommand.bind(this)
    });

    // Settings
    this.addSettingTab(new PasteSettingTab(this.app, this));
  }

  public onunload() {
    // No cleanup necessary
  }

  public async loadSettings() {
    this._settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  public async saveSettings() {
    await this.saveData(this.settings);
  }

  /**
   * Handles the paste event within the provided editor. If the pasted content matches
   * the name of a file in the app's vault and there is a text selection in the editor,
   * it prevents the default paste behavior and processes the paste as a file link insertion.
   *
   * @param {ClipboardEvent} evt - The clipboard event triggered on paste.
   * @param {Editor} editor - The editor instance where the paste event occurred.
   * @return {void} Nothing is returned by this method.
   */
  private onPaste(evt: ClipboardEvent, editor: Editor): void {
    if (evt.defaultPrevented) {
      return;
    }

    const clipboard = evt.clipboardData?.getData("text/plain") ?? "";
    const files = this.getFilesByBasename(clipboard);
    if (files.length == 0) {
      return;
    }

    if (!editor.getSelection()) {
      return;
    }

    evt.preventDefault();
    this.handlePasteFileLink(editor, files);
  }

  /**
   * Handles the paste command by retrieving text from the clipboard, checking for matching file base names,
   * and pasting file links into the editor if applicable.
   *
   * @param {Editor} editor The editor instance where the paste operation is performed.
   * @return {Promise<void>} Nothing is returned by this method
   */
  private async onPasteViaCommand(editor: Editor): Promise<void> {
    const clipboard = await navigator.clipboard.readText();
    const files = this.getFilesByBasename(clipboard);
    if (files.length == 0) {
      return;
    }

    if (!editor.getSelection()) {
      return;
    }

    this.handlePasteFileLink(editor, files);
  }

  /**
   * Retrieves all files in the vault that have the same basename as the provided filename.
   *
   * @param filename The filename to search for.
   * @return {TFile[]} An array of TFile objects representing files with the same basename.
   */
  private getFilesByBasename(filename: string): TFile[] {
    if (!filename) {
      return [];
    }

    return this.app.vault.getFiles().filter(x => x.basename == filename);
  }

  /**
   * Handles the pasting of a file link into the given editor. If only one file is provided,
   * it automatically replaces the current selection with the file link. If multiple files
   * are provided, it opens a modal for the user to select the desired file.
   *
   * @param editor The editor instance where the file link will be inserted.
   * @param files An array of TFile objects representing files to be pasted as links.
   * @return {void} Nothing is returned by this method.
   */
  private handlePasteFileLink(editor: Editor, files: TFile[]): void {
    if (files.length == 1) {
      // Only one file is found. Replace selection with the file link.
      this.replaceSelectionWithFileLink(editor, files[0]);
      return;
    }

    // Vault contains multiple files with the same name.
    // Let the user choose the file.
    const fileModal = new FileSelectionModal(this.app, files, x => this.replaceSelectionWithFileLink(editor, x));
    fileModal.open();
  }

  /**
   * Replaces the currently selected text in the editor with a Markdown link to the provided file.
   *
   * @param editor The editor instance where the selected text will be replaced.
   * @param file The file to which the Markdown link will point.
   * @return {void} Nothing is returned by this method.
   */
  private replaceSelectionWithFileLink(editor: Editor, file: TFile): void {
    const selection = editor.getSelection();
    const currentFile = this.app.workspace.getActiveFile();

    if (!currentFile) {
      // Should not happen. Case covered just in case
      return;
    }

    const markdownLink = this.app.fileManager.generateMarkdownLink(file, currentFile.path, undefined, selection);
    editor.replaceSelection(markdownLink);
  }

}
