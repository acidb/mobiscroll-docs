---
sidebar_position: 3
sidebar_label: Dynamic or async data
displayed_sidebar: reactSidebar
title: Dynamic or async data
---

The select component supports dynamic data binding. For cases when the data is not immediately available or when the data changes with time (new options are added, or others removed) this feature is the most usefull.

To notify the select component of the change of data, you only have to pass a different array. This can be achieve in multiple ways, but using a simple spread operator is one of the easiest. Also using a state variable and calling its setter when the data becomes available is a best practice. Check out the example below:

```jsx title="Loading options from an API"
import { Select } from '@mobiscroll/react';

function App() {
    const [data, setData] = React.useState([]); // the initial array contains nothing
    // state for the selected item
    const [selected, setSelected] = React.useState(null);
    // selection handler
    const onSelected = (ev) => {
        setSelected(ev.value);
    };

    React.useEffect(() => {
        myGetDataFromAPI() // fetch the data from a remote API
            .then((fetchedData) => {
                setData(fetchedData); // set the fetched data to the state
            });
    }, []);

    return <Select data={data} value={selected} onChange={onSelected} label="Select item" />
}
```