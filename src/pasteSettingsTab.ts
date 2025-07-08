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
      .setName("Hook into Ctrl+V")
      .setDesc("If this setting is 'true' this plugin will intercept the paste command and perform additional logic. The plugin must be reloaded to take effect.")
      .addToggle(x => x
        .setValue(this.plugin.settings.hookIntoEditorPaste)
        .onChange(async (value) => {
          this.plugin.settings.hookIntoEditorPaste = value;
          await this.plugin.saveSettings();
        }));

  }
}
