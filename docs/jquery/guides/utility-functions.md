---
sidebar_position: 4
sidebar_label: Utility functions
displayed_sidebar: jquerySidebar
title: Utility functions
toc_max_heading_level: 2
---

## Utils

A collection of general purpose utility functions which can be used independently from Mobiscroll component instances.

## Platform

`mobiscroll.platform`

If you are using ES6 modules in your project, the `platform` object can be imported from the mobiscroll package directly:

```jsx
import { platform } from '@mobiscroll/jquery';
```

### Description

Information about the current platform.

<div className="option-list">

### name {#name}

String

Possible values:
* `ios`
* `android`
* `windows`

### majorVersion {#majorVersion}

Number

The major version of the platform

### minorVersion {#minorVersion}

Number

The minor version of the platform

</div>

## Format date

`mobiscroll.formatDate(format, date[, settings = {}])`

If you are using ES6 modules in your project, the `formatDate` function can be imported from the mobiscroll package directly:

```jsx
import { formatDate } from '@mobiscroll/jquery';
```

### Description

Format a date into a string value with a specified format.

```jsx title="Example"
formatDate('yy-mm-dd', new Date(2015, 1, 19)); // Produces '2015-02-19'
```

### Parameters

<div className="option-list">

### format {#format}

String

The format can be combinations of the following:
* `M` - month of year (no leading zero)
* `MM` - month of year (two digit)
* `MMM` - month name short
* `MMMM` - month name long
* `D` - day of month (no leading zero)
* `DD` - day of month (two digit)
* `DDD` - day of week (short)
* `DDDD` - day of week (long)
* `YY` - year (two digit)
* `YYYY` - year (four digit)
* `h` - 12 hour format (no leading zero)
* `hh` - 12 hour format (leading zero)
* `H` - 24 hour format (no leading zero)
* `HH` - 24 hour format (leading zero)
* `m` - minutes (no leading zero)
* `mm` - minutes (leading zero)
* `s` - seconds (no leading zero)
* `ss` - seconds (leading zero)
* `a` - lowercase am/pm
* `A` - uppercase AM/PM
* `'...'` - literal text
* `''` - single quote
* anything else - literal text

### date {#date}

Date

The date value to format

### settings {#settings}

Object

A set of key/value pairs that configure the format. All settings are optional:
* **amText** (default: `'am'`) - Text for AM
* **dayNames** (default: `['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']`) - The list of long day names, starting from Sunday.
* **dayNamesShort** (default: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`) - The list of abbreviated day names, starting from Sunday.
* **monthNames** (default: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`) - The list of full month names.
* **monthNamesShort** (default: `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`) - The list of abbreviated month names.
* **pmText** (default: `'pm'`) - Text for PM
* **shortYearCutoff** (default: `'+10'`) - Set the cutoff year for determining the century for a date (used in conjunction with dateFormat 'y'). If a numeric value (0-99) is provided then this value is used directly. If a string value is provided then it is converted to a number and added to the current year. Once the cutoff year is calculated, any dates entered with a year value less than or equal to it are considered to be in the current century, while those greater than it are deemed to be in the previous century.

</div>

## Parse date

`mobiscroll.parseDate(format, value[, settings = {}])`

If you are using ES6 modules in your project, the `parseDate` function can be imported from the mobiscroll package directly:

```jsx
import { parseDate } from '@mobiscroll/jquery';
```

### Description

Extract a date from a string value with a specified format.

```jsx title="Example"
parseDate('yy-mm-dd', '2015-02-19')); // returns date object
```

### Parameters

<div className="option-list">

### format {#format}

String

The format can be combinations of the following:
* `M` - month of year (no leading zero)
* `MM` - month of year (two digit)
* `MMM` - month name short
* `MMMM` - month name long
* `D` - day of month (no leading zero)
* `DD` - day of month (two digit)
* `DDD` - day of week (short)
* `DDDD` - day of week (long)
* `YY` - year (two digit)
* `YYYY` - year (four digit)
* `h` - 12 hour format (no leading zero)
* `hh` - 12 hour format (leading zero)
* `H` - 24 hour format (no leading zero)
* `HH` - 24 hour format (leading zero)
* `m` - minutes (no leading zero)
* `mm` - minutes (leading zero)
* `s` - seconds (no leading zero)
* `ss` - seconds (leading zero)
* `a` - lowercase am/pm
* `A` - uppercase AM/PM
* `'...'` - literal text
* `''` - single quote
* anything else - literal text

### value {#value}

String

The string value to parse

### settings {#settingsp}

Object

A set of key/value pairs that configure the format. All settings are optional:
* **amText** (default: `'am'`) - Text for AM
* **dayNames** (default: `['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']`) - The list of long day names, starting from Sunday.
* **dayNamesShort** (default: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`) - The list of abbreviated day names, starting from Sunday.
* **monthNames** (default: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`) - The list of full month names.
* **monthNamesShort** (default: `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`) - The list of abbreviated month names.
* **pmText** (default: `'pm'`) - Text for PM
* **shortYearCutoff** (default: `'+10'`) - Set the cutoff year for determining the century for a date (used in conjunction with dateFormat 'y'). If a numeric value (0-99) is provided then this value is used directly. If a string value is provided then it is converted to a number and added to the current year. Once the cutoff year is calculated, any dates entered with a year value less than or equal to it are considered to be in the current century, while those greater than it are deemed to be in the previous century.

</div>