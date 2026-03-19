

### isVisible {#method-isVisible}

() => boolean


Returns a boolean indicating whether the component is visible or not.

### navigate {#method-navigate}

(date: [MbscDateType](#type-MbscDateType)) => void


Display a specific month on the calendar without setting the date.

Parameters:
 - date - Date to navigate to. Can be a Date object, ISO8601 date string, or moment object.



### position {#method-position}

() => void


Recalculates the position of the component (if not inline).

### setActiveDate {#method-setActiveDate}

(active: "end" &#124; "start") => void


Sets which date or time is currently selected.

Parameters:
 - active - Specifies the active selection: start or end.


