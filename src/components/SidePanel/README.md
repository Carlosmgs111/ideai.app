# MultiSidebar component

The MultiSidebar component is designed to contain and display multiple sidebars, both support and navigation, in addition to great adaptability within the interface, being able to be customized and modified by the user, although the latter is left to the developer.

### Developer

As a developer you can make the decision if you leave it up to the user how you want the MultiSidebar to adapt to the interface.

- Decide how it displayed:

  - Fixed:
  
    ```jsx
    // these styles are important so as not to break the display of the component
    <div style={{ display: "flex", position: "sticky" }}>
      // pass the MultiSidebar component an array of the sidebars to include,
      // in this case with the variable `sidebars`
      <MultiSidebar sidebars={sidebars}/>
      // here the content to be controlled
      // ...
    </div>
    ```
    Inside of `div` activate fixed mode.

  - Floating:

    ```jsx
    // pass the MultiSidebar component an array of the sidebars to include,
    // in this case with the variable `sidebars`
    <MultiSidebar sidebars={sidebars}/>
    // these styles are important so as not to break the display of the component
    <div style={{ display: "flex", position: "sticky" }}>
      // here the content to be controlled
      // ...
    </div>
    ```
    Outside of `div` activate floating mode.


- Let the user decide:
  ```jsx
    // same as the previous case, only now the content to be controlled 
    // by the MultiSidebar must be wrapped by the component
    <MultiSidebar sidebars={sidebars}>
      // here the content to be controlled
      // ...
    </MultiSidebar>

  ```

  As you can see, the difference lies in how the MultiSidebar is accommodated with respect to the content to be controlled, in the case of leaving nothing to the user, you just leave it to one side of the content, otherwise, you wrap the content with the MultiSidebar component, and this will be in charge of deploying it, according to the user's preferences.

Now, once the form is displayed to activate the user's preferences, it will display, within the configuration menu, several options that will allow the user to configure how it is displayed, among which is whether it will be floating or fixed, to the right or left side of the content, the transparency of the background among others.