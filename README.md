# Paste as file link

This plugin is used to paste the content of the clipboard as a link
to another file in the current vault.
The selected text will be used as an alias while a file link is created.\
As an example, assume this is the text in your file:

```markdown
Lorem ipsum dolor sit amet.
```

After pasting `my note` to a selection, this will be updated to:

```markdown
Lorem ipsum [[my note|dolor sit amet]].        // Wiki link
Lorem ipsum [dolor sit amet](my note.md)       // Markdown link
```

The type of link is depending on your vault settings (settings > files and links).

If the clipboard contains no string or no file could be found, this
plugin will do nothing and the usual paste will take place.
If you have multiple files with the same name in your vault, a dialog
will open so you can select the correct file.

## Usage

- Copy the name of a note from your vault
- Select text in any document of your vault
- Paste the value from your clipboard (or use the command)
- Be happy that your selection became a link to your file with an alias :)

## Installation

Manual installation: Copy the files `main.js`, `manifest.json` to your
vault `VaultFolder/.obsidian/plugins/paste-as-file-link/`.

## Contribution

If you face any issues, feel free to create an issue or a pull-request in this repository.

## Reason for this plugin

This plugin was created because I often write text and add links to my notes afterward.
But every time I paste the name of the note, the text gets replaced and I have to
create links with an alias by myself.
