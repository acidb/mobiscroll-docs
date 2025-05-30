---
sidebar_position: 3
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
Explore the following API options that help you easily configure the Prompt component.

<Options />

## Localization
The Prompt component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Events
The Prompt component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
