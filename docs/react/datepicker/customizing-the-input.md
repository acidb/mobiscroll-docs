---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: reactSidebar
title: Customizing the input
---

## Overview

The datepicker, as explained below, can be used with one, two or no inputs.

## Using without inputs

The first choice of input customization is to have no inputs at all. In this case rendering the component in [inline display](/react/datepicker/display-modes) mode will leave out the use of inputs.

```jsx title="Inline picker"
const App = () => {
    const [myAppointment, setMyAppointment] = React.useState(null);
    const myPickerChange = (ev) => {
        setMyAppointment(ev.value);
    }
    return <Datepicker display="inline" value={myAppointment} onChange={myPickerChange} />;
}
```

## Using with one input

The datepicker component will render a Mobiscroll Input by default. This input will hold the formatted value after selection.

Using a custom input can be done with the `inputComponent` [prop](/react/datepicker/api#opt-inputComponent). In this case the datepicker will render the component provided and pass the formatted value to it.

To pass props to the custom component, you can use the `inputProps` [prop](/react/datepicker/api#opt-inputProps).

```jsx title="Using IonInput as a Custom Input"
import { IonInput, IonItem } from '@ionic/react';

const app = () => {
  const ionInputProps = {
    placeholder: 'Click to select',
    readOnly: true,
  };

  return <IonItem>
       <Datepicker inputComponent={IonInput} inputProps={ionInputProps} />
    </IonItem>;
}
```

## Using with two inputs

When selecting a range, you have basically two values to display: the start of the range and the end of the range. These can be shown in different inputs using the [`startInput`](/react/datepicker/api#opt-startInput) and the [`endInput`](/react/datepicker/api#opt-endInput) options.

```jsx title="Two inputs for range selection"
import { Input, Datepicker } from '@mobiscroll/react';

const app = () => {
  const [start, setStartInput] = React.useState(null);
  const [end, setEndInput] = React.useState(null);

  return <>
      <Input ref={setStartInput} label="Start date" />
      <Input ref={setEndInput} label="End date" />
      <Datepicker select="range" startInput={start} endInput={end} />
    </>;
}
```

When the [`startInput`](/react/datepicker/api#opt-startInput) and the [`endInput`](/react/datepicker/api#opt-endInput) options are provided, the datepicker will not render any other inputs. It will open when these inputs are focused/clicked instead.