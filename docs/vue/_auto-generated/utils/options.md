### updateRecurringEvent {#updateRecurringEvent}

(originalRecurringEvent: [MbscCalendarEvent](#type-MbscCalendarEvent), oldEventOccurrence: null &#124; [MbscCalendarEvent](#type-MbscCalendarEvent), newEvent: null &#124; [MbscCalendarEvent](#type-MbscCalendarEvent), updatedEvent: null &#124; [MbscCalendarEvent](#type-MbscCalendarEvent), updateMode: "current" &#124; "following" &#124; "all", timezone: string, timezonePlugin: any) => {newEvent: [MbscCalendarEvent](#type-MbscCalendarEvent) &#124; null, updatedEvent: [MbscCalendarEvent](#type-MbscCalendarEvent)}


Updates a recurring event, returns the updated and the new event.

Parameters:
 - originalRecurringEvent - The original event to update.

 - oldEventOccurrence - The original event occurrence in case of  &amp;  (what is dragged).

 - newEvent - The created even in case of  &amp;  (where is dragged).

 - updatedEvent - The updated event from popup.

 - updateMode - The update type.

