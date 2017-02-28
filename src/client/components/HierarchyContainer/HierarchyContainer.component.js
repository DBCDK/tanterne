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
function HierarchyLevel({hierarchy}) {
  const {index, title, children, items} = hierarchy;

  let contains = children;
  if (contains && contains.length && contains[0].selected) {
    contains = contains[0].items;
  }
  let isSelected = false;
  if (index === '48.1') {
    isSelected = true;
  }

  return (
    <div className="hierarchy-level">
      <div className={`rel ${isSelected && 'selected' || ''}`}>
        <h2>
          <span className="name">{title}</span>
          <span className="dk5">
             <Link to={`/hierarchy/${index}`}>
               {index}
             </Link>
            </span>
        </h2>
        {items && <HierarchyElement topics={items}/>}
      </div>
      {contains && contains.map(el => <HierarchyLevel {...{hierarchy: el, key: el.index}} />)}
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
    this.props.globalState.getHierarchy(this.props.params.id);
  }

  render() {
    const {hierarchy} = this.props;
    const children = hierarchy.children || [];
    return (
      <div className="hierarchy container">
        <h1>Geografi og rejser. Lokalhistorie <span className="dk5 blue">40-49</span></h1>
        {children.map(el => <HierarchyLevel {...{hierarchy: el, key: el.index}} />)}
      </div>
    );
  }
}

HierarchyContainerComponent.diplayName = 'Hierarchy';

export default wrapper(HierarchyContainerComponent, ['hierarchy']);
