import React from 'react';
import { PropRow } from './PropRow';
import { Table } from './PropsTable';
import { ResetWrapper } from '../../typography/DocumentFormatting';

export default {
  component: PropRow,
  title: 'Docs/PropRow',
  excludeStories: /.*Def$/,
  decorators: [
    getStory => (
      <ResetWrapper>
        <Table>
          <tbody>{getStory()}</tbody>
        </Table>
      </ResetWrapper>
    ),
  ],
};

export const stringDef = {
  name: 'someString',
  type: { summary: 'string' },
  required: true,
  description: 'someString description',
  defaultValue: { summary: 'fixme' },
};

export const longNameDef = {
  ...stringDef,
  name: 'reallyLongStringThatTakesUpSpace',
};

export const longDescDef = {
  ...stringDef,
  description: 'really long description that takes up a lot of space. sometimes this happens.',
};

export const numberDef = {
  name: 'someNumber',
  type: { summary: 'number' },
  required: false,
  description: 'someNumber description',
  defaultValue: { summary: '0' },
};

export const objectDef = {
  name: 'someObject',
  type: { summary: 'objectOf(number)' },
  required: false,
  description: 'A simple `objectOf` propType.',
  defaultValue: { summary: '{ key: 1 }' },
};

export const arrayDef = {
  name: 'someOArray',
  type: { summary: '[ number ]' },
  required: false,
  description: 'array of a certain type',
  defaultValue: { summary: '[1, 2, 3]' },
};

export const complexDef = {
  name: 'someComplex',
  type: {
    summary: 'object',
    name: 'objectOf',
    value: {
      name: 'shape',
      value: {
        id: {
          name: 'number',
          description:
            "Just an internal propType for a shape.\n It's also required, and as you can see it supports multi-line comments!",
          required: true,
        },
        func: {
          name: 'func',
          description: 'A simple non-required function',
          required: false,
        },
        arr: {
          name: 'arrayOf',
          value: {
            name: 'shape',
            value: {
              index: {
                name: 'number',
                description: '5-level deep propType definition and still works.',
                required: true,
              },
            },
          },
          description: 'An `arrayOf` shape',
          required: false,
        },
      },
    },
  },
  required: false,
  description: 'A very complex `objectOf` propType.',
  defaultValue: {
    value: '{\n  thing: {\n    id: 2,\n    func: () => {},\n    arr: [],\n  },\n}',
    computed: false,
  },
};

export const funcDef = {
  name: 'concat',
  type: { summary: '(a: string, b: string) => string' },
  required: true,
  description: 'concat 2 string values.',
  defaultValue: { summary: 'func', detail: '(a, b) => { return a + b; }' },
  jsDocTags: {
    params: [
      { name: 'a', description: 'The first string' },
      { name: 'b', description: 'The second string' },
    ],
    returns: { description: 'The concatenation of both strings' },
  },
};

export const markdownDef = {
  name: 'someString',
  type: { summary: 'string' },
  required: false,
  description:
    'A `prop` can *support* __markdown__ syntax. This was ship in ~~5.2~~ 5.3. [Find more info in the storybook docs.](https://storybook.js.org/)',
};

export const string = () => <PropRow row={stringDef} />;
export const longName = () => <PropRow row={longNameDef} />;
export const longDesc = () => <PropRow row={longDescDef} />;
export const number = () => <PropRow row={numberDef} />;
export const objectOf = () => <PropRow row={objectDef} />;
export const arrayOf = () => <PropRow row={arrayDef} />;
export const func = () => <PropRow row={funcDef} />;
export const markdown = () => <PropRow row={markdownDef} />;
