/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React from 'react';
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
      {topics.map(({title}) => <li key={title} >{title}</li>) }
    </ul>
  );
}

/**
 * Description of Hierarchy element
 *
 * @constructor
 */
function HierarchyElementDescription({description}) {
  return (
    <div className="hierarchy-description">
      <ToggleContainer>
        <Layout className="pa2 abs pos-top pos-right">
          <ToggleButton showText="Se beskrivelse" hideText="Skjul beskrivelse"/>
        </Layout>
        <ToggleContent>
          {description}
        </ToggleContent>
      </ToggleContainer>
    </div>
  );
}

/**
 * The currently selected hierarchy element
 *
 * @constructor
 */
function HierarchyElement({topics, description= ''}) {
  return (
    <div className="hierarchy-el">
      <HierarchyElementDescription description={description}/>
      <HierarchyElementTopics topics={topics}/>
    </div>
  );

}

/**
 * Level in the hierarchy
 *
 * @constructor
 */
function HierarchyLevel({hierarchy, Header = 'h2', selected}) {
  const {index, title, children, items} = hierarchy;
  const isSelected = selected === index;

  let contains = children;
  if (contains && contains.length && contains[0].selected) {
    contains = contains[0].items;
  }

  return (
    <div className="hierarchy-level">
      <div className={`rel ${isSelected && 'selected' || ''}`}>
        <Header>
          <span className="name">{title}</span>
          <span className="dk5">
             <Link to={`/hierarchy/${index}`}>
               {index}
             </Link>
            </span>
        </Header>
        {items && <HierarchyElement topics={items}/>}
      </div>
      {contains && contains.map(el => <HierarchyLevel {...{hierarchy: el, key: el.index, selected}} />)}
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
export default class HierarchyContainerComponent extends React.Component {
  componentDidMount() {
    this.props.globalState.getHierarchy(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.globalState.getHierarchy(nextProps.params.id);
    }
  }

  render() {
    const {hierarchy} = this.props.globalState.getState(['hierarchy']);
    return (
      <div className="hierarchy container">
        <HierarchyLevel {...{hierarchy, key: hierarchy.index, Header: 'h1', selected: this.props.params.id}} />
      </div>
    );
  }
}

HierarchyContainerComponent.diplayName = 'Hierarchy';
