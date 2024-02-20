---
sidebar_label: Button
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/button/options.md';
import Events from '../\_auto-generated/button/events.md';
import Localizations from '../\_auto-generated/button/localizations.md';

# Button

The Button component is an interactive element activated by the user.
Once activated, it performs an action, such as submitting a form or opening a dialog.

## Usage

Buttons can display text, icons, or both. They can be colored and styled with various options.

#### Button styles

```jsx
import { Button } from '@mobiscroll/react';

function ButtonVariations() {
  return <>
    <Button>Standard button</Button>
    <Button variant="flat">Flat button</Button>
    <Button variant="outline">Outline button</Button>

    <Button startIcon="home">With start icon</Button>
    <Button endIcon="home">With end icon</Button>
    <Button icon="pencil" ariaLabel="Icon only" />

    <Button color="primary">Primary button</Button>
    <Button color="secondary">Secondary button</Button>
    <Button color="success">Success button</Button>
    <Button color="danger">Danger button</Button>
    <Button color="warning">Warning button</Button>
    <Button color="info">Info button</Button>
    <Button color="light">Light button</Button>
    <Button color="dark">Dark button</Button>
  </>
}
```

#### Button sizes and groups

```html
<!-- Full width button -->
<Button className="mbsc-button-block">Full width Button</Button>

<!-- Button group -->
<div className="mbsc-button-group">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
</div>

<!-- Justified group -->
<!-- Buttons are streched to fill the full width of the container -->
<div className="mbsc-button-group-justified">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
</div>

<!-- Full width group -->
<!-- Each button fills the whole width of the container -->
<div className="mbsc-button-group-block">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
</div>
```

## Handling clicks

Clicks can be handled using the [`onClick`](#event-onClick) event.

```jsx
import { Button } from '@mobiscroll/react';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <Button onClick={handleClick}>Click me!</Button>
}
```

<div className="option-list">

## Options

<Options />

## Localization

<Localizations />

## Events

<Events />

</div>
