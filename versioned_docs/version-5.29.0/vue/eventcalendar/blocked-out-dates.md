---
sidebar_position: 10
sidebar_label: Blocked out dates
displayed_sidebar: vueSidebar
---

# Blocked out dates

You can show blocked out time ranges with the [`invalid`](./api#opt-invalid) option. By default the events and the blocked out dates will be displayed on the view even if there is collision.

The [`invalid`](./api#opt-invalid) option supports the following formats: JavaScript Date objects, ISO8601 strings or moment object. These formats can be passed directly to the array in which case the whole day will be disabled or as an object where the blocked out ranges can be customized with the following properties: `allDay`, `start`, `end`, `title`, `recurring`.

Custom properties can also be passed to the invalid object which will also be passed to the life-cycle events and this can help with the identification/validation of the invalids.

If an event interacts with an invalid range the event will be reverted to it's original position and the [`@event-update-failed`](./api#event-onEventUpdateFailed) event will be fired. (If the [`dragToMove`](./api#opt-dragToMove) or the [`dragToResize`](./api#opt-dragToResize) options were used.)

If a newly created event collides with a blocked out date the event won't be created and the [`@event-create-failed`](./api#event-onEventCreateFailed) event will be fired. (If the [`dragToCreate`](./api#opt-dragToCreate) option was used)

```javascript title="Invalid array example with various properties"
const invalid = [
  /* Passing exact dates will block out the entire day */
  new Date(2021, 1, 7), // Date object
  '2021-10-15T12:00', // string
  moment("2020-12-25"), // moment object

  /* Block out date range passed as an object */
  {
    // multi day range with date string
    start: '2021-10-15T12:00',
    end: '2021-10-18T13:00',
    title: 'Company 10th anniversary',
    type: 'day-off' // custom property
  },
  {
   // multi day range with date object
    allDay: true,
    start: new Date(2021, 2, 7, 10, 10),
    end: new Date(2021, 2, 9, 20, 20),
    title: 'Conference for the whole team',
    type: 'conference' // custom property
  },
  {
    // multi day time range with recurring and time string
    start: '13:00',
    end: '12:00',
    recurring: { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' },
    title: 'Lunch break',
    type: 'lunch' // custom property
  }
];
```

<div className="pdg-img">
    <img src="https://docs.mobiscroll.com/Content/img/docs/blocked-out-dates.gif" alt="Eventcalendar blocked out dates" />
    <label className="img-label">Eventcalendar blocked out dates</label>
</div>