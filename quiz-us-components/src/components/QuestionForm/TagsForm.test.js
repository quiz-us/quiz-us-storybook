import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TagsForm from './TagsForm';

describe('<TagsForm/>', () => {
  let getByPlaceholderText, getByText;
  const mockUpdateTags = jest.fn();
  beforeEach(() => {
    const component = <TagsForm updateTags={mockUpdateTags} />;
    ({ getByPlaceholderText, getByText } = render(component));
  });
  afterEach(cleanup);

  test('autosuggests options based on input', () => {
    fireEvent.change(getByPlaceholderText('Select one or more tag(s)'), {
      target: {
        value: 'a'
      }
    });
    expect(getByText('American Samoa')).toBeTruthy();
  });

  /**
   * @todo: finish rest of TagsForm tests once TagsForm has been updated to work
   * with backend.
   */
});
