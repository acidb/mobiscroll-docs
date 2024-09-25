### updateRecurringEvent {#updateRecurringEvent}

(originalRecurringEvent: [MbscCalendarEvent](#type-MbscCalendarEvent), oldEventOccurrence: [MbscCalendarEvent](#type-MbscCalendarEvent), newEvent: [MbscCalendarEvent](#type-MbscCalendarEvent), updatedEvent: [MbscCalendarEvent](#type-MbscCalendarEvent), updateMode: "all" &#124; "current" &#124; "following", timezone: string, timezonePlugin: any) => {newEvent: [MbscCalendarEvent](#type-MbscCalendarEvent) &#124; null, updatedEvent: [MbscCalendarEvent](#type-MbscCalendarEvent)}


Updates a recurring event, returns the updated and the new event.

Parameters:
 - originalRecurringEvent - The original event to update.

 - oldEventOccurrence - The original event occurrence in case of  &amp;  (what is dragged).

 - newEvent - The created even in case of  &amp;  (where is dragged).

 - updatedEvent - The updated event from popup.

 - updateMode - The update type.

