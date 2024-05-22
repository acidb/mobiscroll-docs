---
sidebar_label: Accessibility
displayed_sidebar: javascriptSidebar
title: Accessibility
---

## Overview

We want our products to be fully experienced by the widest number of users including disabled users.

We take accessibility pretty seriously and spent a couple of iterations on it. By adhering to standards like <a href="http://www.w3.org/WAI/PF/aria-practices/">WAI-ARIA</a>, and <a href="http://www.section508.gov/">Section 508</a> we create accessible products that can be used well together with an assistive technology, like a screen reader.

Since the technology has evolved, nowadays not only basic text-driven experiences have to be made accessible, but also other features.

## Section 508

### [Section 1194.21](http://www.section508.gov/content/learn/standards/quick-reference-guide#1194.21) - Software applications and operating systems

The following table shows the level of support that Mobiscroll provides for the Section 1194.21

<table>
  <tbody>
    <tr>
      <th>Criteria</th>
      <th>Supporting features</th>
      <th>Remarks</th>
    </tr>
    <tr>
      <td>(a) When software is designed to run on a system that has a keyboard product functions shall be executable from a keyboard where the function itself or the result of performing a function can be discerned textually.</td>
      <td>Supported</td>
      <td>Native html keyboard support kept where relevant, custom key bindings added where needed</td>
    </tr>
    <tr>
      <td>(b) Applications shall not disrupt or disable activated features of other products that are identified as accessibility features where those features are developed and documented according to industry standards. Applications also shall not disrupt or disable activated features of any operating system that are identified as accessibility features where the application programming interface for those accessibility features has been documented by the manufacturer of the operating system and is available to the product developer.</td>
      <td>Supported</td>
      <td>Mobiscroll does nothing to disrupt or disable activated accessibility features</td>
    </tr>
    <tr>
      <td>(c) A well-defined on-screen indication of the current focus shall be provided that moves among interactive interface elements as the input focus changes. The focus shall be programmatically exposed so that assistive technology can track focus and focus changes.</td>
      <td>Supported</td>
      <td>In some cases the browser’s native focus indicator styling is overwritten with custom styling</td>
    </tr>
    <tr>
      <td>(d) Sufficient information about a user interface element including the identity operation and state of the element shall be available to assistive technology. When an image represents a program element the information conveyed by the image must also be available in text.</td>
      <td>Supported</td>
      <td>Using WAI-ARIA,roles and attributes where applicable</td>
    </tr>
    <tr>
      <td>(e) When bitmap images are used to identify controls status indicators or other programmatic elements the meaning assigned to those images shall be consistent throughout an application’s performance.</td>
      <td>Not Applicable</td>
      <td></td>
    </tr>
    <tr>
      <td>(f) Textual information shall be provided through operating system functions for displaying text. The minimum information that shall be made available is text content text input caret location and text attributes.</td>
      <td>Not Applicable</td>
      <td></td>
    </tr>
    <tr>
      <td>(g) Applications shall not override user selected contrast and color selections and other individual display attributes.</td>
      <td>Not Applicbale</td>
      <td></td>
    </tr>
    <tr>
      <td>(h) When animation is displayed the information shall be displayable in at least one non-animated presentation mode at the option of the user.</td>
      <td>Not Applicable</td>
      <td></td>
    </tr>
    <tr>
      <td>(i) Color coding shall not be used as the only means of conveying information indicating an action, prompting a response or distinguishing a visual element.</td>
      <td>Not Applicable</td>
      <td></td>
    </tr>
    <tr>
      <td>(j) When a product permits a user to adjust color and contrast settings a variety of color selections capable of producing a range of contrast levels shall be provided.</td>
      <td>Not Applicable</td>
      <td></td>
    </tr>
    <tr>
      <td>(k) Software shall not use flashing or blinking text, objects, or other elements having a flash or blink frequency greater than 2 Hz and lower than 55 Hz.</td>
      <td>Supported</td>
      <td>No flashing or blinking elements are used</td>
    </tr>
    <tr>
      <td>(l) When electronic forms are used, the form shall allow people using assistive technology to access the information, field elements, and functionality required for completion and submission of the form, including all directions and cues.</td>
      <td>Supported</td>
      <td>Mobiscroll Forms are accessible to assistive technologies</td>
    </tr>
  </tbody>
</table>

### [Section 1194.22](http://www.section508.gov/content/learn/standards/quick-reference-guide#1194.22) - Web-based intranet and Internet information and applications

The following table shows the level of support that Mobiscroll provides for the Section 1194.21

