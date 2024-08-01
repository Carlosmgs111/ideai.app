# DefineForms component

The `DefineForms` component abstracts the definition and implementation of input type components that may be needed by a superior component, without necessarily defining them one by one within the code, it is only necessary to declare DefineForms within the component that requires said inputs, and it will be able to access the state handled within DefineForms, that is, the state of the different declared inputs.

[Screenshot_1][displayed example]

For example, if you need to create a form that requires multiple inputs, let's say input types text, checks, textarea among others, and that these are more than 5, the declaration and handling of the state of these would be somewhat complex to manage, so it would be It is preferable to delegate them to another component that is in charge of it, and we only take care of obtaining the status of said entries for our main component.

```jsx
  import { DefineForms, getHOCAndTrigger } from "DefineForms"
```

```jsx
  <DefineForms
    {...{
      baseSchema: {
        event: {
          inputType: INPUT_TYPES.TEXT,
          name: "event",
          label: "evento",
          value: "",
          required: true,
        },
        summary: {
          inputType: INPUT_TYPES.PARAGRAPH,
          name: "summary",
          label: "resumen",
          value: "RESUMEN!",
          required: true,
        },
        quantity: 0,
      },
      nonOptionals: ["title", "emitedAt~", "image", "url", "emitedBy{"],
      onClickHandler,
      highOrderCallback,
      buttons: {},
    }}
  ></DefineForms>
```

## Implementing

`DefineForms` receives as a parameter a `baseSchema` object, and within this object the data to be controlled must be specified using another object, which specifies the type of input that is desired to control the value among other initial optional configurations or by passing a primitive value which will be analyzed to determine the most optimal input type for its control, once this object is loaded and configured, a value called `controlledValue` will be injected, this being the final value that will be returned as part of the package composed of other values to be treated.

```jsx
  let age = 30
  let name = {
    value: "Carlos",
    inputType: INPUT_TYPES.TEXT,
    name: "first-name"
    }
  let birthday = {
    value: "1993-01-11",
    inputType: INPUT_TYPES.DATE,,
    label: "Cumpleaños"
    }
  let status = {
    value: ["active", "inactive"],
    inputType: INPUT_TYPES.SELECTION,
    required: true
  };

  let baseSchema = {
    age,
    name,
    birthday,
    status
  }

  <DefineForms {...{ baseSchema }}></DefineForms>
```

Note that some entities have values that others do not, these are optional values, and these help to better control your values, such as alerting of possible errors, facilitating the understanding of the end user, ensuring the integrity of the data between others.

Some of optionals settings:

- `label`: Shows an identifier that is friendlier and closer to the user, such as the translation of said entity or attribute to control.
- `required`: This option is quite descriptive, it indicates that a controlled value must be filled.
- `name`: This provides an identifier with which the controlled entity or attribute is identified.

***Note**: This will change to opt for a more declarative approach, where `baseSchema` will be an array of objects or directly an object, where the type of input to be implemented is directly selected, in addition to declaring extra options if required.*

## Using 

There are two ways to obtain and manage the status of the inputs, the first is by declaring a callback that receives an object as a parameter that will contain four attributes:

- `data`: Is an array that contains the set of declared entries, so you have to index them according to the order of declaration. 
- `reset`: A function that clears the state of all input sets, its use is **recomended**
- `setError`: A function that changes the internal state of `DefineForms` to denote an error in data processing, its use is **optional**.
- `setLoading`: A function that changes the internal state of `DefineForms` to denote that data is being processed, its use is **optional**.
  
***Note**: `data` will be changed in the future to return an object with a unique index, whether provided or generated automatically and dynamically by the `DefineForms` component.*

```jsx
  const updatedCallback = ({ data, setLoading, setError, reset }) => {
    setLoading(true);
    try {
      // Process `data` here
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    } finally {
      reset();
    }
  };
```

And pass this callback as the `onClickHandler` parameter to the DefineForms component.

```jsx
  <DefineForms
    {...{
      baseSchema: {
       ...
      },
      onClickHandler: updatedCallback,
    }}
  />
```

The second option is similar to the first, except that we won't pass the callback we've declared directly to the component, but will first pass it to a utility function that returns the `DefineForms` module called `getHOCAndTrigger`.

```jsx
  const [updateHOC, hocTrigger] = getHOCAndTrigger(updateCallback);

```

And we pass our callback as a parameter to `getHOCAndTrigger`, this will return functions, the first, called `updateHOC` will be passed to the `DefineForms` component as a `highOrderCallback` parameter and the second, called `hocTrigger` will be the trigger that will execute the callback that we initially declared, this will allow us to execute said callback from anywhere in our parent component.

```jsx
  <DefineForms
    {...{
      baseSchema: {
       ...
      },
      highOrderCallback: updateHOC,
    }}
  />

  <button onClick={ hocTrigger }> Trigger </button>
```

The difference between the two methods is that in the first we can only trigger the callback using the button provided by the `DefineForms` component itself, while the second allows us to obtain the trigger that executes the callback and use it anywhere within the component that is implementing `DefineForms`.