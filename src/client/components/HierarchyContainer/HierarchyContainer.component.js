/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React from 'react';
import {wrapper} from '../../state/state';
import {ToggleButton, ToggleContainer, ToggleContent} from '../General/toggle.component';
import {Layout} from '../General/layout.component';
import Link from '../Link';
import {Spinner} from '../General/spinner.component';
import {Plus} from '../svg/svg.container';

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

          return (
            <li key={title}>
              <div className='title-note'><AspectTitleElement title={title}/>
                <div className="note" dangerouslySetInnerHTML={parsedNote}/>
              </div>
            </li>
          );
        }

        return (
          <li key={title}>
            <div className='title-note'><AspectTitleElement title={title}/></div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Aspect title made searchable
 *
 * @constructor
 */
function AspectTitleElement({title}) {
  return (<a href={`#!/search/${title}/10/0/relevance/dictionary`}>{title}</a>);
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

function getRenderedTopics(topics) {
  if (!topics || !topics.length) {
    return null;
  }

  let rendered = null;

  if (topics.length > 7) {
    rendered = (
      <div>
        <HierarchyElementTopics topics={topics.slice(0, 5)}/>
        <ToggleContainer show={false}>
          <ToggleContent content={<HierarchyElementTopics topics={topics.slice(5)}/>}/>
          <ToggleButton showText={`Vis alle (${topics.slice(5).length})`} hideText='Skjul'/>
        </ToggleContainer>
      </div>
    );
  }
  else {
    rendered = <HierarchyElementTopics topics={topics}/>;
  }

  return rendered;
}
/**
 * The currently selected hierarchy element
 *
 * @constructor
 */
function HierarchyElement({topics, description = ''}) {
  const renderedTopics = getRenderedTopics(topics);

  return (
    <div className="hierarchy-el">
      {description && <HierarchyElementDescription description={description}/>}
      {renderedTopics}
    </div>
  );
}

/**
 * Level in the hierarchy
 *
 * @constructor
 */
function HierarchyLevel({hierarchy, Header = 'h2', level = 1, selected, pro, cart}) {
  const {index, title, children, items, note} = hierarchy;
  const isSelected = selected === index;

  let contains = children;
  if (contains && contains.length && contains[0].selected) {
    contains = contains[0].items;
  }

  const cartButton = level >= 2 && pro ? <CartButton {...{index, cart}} /> : null;

  return (
    <div className={`hierarchy-level level level-${level}`}>
      <div className={`level rel ${isSelected && 'selected' || ''}`}>
        <Header className={`${isSelected && 'hierarchy-level--header' || ''}`}>
          <Link to={`/hierarchy/${index}`}>
            <span className="name">{title}</span>
            <span className="dk5">{index}</span>
            {isSelected && !contains && <div className="hierarchy-spinner">{<Spinner size="small"/>}</div>}
          </Link>
          {cartButton}
        </Header>
        {isSelected && items && <HierarchyElement topics={items} description={note}/>}
        {selected && contains && contains.map(el => <HierarchyLevel {...{
          hierarchy: el,
          key: el.index,
          selected,
          level: level + 1,
          pro,
          cart
        }} />)}
      </div>
    </div>
  );
}

function CartButton({index, cart}) {
  const inCart = Object.keys(cart.contents).includes(index);
  const tooltip = inCart ? 'Fjern fra kurv' : 'Tilføj til kurv';
  const inCartClass = inCart ? ' in-cart' : '';

  return (
    <span
      className={`add-or-remove-item${inCartClass}`}
      id={`cart-button-${index}`}
      onClick={cart.addOrRemoveContent.bind(this, {index: index})}
      title={tooltip}>
      <Plus />
    </span>
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

  getParent(child) {
    let parent = '';
    if (!child) {
      return parent;
    }

    if (child.includes('.')) {
      parent = child.split('.')[0];
    }
    else if (child) {
      parent = child !== this.props.hierarchy.index ? this.props.hierarchy.index : '';
    }

    return parent;
  }

  render() {
    const {hierarchy} = this.props;

    // If selected is a top level hierarchy split items to different levels
    // else show hierarchy as one level
    const elements = hierarchy.items || [hierarchy];

    const parentIndex = this.getParent(this.props.params.id);
    const navURL = parentIndex ? `#!/hierarchy/${parentIndex}` : '/';

    const navbar = this.props.params.id ? (
      <div className="hierarchy--navbar">
        <a href={navURL} className="hierarchy--navbar--href">
          <span className="hierarchy--navbar--button">
            &#60;
          </span>
        </a>
        <span className="hierarchy--navbar--title">
          {this.props.params.id}
          </span>
      </div>
    ) : null;

    return (
      <div className="hierarchy container">
        {navbar}
        {elements.map(level => (
          <HierarchyLevel {...{
            hierarchy: level,
            key: level.index,
            Header: 'h1',
            selected: this.props.params.id,
            pro: this.props.pro,
            cart: this.props.cart
          }} />
        ))}
      </div>
    );
  }
}

HierarchyContainerComponent.diplayName = 'Hierarchy';

export default wrapper(HierarchyContainerComponent, ['hierarchy']);
