/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React, {Component} from 'react';

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

const hierarchyMock = [{
  name: 'Andre verdensdele',
  dk5: '48',
  contains: [
    {
      name: 'Asien',
      dk5: '48.1',
      contains: [
        {
          name: 'Sydasien',
          dk5: '48.23',
          contains: [
            {
              name: 'Indien',
              dk5: '48.231',
              isSelected: true,
              data: {
                description: 'This is a description',
                topics: ['Andemanerne', 'Bengalen', 'Ganges', 'Goa', 'Kashmir', 'Laccadiverne']
              }
            },
            {
              name: 'Bangladesh',
              dk5: '48.233'
            },
            {
              name: 'Bhutan',
              dk5: '48.235'
            },
            {
              name: 'Maldiverne',
              dk5: '48.238'
            },
          ]
        }
      ]
    }]
}];

/**
 * Level in the hierarchy
 *
 * @constructor
 */
function HierarchyLevel({hierarchy}) {
  const {dk5, name, contains, data, isSelected} = hierarchy;
  return (
    <div className={`hierarchy-level ${isSelected && 'selected' || ''}`}>
      <span className="name">{name}</span>
      <span className="dk5">({dk5})</span>
      {contains && contains.map(el => <HierarchyLevel {...{hierarchy: el, key: el.dk5}} />) }
      {data && <HierarchyElement {...data} />}
    </div>
  )
}

export function HierarchyContainerComponent() {
  const hierarchy = hierarchyMock;
  return (
    <div>
      {hierarchy.map(el => <HierarchyLevel {...{hierarchy: el, key: el.dk5}} />)}
    </div>
  );

}

HierarchyContainerComponent.diplayName = 'Hierarchy';
