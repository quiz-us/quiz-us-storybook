import React from "react";
import { storiesOf } from "@storybook/react";
import withReadme from "storybook-readme/with-readme";
import Readme from "../../quiz-us-components/src/components/RichTextEditor/README.md";
import RichTextEditor from "../../quiz-us-components/src/components/RichTextEditor";

export default () => {
  storiesOf("Rich Text RichTextEditor", module)
    .addDecorator(withReadme(Readme))
    .add("RichTextEditor", () => <RichTextEditor />);
};
