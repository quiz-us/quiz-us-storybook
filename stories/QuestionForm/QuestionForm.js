import React from "react";
import { makeStyles } from "@material-ui/styles";
import { QuestionForm } from "../../quiz-us-components/src";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    margin: "20px",
    width: "80%"
  }
});

const standards = [
  { id: 1, name: "6.5A" },
  { id: 2, name: "8.5A" },
  { id: 3, name: "8.8A" }
];

const questionTypes = ["Free Response", "Multiple Choice"];

const onSubmit = formData => {
  console.log(JSON.stringify(formData, 2));
  alert(JSON.stringify(formData, 2));
};

const fetchTags = async input => {
  const res = await axios.get(`/tags?input=${input}`);
  return res.data;
};

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <QuestionForm
        standards={standards}
        questionTypes={questionTypes}
        onSubmit={onSubmit}
        fetchTags={fetchTags}
      />
    </div>
  );
};

// 08/13/18 questionType object
// { "questionType": "Multiple Choice",
//   "standardId": 2,
//   "tags": ["American Samoa"],
//   "question": {
//     "object": "value",
//     "document": {
//       "object": "document",
//       "data": { },
//       "nodes": [
//         {
//           "object": "block",
//           "type": "line",
//           "data": {},
//           "nodes": [
//             {
//               "object": "text",
//               "text": "q",
//               "marks": []
//             }
//           ]
//         }
//       ]
//     }
//   },
//   "answers": [
//     {
//       "value": {
//         "object": "value",
//         "document": {
//           "object": "document",
//           "data": {}, "nodes": [
//             {
//               "object": "block",
//               "type": "line",
//               "data": {},
//               "nodes": [
//                 { "object": "text", "text": "a", "marks": [] }
//               ]
//             }
//           ]
//         }
//       },
//       "isCorrect": true,
//       "answerId": "f7dfb20a7ef437efc351e07b6af8d48d89c07381",
//       "answerText": "a" },
//     {
//       "value": {
//         "object": "value",
//         "document": {
//           "object": "document",
//           "data": {},
//           "nodes": [{
//             "object": "block",
//             "type": "line",
//             "data": {},
//             "nodes": [{
//               "object": "text",
//               "text": "b",
//               "marks": []
//             }]
//           }]
//         }
//       },
//       "isCorrect": false,
//       "answerId": "5fba03979e60931eb86643e6908556448c4f7648",
//       "answerText": "b"
//     }],
//     "questionText": "q"
//   }
