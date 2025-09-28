# Paste as a file link

This plugin is used to paste the content of the clipboard as a link
to another file in the current vault.
The selected text will be used as an alias while a file link is created.\
As an example, assume this is the text in your file:

```markdown
Lorem ipsum dolor sit amet.
```

After pasting `my note` to a selection, this will be updated to:

```markdown
Lorem ipsum [[my note|dolor sit amet]].     // Wiki link
Lorem ipsum [dolor sit amet](my note.md).   // Markdown link
```

The type of link is depending on your vault settings (_Settings > Files and links_).

If the clipboard contains no string (text) or no file could be found, this
plugin will do nothing and the usual paste will take place.
If you have multiple files with the same name in your vault, a dialog
will open so you can select the correct file.

## Usage

- Copy the name of a note from your vault.
- Select text in any document of your vault.
- Paste the value from your clipboard (or use the command).
- Be happy that your selection became a link to your file with an alias :)

## Installation

The plugin can be installed in Obsidian itself via _Settings > Community plugins > Browse_.

For manual installation, go to the [latest release](https://github.com/mbedded/obsidian-paste-file-link/releases/latest).
Download the files `main.js` and `manifest.json`.
Move these files to your vault: `YourVault/.obsidian/plugins/paste-as-file-link/`.

## Settings / Usage

The default setting of this plugin is the usage of `CTRL + V` (paste).
This setting can be turned on and off.
If you turn this off, you have to use the command palette.

## Contribution

If you face any issues, feel free to create an issue or a pull-request in this repository.

## Reason for this plugin

This plugin was created because I often write text and add links to my notes afterward.
But every time I paste the name of the note, the text gets replaced and I have to
create links with an alias by myself.
