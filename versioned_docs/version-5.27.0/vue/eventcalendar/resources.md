---
sidebar_position: 7
sidebar_label: Resources
displayed_sidebar: vueSidebar
---

# Resources

Resources can be many things, ranging from **people** through **conference rooms** to **company assets**, that need schedulig. The Eventcalendar can handle multiple resources inside a single instance.

The resource object supports the following properties:

- `children` _Array of object_ - Array of resource objects which will render as a child of the specified resource.
- `collapsed` _Boolean_ - Defines the displayed state of the child resoruce group.
- `id` _Number, String_ - This is an id that can be referenced in the events/invalids/colors data.
- `name` _String_ - The name of the resource that will be displayed at the top of the resource column.
- `color` _String_ - The color controls the default event color of the resource. Event colors can be specified further on the event object itself. If the color is omitted the events of the resource will inherit the default calendar color.
- `eventCreation` _Boolean_ - Disables event creation on specific resources by setting it to false. It's true by default.
- `eventDragBetweenResources` _Boolean_ - Specifies whether the events in the specified resource are movable across resources. It applies for scheduler and timeline views and has precedence over [`dragBetweenResources` option](api#opt-dragBetweenResources).
- `eventDragInTime` _Boolean_ - Specifies whether the events in the specified resource are movable in time. Has precedence over the [`dragInTime` option](api#opt-dragInTime).
- `eventResize` _Boolean_ - Specifies whether the events in the specified resource are resizable. Has precedence over [`dragToResize` option](api#opt-dragToResize).

Besides the base properties you can add any custom property, like title, job etc...

```javascript title="Defining resources"
resources: [
  { id: "my_id_1", name: "Jane", job: "Developer" },
  { id: "my_id_2", name: "Bob", job: "Administrator" },
  { id: "my_id_3", name: "Andy", job: "Designer" },
];
```

:::tip
For more information on resource grouping and hierarchy check out the [timeline's](timeline#resource-grouping-and-hierarchy) or the [scheduler's](scheduler#resource-grouping) sections for resources.
:::

[Events](api#opt-data), [colors](api#opt-colors), [invalids](api#opt-invalid) can be tied to a single or multiple resources. This can be done with the `resource` property of the objects, where the id of the resource should be passed. It can be a single value and the element would be linked to a single resource or in case of an array the element will show up at the specified resources. If no resource property is specified to the color/event/invalid object then the element will show up in every resource group.

```javascript title="Invalid rule for specific resources"
resources: [
  { id: 1, name: 'General Courier'},
  // highlight-start
  { id: 2, name: 'Express Courier'},
  { id: 3, name: 'Super Express Courier'},
  // highlight-end
],
invalid: [
  {
    // highlight-next-line
    resource: [2, 3]
    // is unavailable at weekends:
    recurring: {
      repeat: 'weekly',
      weekDays: 'SU,SA',
      interval: 1
    }
  }
]
```

:::tip
Check out the [recurrence section](../core-concepts/recurrence) for more details on recurring rules
:::
