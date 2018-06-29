# react-native-swipebox

A simple swipe box component. Allows to be fully customizable.

![alt text](https://github.com/flyandi/react-native-swipetimepicker/raw/master/docs/swipetimepicker.gif "react-native-swipetimepicker")


## Installation

**React Native >= 0.49**

```bash
yarn add react-native-swipetimepicker
```

## Attributes

| Prop | Description | Default |
|---|---|---|
|`string` **`backgroundColor`**|Specifies the background color of the component|`#828186`|
|`string` **`borderColor`**|Specifies the border color of the component|`undefined`|
|`number` **`borderWidth`**|Specifies the border width of the component|`undefined`|
|`number` **`borderRadius`**|Specifies the border radius of the component|`3`|
|`string` **`textColor`**|The text color used when strings are rendered|`#ffffff`|
|`number` **`fontSize`**|The font size of the text|`auto`|
|`string` **`fontFamily`**|The font family for the text|`undefined`|
|`object` **`style`**|A standard style object that is applied to the main view|`undefined`|
|`object` **`styleHours`**|A standard style object that is applied to the hours box|`undefined`|
|`object` **`styleMinutes`**|A standard style object that is applied to the minutes box|`undefined`|
|`object` **`styleAMPM`**|A standard style object that is applied to the AMPM box|`undefined`|
|`number` **`size`**|The size of the hour and minute box.|`100`|
|`number` **`sizeAMPM`**|The size of the AMPM box.|`60%`|
|`array` **`customHours`**|An array containing custom hours definitions.|`120`|
|`array` **`customMinutes`**|An array containing custom minute definitions.|`120`|
|`bool` **`is24`**|Indicates 24h or 12h time format|`false`|
|`number` **`spacing`**|Spacing between each box|`5`|
|`number` **`minuteMultiplier`**|The multiplier to be used for minutes. Refer to the examples below.|`1`|
|`any` **`time`**|A Date Object or String indicating the to be used initial time.|`undefined`|

## Events

| Prop | Description |
|---|---|
|**`onChange`**|Executed when the time was changed.|

The `onChange` event returns the following data structure:

```json
{
  "hour": (integer) the value of the hour,
  "minute": (integer) the value of the minute,
  "ampm": (boolean) TRUE for PM and FALSE for AM,
  "text": (string) A prepared time string, e.g. 12:15AM or 17:30
  "time": (date) A JavaScript date object containing the time
}
```

## Using the Minute Multiplier

The Minute Multiplier is a powerful number allowing to set various minute abstractions.

Examples:

A `minuteMultiplier` of 1 is displaying minutes from 0 - 59.

A `minuteMultiplier` of 15 is displaying each quarter minute (15, 30, 45)

A `minuteMultiplier` of 5 is displaying the minutes every 5 minute (5, 10, 15, 20, ...)

## Examples

Import the component:

```es6
import SwipeTimePicker from 'react-native-swipetimepicker';
```


**Simple Example**

```es6
<SwipeTimePicker
    onChange={(time) => console.log(time, time.text)}
/>
```

**Initial Time**

```es6
<SwipeTimePicker
    time={new Date()}
    onChange={(time) => console.log(time, time.text)}
/>
```

```es6
<SwipeTimePicker
    time={'17:30'}
    is24={true}
    onChange={(time) => console.log(time, time.text)}
/>
```

**Minute Multiplier**

```es6
<SwipeTimePicker
    minuteMultiplier={15}
    onChange={(time) => console.log(time, time.text)}
/>
```

**Rounded**

```es6
<SwipeTimePicker
    size={120}
    borderRadius={120}
    onChange={(time) => console.log(time, time.text)}
/>
```

**Advanced Example**

```es6
<SwipeTimePicker
    minuteMultiplier={5}
    size={80}
    sizeAMPM={40}
    backgroundColor={'red'}
    borderColor={'black'}
    borderWidth={3}
    styleAMPM={{backgroundColor: 'green'}}
    spacing: 10,
    onChange={(time) => console.log(time, time.text)}
/>
```





