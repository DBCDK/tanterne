/**
 * @file
 * Help container
 */

import React, {Component} from 'react';

export class HelpContainerComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='help--container'>
        <div className="section-head">
          DK5 - Decimalklassedeling
        </div>
        <div className="section">
          DK5 er det f&aelig;lles opstillings- og klassifikationssystem for de danske folke- og skolebiblioteker.
        </div>
        <div className="section">
          DK betyder decimalklassedeling eller DecimalKlassifikation, og DK5 er inddelt i ti hovedgrupper.
          Hovedgrupperne er underdelt i op til ti grupper, som igen kan underinddeles i op til ti grupper og s&aring; videre.
          Hertil kommer s&aelig;rlige regler for underdeling, fx geografisk, geografisk-topografisk, sproglig, eller efter biograferede personers navne.
        </div>
        <div className="section">
          De 10 hovedgrupper grupperer sig p&aring; f&oslash;lgende m&aring;de:
        </div>
        <div className="section">
          <ul>
            <li><a href="#!/hierarchy/00-07">00-07</a></li>V&aelig;rker af almindeligt og blandet indhold<br />
            <li><a href="#!/hierarchy/10-19">10-19</a></li>Filosofi. Psykologi. Videnskab og forskning<br />
            <li><a href="#!/hierarchy/20-29">20-29</a></li>Religion<br />
            <li><a href="#!/hierarchy/30-39">30-39</a></li>Samfundsvidenskab. P&aelig;dagogik. Folkeliv<br />
            <li><a href="#!/hierarchy/40-49">40-49</a></li>Geografi og rejser<br />
            <li><a href="#!/hierarchy/50-59">50-59</a></li>Naturvidenskab og matematik<br />
            <li><a href="#!/hierarchy/60-69">60-69</a></li>Praktiske fag<br />
            <li><a href="#!/hierarchy/70-79">70-79</a></li>Kunst. Teater. Film. Musik. Spil. Idr&aelig;t<br />
            <li><a href="#!/hierarchy/80-89">80-89</a></li>Litteratur. Sprog<br />
            <li><a href="#!/hierarchy/90-99">90-99</a></li>Historie<br />
          </ul>
        </div>
        <div className="section">
          DK5 er et hierarkisk opbygget system (et enumerativt klassifikationssystem), som vedligeholdes af Dansk Biblioteks Center as
        </div>
      </div>
    );
  }
}

HelpContainerComponent.displayName = 'Help';
