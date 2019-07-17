import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from '@testing-library/react';
import TagsForm from './TagsForm';

describe('<TagsForm/>', () => {
  let getByPlaceholderText, getByText;
  const mockUpdateTags = jest.fn();
  const mockFetchTags = jest
    .fn()
    .mockResolvedValue([{ label: 'American Samoa' }]);
  beforeEach(() => {
    const component = (
      <TagsForm updateTags={mockUpdateTags} fetchTags={mockFetchTags} />
    );
    ({ getByPlaceholderText, getByText } = render(component));
  });
  afterEach(cleanup);

  test('autosuggests options based on input', async () => {
    // currently console logging warnings about using `act` because mock
    // function resolves a Promise. It seems that the fix is to wait for
    // React 16.9.0: https://github.com/testing-library/react-testing-library/issues/281
    fireEvent.change(getByPlaceholderText('Add one or more tag(s)'), {
      target: {
        value: 'a'
      }
    });
    const option = await waitForElement(() => getByText('American Samoa'));
    expect(option).toBeTruthy();
  });

  test('calls updateTags when input is chosen', async () => {
    fireEvent.change(getByPlaceholderText('Add one or more tag(s)'), {
      target: {
        value: 'a'
      }
    });
    const option = await waitForElement(() => getByText('American Samoa'));
    fireEvent.click(option);
    expect(mockUpdateTags).toHaveBeenCalledWith(['American Samoa']);
  });

  /**
   * @todo: finish rest of TagsForm tests once TagsForm has been updated to work
   * with backend.
   */
});
