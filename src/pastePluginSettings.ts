export interface PastePluginSettings {
  /**
   * Indicates whether the custom functionality should intercept the paste-event ("Ctrl+V" or "Cmd+V" on macOS).
   * When set to true, additional logic or behavior can be executed during the paste operation.
   * When set to false, the default paste handling will occur without any interception.
   */
  hookIntoEditorPaste: boolean;
}

export const DEFAULT_SETTINGS: PastePluginSettings = {
  hookIntoEditorPaste: true,
};
