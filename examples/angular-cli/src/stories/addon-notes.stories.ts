import { Button } from '@storybook/angular/demo';

export default {
  title: 'Addon/Notes',
};

export const simpleNote = () => ({
  component: Button,
  props: {
    text: 'Notes on some Button',
    onClick: () => {},
  },
});

simpleNote.story = {
  name: 'Simple note',
  parameters: { notes: 'My notes on some button' },
};

export const noteWithHtml = () => ({
  component: Button,
  props: {
    text: 'Notes with HTML',
    onClick: () => {},
  },
});

noteWithHtml.story = {
  name: 'Note with HTML',
  parameters: {
    notes: `
    <h2>My notes on emojis</h2>

    <em>It's not all that important to be honest, but..</em>

    Emojis are great, I love emojis, in fact I like using them in my Component notes too! 😇
  `,
  },
};
