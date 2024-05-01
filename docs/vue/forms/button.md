---
sidebar_label: Button
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/button/options.md';
import Events from '../\_auto-generated/button/events.md';
import Localizations from '../\_auto-generated/button/localizations.md';
import Types from '../\_auto-generated/button/types.md';

# Button

The Button component is an interactive element activated by the user.
Once activated, it performs an action, such as submitting a form or opening a dialog.

## Usage

Buttons can display text, icons, or both. They can be colored and styled with various options.

```html
<script setup>
  import { MbscButton } from '@mobiscroll/vue';
</script>

<template>
  <MbscButton>Standard button</MbscButton>
  <MbscButton variant="flat">Flat button</MbscButton>
  <MbscButton variant="outline">Outline button</MbscButton>

  <MbscButton startIcon="home">With start icon</MbscButton>
  <MbscButton endIcon="home">With end icon</MbscButton>
  <MbscButton icon="pencil" ariaLabel="Icon only" />

  <MbscButton color="primary">Primary button</MbscButton>
  <MbscButton color="secondary">Secondary button</MbscButton>
  <MbscButton color="success">Success button</MbscButton>
  <MbscButton color="danger">Danger button</MbscButton>
  <MbscButton color="warning">Warning button</MbscButton>
  <MbscButton color="info">Info button</MbscButton>
  <MbscButton color="light">Light button</MbscButton>
  <MbscButton color="dark">Dark button</MbscButton>
</template>
```

## Handling clicks

Clicks can be handled using the standard `@click` event.

```html
<script setup>
  import { MbscButton } from '@mobiscroll/vue';

  const handleClick = () => {
    alert('Button clicked!');
  };
</script>

<template>
  <MbscButton @click="handleClick">Click me!</MbscButton>
</template>
```

<div className="option-list">

## Options

<Options />

## Localization

<Localizations />

## Events

<Events />

## Types

<Types />

</div>
