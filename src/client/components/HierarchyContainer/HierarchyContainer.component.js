/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React from 'react';
import {wrapper} from '../../state/state';
import {ToggleButton, ToggleContainer, ToggleContent} from '../General/toggle.component';
import {Layout} from '../General/layout.component';


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
function HierarchyElement({topics, description}) {

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
  const {dk5, name, contains, data, isSelected} = hierarchy;
  return (
    <div className={`hierarchy-level rel ${isSelected && 'selected' || ''}`}>
      <h2>
        <span className="name">{name}</span>
        <span className="dk5">{dk5}</span>
      </h2>
      {contains && contains.map(el => <HierarchyLevel {...{hierarchy: el, key: el.dk5}} />) }
      {data && <HierarchyElement {...data} />}
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
function HierarchyContainerComponent({hierarchy = []}) {
  return (
    <div className="hierarchy container">
      <h1>Geografi og rejser. Lokalhistorie <span className="dk5 blue">40-49</span></h1>
      {hierarchy.map(el => <HierarchyLevel {...{hierarchy: el, key: el.dk5}} />)}
    </div>
  );
}

HierarchyContainerComponent.diplayName = 'Hierarchy';

export default wrapper(HierarchyContainerComponent, ['hierarchy']);
