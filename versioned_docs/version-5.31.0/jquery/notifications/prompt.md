---
sidebar_label: Prompt
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/prompt/options.md';
import Events from '../\_auto-generated/prompt/events.md';
import Localizations from '../\_auto-generated/prompt/localizations.md';

# Prompt

A prompt dialog is used when it's required to get some data from the user, e.g. a password confirmation.
It has two buttons, one of which submits the entered data, the other one cancels the dialog.

## Usage

The following example displays a prompt dialog:

```js
mobiscroll.prompt({
  title: "Sign in to iTunes Store",
  message: "Enter the Apple ID password for 'hello@mobiscroll.com'.",
  placeholder: "Enter password",
  inputType: "password",
  onClose: function(result) {
    console.log('Result: ', result);
  }
});
```

<div className="option-list">

## Options

<Options />

## Localization

<Localizations />

## Events

<Events />

</div>
