import React from 'react';
import { MasteryMap } from '../../quiz-us-components/src';

const standards = {
  52: {
    name: '8.5A',
    description:
      'describe the structure of atoms, including the masses, electrical charges, and locations, of protons and neutrons in the nucleus and electrons in the electron cloud'
  },
  2: {
    name: '8.5B',
    description:
      'identify that protons determine an element’s identity and valence electrons determine its chemical properties, including reactivity'
  },
  42: {
    name: '8.6A',
    description:
      'demonstrate and calculate how unbalanced forces change the speed or direction of an object’s motion'
  },
  100: {
    name: '7.7A',
    description:
      'contrast situations where work is done with different amounts of force to situations where no work is done such as moving a box with a ramp and without a ramp, or standing still'
  }
};

const studentPerformance = [
  { name: 'John Doe', 52: 80, 2: 80, 42: 85, 100: 20 },
  { name: 'Jane Doe', 52: 90, 2: 80, 42: 95, 100: 89 },
  { name: 'Jane Travolta', 52: 70, 2: 100, 42: 85, 100: null },
  { name: 'John Travolta', 52: 100, 2: 80, 42: 75, 100: 72 },
  { name: 'Jane Austen', 52: 20, 2: 80, 42: 85, 100: 100 },
  { name: 'John Austen', 52: 100, 2: 80, 42: 85, 100: 100 }
];

export default () => (
  <MasteryMap standards={standards} studentPerformance={studentPerformance} />
);
