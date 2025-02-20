import React, { FunctionComponent } from 'react';

import { parseKind } from '@storybook/router';
import { DocsPage as PureDocsPage, PropsTable, PropsTableProps } from '@storybook/components';
import { H2, H3 } from '@storybook/components/html';
import { DocsContext } from './DocsContext';
import { Description } from './Description';
import { Story } from './Story';
import { Preview } from './Preview';
import { Anchor } from './Anchor';
import { getPropsTableProps } from './Props';

export interface SlotContext {
  id?: string;
  selectedKind?: string;
  selectedStory?: string;
  parameters?: any;
  storyStore?: any;
}

export type StringSlot = (context: SlotContext) => string | void;
export type PropsSlot = (context: SlotContext) => PropsTableProps | void;
export type StorySlot = (stories: StoryData[], context: SlotContext) => DocsStoryProps | void;
export type StoriesSlot = (stories: StoryData[], context: SlotContext) => DocsStoryProps[] | void;

export interface DocsPageProps {
  titleSlot: StringSlot;
  subtitleSlot: StringSlot;
  descriptionSlot: StringSlot;
  primarySlot: StorySlot;
  propsSlot: PropsSlot;
  storiesSlot: StoriesSlot;
}

interface DocsStoryProps {
  id: string;
  name: string;
  expanded?: boolean;
  withToolbar?: boolean;
  parameters?: any;
}

interface StoryData {
  id: string;
  kind: string;
  name: string;
  parameters?: any;
}

export const defaultTitleSlot: StringSlot = ({ selectedKind, parameters }) => {
  const {
    showRoots,
    hierarchyRootSeparator: rootSeparator,
    hierarchySeparator: groupSeparator,
  } = (parameters && parameters.options) || {
    showRoots: undefined,
    hierarchyRootSeparator: '|',
    hierarchySeparator: /\/|\./,
  };

  let groups;
  if (typeof showRoots !== 'undefined') {
    groups = selectedKind.split('/');
  } else {
    // This covers off all the remaining cases:
    //   - If the separators were set above, we should use them
    //   - If they weren't set, we should only should use the old defaults if the kind contains '.' or '|',
    //     which for this particular splitting is the only case in which it actually matters.
    ({ groups } = parseKind(selectedKind, { rootSeparator, groupSeparator }));
  }

  return (groups && groups[groups.length - 1]) || selectedKind;
};

const defaultSubtitleSlot: StringSlot = ({ parameters }) =>
  parameters && parameters.componentSubtitle;

const defaultPropsSlot: PropsSlot = context => getPropsTableProps({ of: '.' }, context);

const defaultDescriptionSlot: StringSlot = ({ parameters }) => {
  const { component, docs } = parameters;
  if (!component) {
    return null;
  }
  const { extractComponentDescription } = docs || {};
  return extractComponentDescription && extractComponentDescription(component, parameters);
};

const defaultPrimarySlot: StorySlot = stories => stories && stories[0];
const defaultStoriesSlot: StoriesSlot = stories => {
  if (stories && stories.length > 1) {
    const [first, ...rest] = stories;
    return rest;
  }
  return null;
};

const StoriesHeading = H2;
const StoryHeading = H3;

const DocsStory: FunctionComponent<DocsStoryProps> = ({
  id,
  name,
  expanded = true,
  withToolbar = false,
  parameters,
}) => (
  <Anchor storyId={id}>
    {expanded && <StoryHeading>{name}</StoryHeading>}
    {expanded && parameters && parameters.docs && parameters.docs.storyDescription && (
      <Description markdown={parameters.docs.storyDescription} />
    )}
    <Preview withToolbar={withToolbar}>
      <Story id={id} />
    </Preview>
  </Anchor>
);

export const DocsPage: FunctionComponent<DocsPageProps> = ({
  titleSlot = defaultTitleSlot,
  subtitleSlot = defaultSubtitleSlot,
  descriptionSlot = defaultDescriptionSlot,
  primarySlot = defaultPrimarySlot,
  propsSlot = defaultPropsSlot,
  storiesSlot = defaultStoriesSlot,
}) => (
  <DocsContext.Consumer>
    {context => {
      const title = titleSlot(context) || '';
      const subtitle = subtitleSlot(context) || '';
      const description = descriptionSlot(context) || '';
      const propsTableProps = propsSlot(context);

      const { selectedKind, storyStore } = context;
      const componentStories = storyStore
        .getStoriesForKind(selectedKind)
        .filter((s: any) => !(s.parameters && s.parameters.docs && s.parameters.docs.disable));
      const primary = primarySlot(componentStories, context);
      const stories = storiesSlot(componentStories, context);

      return (
        <PureDocsPage title={title} subtitle={subtitle}>
          <Description markdown={description} />
          {primary && <DocsStory key={primary.id} {...primary} expanded={false} withToolbar />}
          {propsTableProps && <PropsTable {...propsTableProps} />}
          {stories && stories.length > 0 && <StoriesHeading>Stories</StoriesHeading>}
          {stories &&
            stories.map(story => story && <DocsStory key={story.id} {...story} expanded />)}
        </PureDocsPage>
      );
    }}
  </DocsContext.Consumer>
);
