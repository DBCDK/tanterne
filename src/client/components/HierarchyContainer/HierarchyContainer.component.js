/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React from 'react';
import {wrapper} from '../../state/state';
import {ToggleButton, ToggleContainer, ToggleContent} from '../General/toggle.component';
import {Layout} from '../General/layout.component';
import Link from '../Link';

/**
 * Topics in Hierarchy element
 *
 * @constructor
 */
function HierarchyElementTopics({topics}) {
  return (
    <ul className="hierarchy-topics">
      {topics.map(({title, note}) => {
        if (note) {
          const parsedNote = {};
          parsedNote.__html = ' - ' + note.replace(/<dk>([^<]*)<\/dk>/g, (match, index) => {
            return `<a href="#!/hierarchy/${index}">${index}</a>`;
          });
          return <li key={title}>{title} <div className="note" dangerouslySetInnerHTML={parsedNote} /></li>;
        }
        return <li key={title}>{title}</li>;
      })}
    </ul>
  );
}

/**
 * Description of Hierarchy element
 *
 * @constructor
 */
function HierarchyElementDescription({description}) {
  const parsedText = description.replace(/<dk>([^<]*)<\/dk>/g, (match, index) => {
    return `
     <a href="#!/hierarchy/${index}">
      ${index}
    </a>`;
  });
  return (
    <div className="hierarchy-description">
      <ToggleContainer>
        <Layout className="pa2 abs pos-top pos-right">
          <ToggleButton showText="Se beskrivelse" hideText="Skjul beskrivelse"/>
        </Layout>
        <ToggleContent className="content" __html={parsedText}/>
      </ToggleContainer>
    </div>
  );
}

/**
 * The currently selected hierarchy element
 *
 * @constructor
 */
function HierarchyElement({topics, description = ''}) {
  return (
    <div className="hierarchy-el">
      {description && <HierarchyElementDescription description={description}/>}
      {topics && <HierarchyElementTopics topics={topics}/>}
    </div>
  );

}

/**
 * Level in the hierarchy
 *
 * @constructor
 */
function HierarchyLevel({hierarchy, Header = 'h2', level=1, selected}) {
  const {index, title, children, items, note} = hierarchy;
  const isSelected = selected === index;

  let contains = children;
  if (contains && contains.length && contains[0].selected) {
    contains = contains[0].items;
  }

  return (
    <div className={`hierarchy-level level-${level}`}>
      <div className={`level rel ${isSelected && 'selected' || ''}`}>
        <Header>
          <Link to={`/hierarchy/${index}`}>
            <span className="name">{title}</span>
          <span className="dk5">
               {index}
            </span>
          </Link>
        </Header>
        {isSelected && items && <HierarchyElement topics={items} description={note}/>}
        {selected && contains && contains.map(el => <HierarchyLevel {...{
          hierarchy: el,
          key: el.index,
          selected,
          level: level + 1
        }} />)}
      </div>
    </div>
  );
}

/**
 * Hierarchy container component.
 *
 * @param hierarchy
 * @param globalState
 * @returns {XML}
 * @constructor
 */
class HierarchyContainerComponent extends React.Component {
  componentDidMount() {
    this.props.globalState.getHierarchy(this.props.params.id || '00-07');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.globalState.getHierarchy(nextProps.params.id);
    }
  }

  render() {
    const {hierarchy} = this.props;

    // If selected is a top level hierarchy split items to different levels
    // else show hierarchy as one level
    let elements = hierarchy.items || [hierarchy];

    return (
      <div className="hierarchy container">
        {elements.map(level => (
          <HierarchyLevel {...{hierarchy: level, key: level.index, Header: 'h1', selected: this.props.params.id}} />
        ))}
      </div>
    );
  }
}

HierarchyContainerComponent.diplayName = 'Hierarchy';

export default wrapper(HierarchyContainerComponent, ['hierarchy']);