<table>
  <tbody>
    <tr>
      <th>Criteria</th>
      <th>Supporting features</th>
      <th>Remarks</th>
    </tr>
    <tr>
      <td>(a) A text equivalent for every non-text element shall be provided (e.g., via “alt", “longdesc", or in element content).</td>
      <td>Supported</td>
      <td></td>
    </tr>
    <tr>
      <td>(b) Equivalent alternatives for any multimedia presentation shall be synchronized with the presentation.</td>
      <td>Not Applicable</td>
      <td>No multimedia is used</td>
    </tr>
    <tr>
      <td>(c) Web pages shall be designed so that all information conveyed with color,is also available without color for example from context or markup.</td>
      <td>Supported</td>
      <td></td>
    </tr>
    <tr>
      <td>(d) Documents shall be organized so they are readable without requiring an associated style sheet.</td>
      <td>Not fully supported</td>
      <td>We’re providing an UI Framework for styling content. Removing style sheets doesn’t make sense</td>
    </tr>
    <tr>
      <td>(e) Redundant text links shall be provided for each active region of a server-side image map.</td>
      <td>Not Applicable</td>
      <td>No image maps are used</td>
    </tr>
    <tr>
      <td>(f) Client-side image maps shall be provided instead of server-side image maps except where the regions cannot be defined with an available geometric shape.</td>
      <td>Not Applicable</td>
      <td>No image maps are used</td>
    </tr>
    <tr>
      <td>(g) Row and column headers shall be identified for data tables.</td>
      <td>Not Applicable</td>
      <td>No data tabels are used</td>
    </tr>
    <tr>
      <td>(h) Markup shall be used to associate data cells and header cells for data tables that have two or more logical levels of row or column headers.</td>
      <td>Not Applicable</td>
      <td>No data tabels are used</td>
    </tr>
    <tr>
      <td>(i) Frames shall be titled with text that facilitates frame identification and navigation.</td>
      <td>Not Applicable</td>
      <td>No frames are used</td>
    </tr>
    <tr>
      <td>(j) Pages shall be designed to avoid causing the screen to flicker with a frequency greater than 2 Hz and lower than 55 Hz.</td>
      <td>Supported</td>
      <td>No flashing or blinking elements are used</td>
    </tr>
    <tr>
      <td>(k) A text-only page with equivalent information or functionality shall be provided to make a web site comply with the provisions of this part, when compliance cannot be accomplished in any other way. The content of the text-only page shall be updated whenever the primary page changes.</td>
      <td>Not Applicable</td>
      <td>The developer is responsible for providing text-only content for pages that use Mobiscroll</td>
    </tr>
    <tr>
      <td>(l) When pages utilize scripting languages to display content or to create interface elements the information provided by the script shall be identified with functional text that can be read by assistive technology.</td>
      <td>Supported</td>
      <td>Mobiscroll provides keyboard navigation support and screen reader support (via ARIA attributes)</td>
    </tr>
    <tr>
      <td>(m) When a web page requires that an applet, plug-in or other application be present on the client system to interpret page content the page must provide a link to a plug-in or applet that complies with §1194.21(a),through (l).</td>
      <td>Not Supported</td>
      <td></td>
    </tr>
    <tr>
      <td>(n) When electronic forms are designed to be completed on-line, the form shall allow people using assistive technology to access the information field elements and functionality required for completion and submission of the form including all directions and cues.</td>
      <td>Supported</td>
      <td>Mobiscroll Forms are accessible to assistive technologies</td>
    </tr>
    <tr>
      <td>(o) A method shall be provided that permits users to skip repetitive navigation links.</td>
      <td>Not Applicable</td>
      <td></td>
    </tr>
    <tr>
      <td>(p) When a timed response is required the user shall be alerted and given sufficient time to indicate more time is required.</td>
      <td>Not Applicable</td>
      <td></td>
    </tr>
  </tbody>
</table>

## WAI-ARIA Support

WAI-ARIA is a World Wide Web Consortium specification that was designed to be a framework for web developers. This can be used in developing applications that leverage Ajax, scripting and other so called “rich application" techniques. This framework has clear specifications about steps that developers can use in order to make their applications more accessible to assistive technologies.

WAI-ARIA’s role is to fill the gap between rich applications and disabled users by using additional metadata with the help of HTML element attributes that screen readers can use to reason about a control or DOM element. These attributes, like role, aria-haspopup, aria-selected and others provide vital information to screen readers, which can then be used to provide a richer level of interaction with applications and websites.

Here is the complete list of WAI-ARIA attributes used by Mobiscroll:

- `role="dialog"` for popups and pickers
- `role="grid"` for calendar view
- `role="row"` for calendar view rows
- `role="gridcell"` for calendar views cells
- `role="listbox"` for scroller wheels
- `role="option"` for scroller wheel items
- `role="button"` for button controls
- `aria-live` for announcements
- `aria-hidden` for elements which are not visible and should not be read by screen readers
- `aria-label` for controls without text or icon buttons
- `aria-selected` for indicating selected value on wheels and calendar days
- `aria-multiselectable` for multiple select
- `aria-disabled` for disabled items (wheel items, buttons, calendar days)

## Keyboard Support

Mobiscroll ensures that your users can access the full capabilities of widgets using just the keyboard.

The following keyboard bindings are used by Mobiscroll:
- [Datepicker](/javascript/datepicker/accessibility)
- [Eventcalendar](/javascript/eventcalendar/accessibility)
- [Select](/javascript/select/accessibility)
- [Popup](/javascript/popup/accessibility)
- Forms: `Tab`, `Shift + Tab` to navigate between form elements, `Space` to press buttons, `Up`, `Down`, `Left`, `Right` arrows to change the selected segmented item.

## Support Right-To-Left (RTL) Languages

Only a few languages in the world use RTL text direction, but these languages cover over a billion people.

Beside it’s internationalization characteristic RTL is about making user experiences more accessible for users working in Right-to-left languages like, so we are considering this as an accessibility feature as well.

Mobiscroll supports RTL for every component, which can be activated with the `rtl: true` option.