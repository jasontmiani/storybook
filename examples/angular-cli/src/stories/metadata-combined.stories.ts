import { moduleMetadata } from '@storybook/angular';
import { TokenComponent, ITEMS, DEFAULT_NAME } from './moduleMetadata/token.component';
import { CustomPipePipe } from './moduleMetadata/custom.pipe';

export default {
  title: 'Metadata/Combined',
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [TokenComponent],
      providers: [
        {
          provide: ITEMS,
          useValue: ['Joe', 'Jane'],
        },
        {
          provide: DEFAULT_NAME,
          useValue: 'Provider Name',
        },
      ],
    }),
  ],
};

export const combined1 = () => ({
  template: `<storybook-simple-token-component [name]="name"></storybook-simple-token-component>`,
  props: {
    name: 'Prop Name',
  },
});

combined1.story = {
  name: 'Combined 1',
};

export const combined2 = () => ({
  template: `<storybook-simple-token-component [name]="name | customPipe"></storybook-simple-token-component>`,
  props: {
    name: 'Prop Name',
  },
  moduleMetadata: {
    declarations: [CustomPipePipe],
  },
});

combined2.story = {
  name: 'Combined 2',
};
