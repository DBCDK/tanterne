/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React, {Component} from 'react';
import {wrapper} from '../../state/state';

/**
 * Topics in Hierarchy element
 *
 * @constructor
 */
function HierarchyElementTopics({topics}) {
  return (
    <ul className="hierarchy-topics">
      {topics.map(topic => <li>{topic}</li>) }
    </ul>
  );
}

/**
 * The currently selected hierarchy element
 *
 * @constructor
 */
function HierarchyElement({topics, description}) {

  return (
    <div class="hierarchy-el">
      <div className="description">{description}</div>
      <HierarchyElementTopics topics={topics}/>
    </div>
  );

}

/**
 * Description of Hierarchy element
 *
 * @constructor
 */
function HierarchyElementDescription() {

}

/**
 * Level in the hierarchy
 *
 * @constructor
 */
function HierarchyLevel({hierarchy}) {
  const {dk5, name, contains, data, isSelected} = hierarchy;
  return (
    <div className={`hierarchy-level ${isSelected && 'selected' || ''}`}>
      <h2>
        <span className="name">{name}</span>
        <span className="dk5">{dk5}</span>
      </h2>
      {contains && contains.map(el => <HierarchyLevel {...{hierarchy: el, key: el.dk5}} />) }
      {data && <HierarchyElement {...data} />}
    </div>
  )
}

export function HierarchyContainerComponent({hierarchy = [], actions}) {
  return (
    <div className="hierarchy container" onClick={actions.getHierarchy}>
      <h1>Geografi og rejser. Lokalhistorie <span className="dk5 blue">40-49</span></h1>
      {hierarchy.map(el => <HierarchyLevel {...{hierarchy: el, key: el.dk5}} />)}
    </div>
  );
}

HierarchyContainerComponent.diplayName = 'Hierarchy';

export default wrapper(HierarchyContainerComponent, ['hierarchy']);
