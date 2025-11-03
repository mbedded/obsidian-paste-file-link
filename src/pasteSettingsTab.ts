import { App, PluginSettingTab, Setting } from "obsidian";
import PastePlugin from "./main";

export class PasteSettingTab extends PluginSettingTab {
  plugin: PastePlugin;

  constructor(app: App, plugin: PastePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName(this.plugin.localizer.texts.settings["hook-into-editor-paste-title"])
      .setDesc(this.plugin.localizer.texts.settings["hook-into-editor-paste-description"])
      .addToggle(x => x
        .setValue(this.plugin.settings.hookIntoEditorPaste)
        .onChange(async (value) => {
          this.plugin.settings.hookIntoEditorPaste = value;
          await this.plugin.saveSettings();
        }));

  }
}
