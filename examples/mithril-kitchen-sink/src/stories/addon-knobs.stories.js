/** @jsx m */

import m from 'mithril';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  number,
  boolean,
  array,
  select,
  color,
  date,
  button,
} from '@storybook/addon-knobs';

export default {
  title: 'Addons/Knobs',
  decorators: [withKnobs],
};

export const Simple = () => {
  const name = text('Name', 'John Doe');
  const age = number('Age', 44);
  const content = `I am ${name} and I'm ${age} years old.`;

  return {
    view: () => <div>{content}</div>,
  };
};

export const story2 = () => {
  const name = text('Name', 'Jane');
  const stock = number('Stock', 20, {
    range: true,
    min: 0,
    max: 30,
    step: 5,
  });
  const fruits = {
    Apple: 'apples',
    Banana: 'bananas',
    Cherry: 'cherries',
  };
  const fruit = select('Fruit', fruits, 'apples');
  const price = number('Price', 2.25);

  const colour = color('Border', 'deeppink');
  const today = date('Today', new Date('Jan 20 2017 GMT+0'));
  const items = array('Items', ['Laptop', 'Book', 'Whiskey']);
  const nice = boolean('Nice', true);

  const stockMessage = stock
    ? `I have a stock of ${stock} ${fruit}, costing &dollar;${price} each.`
    : `I'm out of ${fruit}${nice ? ', Sorry!' : '.'}`;
  const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

  button('Arbitrary action', action('You clicked it!'));

  return {
    view: () => (
      <div style={`border:2px dotted ${colour}; padding: 8px 22px; border-radius: 8px`}>
        <h1>My name is {name},</h1>
        <h3>today is {new Date(today).toLocaleDateString('en-US', dateOptions)}</h3>
        <p>{stockMessage}</p>
        <p>Also, I have:</p>
        <ul>
          {items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{salutation}</p>
      </div>
    ),
  };
};
story2.story = { name: 'All knobs' };

export const story3 = () => ({
  view: () => text('Rendered string', '<img src=x onerror="alert(\'XSS Attack\')" >'),
});
story3.story = { name: 'XSS safety' };
