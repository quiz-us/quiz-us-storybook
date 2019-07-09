import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TagsForm from './TagsForm';

describe('<TagsForm/>', () => {
  let getByPlaceholderText, getByText, debug;
  const mockUpdateTags = jest.fn();
  beforeEach(() => {
    const component = <TagsForm updateTags={mockUpdateTags} />;
    ({ getByPlaceholderText, getByText, debug } = render(component));
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

  test('calls updateTags when input is chosen', () => {
    fireEvent.change(getByPlaceholderText('Select one or more tag(s)'), {
      target: {
        value: 'a'
      }
    });
    fireEvent.click(getByText('American Samoa'));
    expect(mockUpdateTags).toHaveBeenCalledWith(['American Samoa']);
  });

  /**
   * @todo: finish rest of TagsForm tests once TagsForm has been updated to work
   * with backend.
   */
});
