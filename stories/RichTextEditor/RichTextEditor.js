import React from 'react';
import { RichTextEditor } from '../../quiz-us-components/src';
import initialValue from './value.json';

export default () => (
  <RichTextEditor initialValue={initialValue} placeholder="Edit here!" />
);
