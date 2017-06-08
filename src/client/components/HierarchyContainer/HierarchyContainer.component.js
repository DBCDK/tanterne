/**
 * @file
 * This implements this DK5 Hierarchy
 */

import React from 'react';
import {SearchFieldComponent} from '../SearchField/SearchField.component';
import {wrapper} from '../../state/state';
import {ToggleButton, ToggleContainer, ToggleContent} from '../General/toggle.component';
import {Layout} from '../General/layout.component';
import {CartButton} from '../Cart/CartButton.component';
import {TopbarCartItem} from '../Cart/TopbarCartItem.component';
import Link from '../Link';
import {Spinner} from '../General/spinner.component';
import * as client from '../../state/client';

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

function parseDescriptiveText(text) {
  return text.replace(/<dk>([^<]*)<\/dk>/g, (match, index) => {
    return `
     <a href="#!/hierarchy/${index}">
      ${index}
    </a>`;
  });
}

/**
 * Description of Hierarchy element
 *
 * @constructor
 */
function HierarchyElementDescription({description}) {
  const parsedText = parseDescriptiveText(description);
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
function HierarchyElement({topics, description = '', pro = false, noteSystematic = '', noteSystematicHistoric = ''}) {
  const renderedTopics = getRenderedTopics(topics);

  return (
    <div className="hierarchy-el">
      {description && <HierarchyElementDescription description={description}/>}
      {pro && <div className={'historic-note'} dangerouslySetInnerHTML={{__html: parseDescriptiveText(noteSystematicHistoric)}} />}
      {pro && <div className={'systematic-note'} dangerouslySetInnerHTML={{__html: parseDescriptiveText(noteSystematic)}} />}
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
  const {index, title, decommissioned, hasChildren, children, items, note, noteSystematic, noteSystematicHistoric} = hierarchy;
  const isSelected = selected === index;

  let contains = children;
  if (contains && contains.length && contains[0].selected) {
    contains = contains[0].items;
  }

  const cartButton = level >= 2 && pro ? <CartButton {...{index, cart}} /> : null;
  const infoChildren = pro & hasChildren ? 'hasChildren' : '';
  const infoDecommissioned = pro & decommissioned ? 'decommissioned' : '';
  const link_82_88 = pro && isSelected && index === '82-88' ? <Link to={`/help`}><span className='dk5'> Se till&aelig;gstal</span></Link> : null;

  return (
    <div className={`hierarchy-level level level-${level}`}>
      <div className={`level rel ${isSelected && 'selected' || ''}`}>
        <Header className={`${isSelected && 'hierarchy-level--header' || ''}`}>
          {cartButton}
          <Link to={`/hierarchy/${index}`}>
            <span className={`dk5 ${infoDecommissioned} ${infoChildren}`}>{index}</span>
            <span className="name">{title}</span>
            {isSelected && !contains && <div className="hierarchy-spinner">{<Spinner size="small-light"/>}</div>}
          </Link>
          {link_82_88}
        </Header>
        {isSelected && items && <HierarchyElement
          topics={items}
          description={note}
          pro={pro}
          noteSystematic={noteSystematic}
          noteSystematicHistoric={noteSystematicHistoric}
        />}
        {selected && contains && contains.map(el => <HierarchyLevel key={level.index} {...{
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

/**
 * Hierarchy container component.
 *
 * @param hierarchy
 * @param globalState
 * @returns {XML}
 * @constructor
 */
class HierarchyContainerComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      parentIndexes: {}
    };
  }

  componentDidMount() {
    this.props.globalState.getHierarchy(this.props.params.id || '00-07');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.globalState.getHierarchy(nextProps.params.id);
    }
  }

  getParent(child) {
    let parent = null;
    if (!child) {
      return parent;
    }

    if (this.state.parentIndexes.hasOwnProperty(child)) {
      parent = this.state.parentIndexes[child];
    }
    else {
      client
        .list(child)
        .then((result) => {
          const parentIndexes = Object.assign(this.state.parentIndexes, {});
          if (result[child].hasOwnProperty('parentIndex')) {
            parentIndexes[child] = result[child].parentIndex;
          }
          else {
            parentIndexes[child] = null;
          }
          this.setState({parentIndexes: parentIndexes});
        })
        .catch();
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

    const params = this.props.params || {};
    const searchField = (
      <SearchFieldComponent
        search={this.props.search}
        suggest={this.props.suggest}
        params={params}
        pro={this.props.pro}
      />
    );

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
        {this.props.pro &&
        <span className="hierarchy--navbar--cart">
          <TopbarCartItem cart={this.props.cart}/>
        </span>
        }
      </div>
    ) : null;

    return (
      <div className={`hierarchy container ${Object.keys(this.props.cart.contents).length ? 'show-cart' : ''}`}>
        {navbar}
        {this.props.pro && searchField}
        <div className="hierarchy-display">
          {elements.map(level => (
            <HierarchyLevel key={level.index} {...{
              hierarchy: level,
              key: level.index,
              Header: 'h1',
              selected: level.query ? level.query : this.props.params.id,
              pro: this.props.pro,
              cart: this.props.cart
            }} />
          ))}
        </div>
      </div>
    );
  }
}

HierarchyContainerComponent.diplayName = 'Hierarchy';

export default wrapper(HierarchyContainerComponent, ['hierarchy']);
