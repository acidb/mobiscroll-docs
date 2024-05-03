### updateRecurringEvent {#updateRecurringEvent}

(originalRecurringEvent: MbscCalendarEvent, oldEventOccurrence: null &#124; MbscCalendarEvent, newEvent: null &#124; MbscCalendarEvent, updatedEvent: null &#124; MbscCalendarEvent, updateMode: "current" &#124; "following" &#124; "all", timezone: string, timezonePlugin: any) => {newEvent: MbscCalendarEvent &#124; null, updatedEvent: MbscCalendarEvent}


Updates a recurring event, returns the updated and the new event.

Parameters:
 - originalRecurringEvent - The original event to update.

 - oldEventOccurrence - The original event occurrence in case of d&amp;d (what is dragged).

 - newEvent - The created even in case of d&amp;d (where is dragged).

 - updatedEvent - The updated event from popup.

 - updateMode - The update type.

