import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MasteryMap from './MasteryMap';

describe('<MasteryMap />', () => {
  let getByText, queryByText;
  let studentPerformance = [
    { name: 'Abc Def', 23: 70, 50: 90 },
    { name: 'Ghi Jkl', 23: 100 }
  ];
  let standards = {
    23: {
      name: '8.1A',
      description: 'The best standard'
    }
  };
  beforeEach(() => {
    const component = (
      <MasteryMap
        studentPerformance={studentPerformance}
        standards={standards}
      />
    );
    ({ getByText, queryByText } = render(component));
  });
  afterEach(cleanup);

  test('renders standard name as column headers', () => {
    expect(getByText('8.1A')).toBeTruthy();
  });

  test('only renders student performance that have matching standards', () => {
    expect(getByText('Abc Def')).toBeTruthy();
    expect(getByText('70')).toBeTruthy();
    expect(queryByText('90')).toBe(null);
  });
});
