/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React, {Component} from 'react';

/**
 * Level in the hierarchy
 *
 * @constructor
 */
function HierarchyLevel() {

}

/**
 * The currently selected hierarchy element
 *
 * @constructor
 */
function HierarchyElement() {


}

/**
 * Description of Hierarchy element
 *
 * @constructor
 */
function HierarchyElementDescription() {


}

/**
 * Topics in Hierarchy element
 *
 * @constructor
 */
function HierarchyElementTopics() {


}


export class HierarchyContainerComponent extends Component {
  render() {
    return (
      <div>
        DK5 Hierarchy!
      </div>
    );
  }
}

HierarchyContainerComponent.diplayName = 'Hierarchy';
