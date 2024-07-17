# React Native Crash Course

## General Perspectives

### Before the era of multi-platform

- To develop an application for multiple platforms requires lots of financials and non-optimal.
- For instance, to develop an app for multiple platforms, such as iOS, Android, Web. A company needs to:
  - Hire a **_Front-end_** developer.
  - Hire a **_Back-end_** developer.
  - Hire an **_iOS (Swift, Objective-C)_** developer.
  - Hire an **_Android (Java, Kotlin)_** developer.

### The era of multi-platform

- With the raise of mobile users over the past 10 years, the world of developer witnesses the born of _Multiplatforms_, which allows developer to **Write Once, Run Anywhere**.
- Thus, the creation of the multi-platform frameworks, such as **_React Native_** and **_Flutter_**, had helped actualising the multi-platform idea.
- At this point, companies are able to hire less people, but still ensure the output that used to take 4 individuals to execute:
  - Hire a **_Front-end_** developer.
  - Hire a **_Back-end_** developer.

### Why React Native but not Flutter ?

- The most simple answer: I'm fucking get used with the **_JavaScript (TypeScript) language_** and **_React framework_**. So why the fuck do I have to learn a new language and framework but instead go on with what I have used to ?
- Created and Developed by **Meta**, so why not ?
- **_React-native_** allows using **Native Components**, which results in a **better performance** and **seamless User Experience (UX)**.
- **_React-native_** is cross-platform (multiplatform), which strictly follows the rule **Write Once, Run Anywhere**.
- Lots of benefits, such as: **Hot Reloading**, **Strong Community Support**, **Continuous Integration**.
- Used by big companies, such as: **_Discord_**, **_Meta (ofc)_**, **_BurgerKing_**, **_Xbox_** etc.

## Important Components

- Use **_JavaScript (TypeScript)_**, but instead of rendering to **_HTML_**, **_React-native_** will handle transpilling into **Swift (Objective-C)** for **iOS** and **Kotlin (Java)** for **Android**.
- In **React-native**, instead of using `<p>` or `<h1>` tag, `<Text>` will be use for replacing normal text tags.

  ```jsx title="index.jsx"
  import { Text, StyleSheet } from "react-native";
  import React from "react";

  // Create non-inline style to optimize performance
  const style = StyleSheet.create({
    text: {
      fontSize: 24,
      color: "blue",
    },
  });

  function App() {
    // Also able to use NativeWind, which is Tailwind for React-native
    return <Text style={style.text, {"text-lg"}}>Hello World</Text>;
  }

  export default App;
  ```

- `<View>` component is similar to `<div>` component, but with several changes to fit with the mobile development.

  - Often used for creating layout structures for other components.
  - Number of props that is used for controlling its appearance and behaviours.
  - Uses **CSS Flex-box layout**, makes easier to control how the children components shouold layout within the container. Such as, `flex-direction`, `justify-content`, `align-direction`.

- Buttons and Components that are designed for mobile applications, such as:
  - `<TouchableOpacity>` is a kind of `<button>` in HTML, but is used with **high customization and flexibility**.
  - `<TouchableHighlight>` for response to touch in **a unique way**.
  - `<TouchableWithoutOpacity>` for response to touch **without any kind of styles** when `onClick`.
  - `<ActivityIndicator>` to show the **loading indicator**.
  - `<Button>` is the same as `<button>` :)).
  - `<FlatList>` is a component that is used for creating a **item seperated, smooth scroll list of items**. Used when the data list is big and needs a good scrolling performance, otherwise use `map()`.
  - `<ScrollView>` is a `<View>` that holds **multiple components and Views**, but provides a **scrolling container** to them.
  - `<SafeAreaView>` provides a safe zone to render applications, which is useful to create the app across multiple device pixels.
  - `<Image>` is `<image>`. (Supports all, except SVG)
  - `<ImageBackground>` is used for displaying `<image>` in the background. (Supports all, except SVG)

### Many more to explore, visit at [React-native](https://reactnative.dev/docs/components-and-apis)
