---
displayed_sidebar: jquerySidebar
sidebar_label: Recurring events
---


# Working with recurring events

## Querying recurring events

The Calendar Integration when queries recurring events from the Google or the Outlook calendar, it will receive individual event occurences for the given period of time. So every event arrives as an individual event. The Mobiscroll Eventcalendar won't know about the recurrence in these cases.

To tell whether these events are part of a recurring set or not, you need to check the properties of the event.

1. The google event has the `event.googleEvent.recurringEventId` field set in case of recurring events - which is the ID of the original recurring event.
2. The outlook event has the `event.outlookEvent.type` field set to `occurrence` in case of a recurring events, otherwise the type is `singleInstance`

## Creating recurring events

When you want to create a recurring event through the Mobiscroll Eventcalendar, you can do so by setting the `recurrence` field to the RRULE before sending it to the Google or Outlook calendar. For example:

```js title="Create a recurring event in a Google calendar"
const onEventCreate = (args, inst) => {
  const event = args.event;
  event.googleEvent = {
    recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TH;COUNT=4'],
    // ...other google specific properties
  }
  // then send it to Google
  googleCalendarSync.addEvent('MY_CALENDAR_ID', event);
}
```

When this is done, the [getEvents](./calendar-integrations.md#method-google-getEvents) function will return the individual occurences of the recurring set, the same way it is described [above](#querying-recurring-events).

## Updating a single recurring instance

To update a single occurence of a recurring event, you can drag it on the Eventcalendar UI (when the [dragToMove](../api#opt-dragToMove) option is enabled). Since the events you get from the calendar integrations are individual occurences, updating one will not update the whole set of recurring events. So updating a single instance of the recurring set is the default behavior.

## Deleting a recurring instance

As mentioned above in the [query section](#querying-recurring-events), by default you get the recurring event occurences as single individual events, when querying events from Google or Outlook calendars. Deleting a single event instance will only remove that single instance from the set.

## Updating a recurring event

To update the whole recurring set or parts of it (for example: this and following events), you will need to use direct API calls to the Google or Outlook calendars themselves, since this is not supported by the Calendar Integrations currently.

Here's a link for a more detailed description on [how to update recurring events with the Google Calendars](https://developers.google.com/calendar/api/guides/recurringevents).

For Outlook recurring events check out the [Outlook schedule recurring events guide](https://learn.microsoft.com/en-us/graph/outlook-schedule-recurring-events).