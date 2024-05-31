### updateRecurringEvent {#updateRecurringEvent}

(originalRecurringEvent: MbscCalendarEvent, oldEventOccurrence: MbscCalendarEvent, newEvent: MbscCalendarEvent, updatedEvent: MbscCalendarEvent, updateMode: "all" &#124; "current" &#124; "following", timezone: string, timezonePlugin: any) => {newEvent: MbscCalendarEvent &#124; null, updatedEvent: MbscCalendarEvent}


Updates a recurring event, returns the updated and the new event.

Parameters:
 - originalRecurringEvent - The original event to update.

 - oldEventOccurrence - The original event occurrence in case of d&amp;d (what is dragged).

 - newEvent - The created even in case of d&amp;d (where is dragged).

 - updatedEvent - The updated event from popup.

 - updateMode - The update type.

