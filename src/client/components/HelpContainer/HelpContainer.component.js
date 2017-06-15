/**
 * @file
 * Help container
 */

import React, {Component} from 'react';

export class HelpContainerComponent extends Component {
  tips() {
    return (
      <div className='help-chapter--container'>
        <a name="tips"/>
        <div className="section-head">
          Tips til søgning
        </div>
        <div className="section">
          Her kan du finde emners placering på hylderne på biblioteket.
          Når du søger, får du vist søgeordets placering i det emnesystem, der hedder DK5 – et nummersystem, man bruger til opstilling på bibliotekerne.
        </div>
        <div className="section">
          Når du skriver et ord i søgefeltet, får du vist en liste med forslag til ord, der matcher det du søger på.
        </div>
        <div className="section">
          Forslagene er de mest populære søgninger og står ikke nødvendigvis i alfabetisk orden.
        </div>
        <div className="section">
          <img src="/tips_1.png"/>
        </div>
        <div className="section">
          Når du vælger et af ordene, får du vist det emnenummer, som emnet hører til og som svarer til placeringen på hylden.
        </div>
        <div className="section">
          <img src="/tips_2.png"/>
        </div>
        <div className="section">
          Hvis du i eksemplet vælger Italien, får du vist emner, der handler om Italien.
          Så hvis du vil læse om italiensk arkitekturhistorie, skal du finde den hylde, hvor 71.775 hører til.
        </div>
        <div className="section">
          Du kan også søge videre ved at klikke på 71.775. Så får du vist hvor i systemet 71.775 findes og de emner, der ligger tæt på italiensk arkitekturhistorie:
        </div>
        <div className="section">
          <img src="/tips_3.png"/>
        </div>
        <div className="section-head">
          Søg bredt
        </div>
        <div className="section">
          Hvis du skriver flere ord, der ikke findes i sammenhæng, kommer der forslag på det mest oplagte alternativ.
          Du kan dog også vælge at fortsætte søgningen ved at søge på det du skrev først.
        </div>
        <div className="section">
          Hvis du søger på japansk kunst, får du denne besked:
        </div>
        <div className="section">
          <b>Din søgning gav ikke nogle resultater, vi har i stedet søgt på fajancekunst. Hvis du vil prøve din søgning alligevel klik her!</b>
        </div>
        <div className="section">
          Prøv i stedet at søge bredere. Skriv japan i søgefeltet og se, om du kan bruge et af de forslag du får vist.
        </div>
        <div className="section-head">
          Ingen sammenhæng til bibliotekets system
        </div>
        <div className="section">
          DK5 er ikke integreret til dit biblioteks system.
          Så du kan altså ikke via DK5 se, hvilke materialer der er på hylden i dit bibliotek.
          Du kan bruge DK5 til at finde det rigtige tal, så du kan søge præcist på hylderne eller i bibliotekets hjemmeside.
        </div>
      </div>
    );
  }
  proHelp() {
    return (
      <div className='help-chapter--container'>
        <a name="supplNumbers"/>
        <div className="section-head">
          DK5 - Till&aelig;gstal
        </div>
        <div className="section">
          Dansk bogfortegnelse anvender ved underdeling af sk&oslash;nlitteraturen et system af till&aelig;gstal,
          som adskilles fra det egentlige klassem&aelig;rke ved en bindestreg.
          Disse tal bruges i stedet for decimalerne 1 og 2,
          hvis anvendelse i decimalklassedelingen er beskrevet i noten til 82-88.
          Till&aelig;gstallene vil ogs&aring; kunne finde anvendelse ved anden bibliografisk systematik over sk&oslash;nlitteratur.
        </div>
        <div className="section">
          <i>Till&aelig;gstallene for sk&oslash;nlitteratur</i> best&aring;r af mindst to cifre,
          hvoraf det f&oslash;rste angiver publiceringssproget,
          og det sidste dels angiver digtarten,
          dels markerer antologiform.
          For b&oslash;rne- og ungdomslitteraturens vedkomne indskydes mellem 1. og 2. ciffer et 9-tal, der markerer m&aring;lgruppen.
        </div>
        <div className="section">
          1. <i>ciffer</i> tildeles efter nedenst&aring;ende tabel:
          <div><div className="bullet">0</div>Skrifter p&aring; originalsproget</div>
          <div><div className="bullet">1</div>Skrifter oversat til fremmesprog</div>
          <div><div className="bullet">2</div>Skrifter oversat til dansk</div>
        </div>
        <div className="section">
          2. <i>ciffer</i> tildeles efter nedenst&aring;ende tabel:
          <div><div className="bullet">0</div>Digte. Antologier</div>
          <div><div className="bullet">1</div>Digte. V&aelig;rker af enkelte forfattere
            <div className="note">
              Till&aelig;gstalene 0 og 1 omfatter ikke epsisk og dramatisk litteratur p&aring; vers.
              Kortere fort&aelig;llende digte placeres dog i formgrupperne 0 og 1.
            </div>
          </div>
          <div><div className="bullet">2</div>Skuespil. Antologier</div>
          <div><div className="bullet">3</div>Skuespil. V&aelig;rker af enkelte forfattere</div>
          <div><div className="bullet">4</div>Romaner og noveller. Antologier
            <div className="note">
              Her anbringes ogs&aring; antologier, sammensat af forskellige digtarter<br />
              I grupperne 86 og 88 placerer Dansk bogfortegnelse l&aelig;seb&oslash;ger og prosaantologier til
              skolebrug i en undergruppe med till&aelig;gstallet -046 eller -246.
              Andre skoleudgaver af sk&oslash;nlitteratur placeres som tilsvarende almindelige udgaver.
            </div>
         </div>
         <div><div className="bullet">5</div>Romaner og noveller f&oslash;r 1901. V&aelig;rker af enkelte forfattere</div>
         <div><div className="bullet">6</div>Romaner og noveller fra 1901. V&aelig;rker af enkelte forfattere</div>
         <div><div className="bullet">7</div>Humor, tegneserier etc. Antologier
           <div className="note">
             Her anbringes samlinger af vittigheder og humoristiske sm&aring;stykker.
           </div>
         </div>
         <div><div className="bullet">8</div>Humor, tegneserier etc. af enkelte forfattere</div>
         <div><div className="bullet">9</div>B&oslash;rne- og ungdomsb&oslash;ger</div>
         <div><div className="bullet">90</div>Digte for b&oslash;rn. Antologier</div>
         <div><div className="bullet">91</div>Digte for b&oslash;rn. Enkelte forfattere</div>
         <div><div className="bullet">92</div>B&oslash;rnekomedier. Antologier</div>
         <div><div className="bullet">93</div>B&oslash;rnekomedier. Enkelte forfattere</div>
         <div><div className="bullet">94</div>Fort&aelig;llinger for b&oslash;rn. Antologier
           <div className="note">
             Her anbringes ogs&aring; antologier sammensat af forskellige digtarter.
           </div>
         </div>
         <div><div className="bullet">96</div>Fort&aelig;llinger for b&oslash;rn. Enkelte forfattere</div>
         <div><div className="bullet">97</div>Humor, tegneserier etc. for b&oslash;rn. Antologier</div>
         <div><div className="bullet">98</div>Humor, tegneserier etc. for b&oslash;rn. Enkelte forfattere</div>
        </div>
        <div className="section">
          Systemet med till&aelig;gstal, anbragt efter en streg,
          anvendes ogs&aring; i visse faglitter&aelig;re grupper for at markere en for Dansk bogfortegnelse speciel supplerende underdeling.
        </div>
        <div className="section">
          <i>Faglitteratur &mdash; Till&aelig;gstal med fast betydning</i>
          <div><div className="bullet">-6</div>Skole- og l&aelig;reb&oslash;ger (inkl. opgavesamlinger)
            <div className="note">
              Bruges i 51.3, 86-04 og 88-24.
            </div>
          </div>
          <div><div className="bullet">-61</div>Almindelige l&aelig;reb&oslash;ger, l&aelig;seb&oslash;ger
            <div className="note">
              Bruges i 89.2, 89.3 og 89.4.
            </div>
          </div>
          <div><div className="bullet">-62</div>&Oslash;velser og opgaver
            <div className="note">
              Bruges i 89.2, 89.3 og 89.4.
            </div>
          </div>
          <div><div className="bullet">-65</div>L&aelig;reb&oslash;ger (inkl. opgavesamlinger) for folkeskolen</div>
          <div><div className="bullet">-66</div>Andre skole- og l&aelig;reb&oslash;ger (inkl. opgavesamlinger)
            <div className="note">
              -65 og -66 bruger i 40, 51, 51.1, 51.5, 51.8, 53, 54, 56 og 90,
            </div>
          </div>
          <div><div className="bullet">-8</div>Udgaver for b&oslash;rn
            <div className="note">
              Bruges i 39.12 og 88.99
            </div>
          </div>
          <div><div className="bullet">-99</div>Enkeltbiografier
            <div className="note">
              Bruges i alle grupper undtagen de alfabetisk (herunder de geografisk-topografisk) underdelte.
              Underdeles alfabetisk efter den biograferede persones navn.
            </div>
          </div>
        </div>
        <div className="section">
          <i>Faglitteratur &mdash; Till&aelig;gstal med varierende betydning</i>
          <div><div className="bullet">46.4-0</div>Sj&aelig;lland og M&oslash;n</div>
          <div><div className="bullet">46.4-1</div>Sams&oslash;</div>
          <div><div className="bullet">46.4-2</div>Lolland-Falster</div>
          <div><div className="bullet">46.4-3</div>Bronholm</div>
          <div><div className="bullet">46.4-4</div>Fyn og de fynske &oslash;er</div>
          <div><div className="bullet">46.4-5</div>Jylland</div>
        </div>
        <div className="section">
          <div><div className="bullet">72-5</div>Humoristiske og satiriske tegninger af enkelte kunstnere.</div>
        </div>
      </div>);
  }

  generel() {
    return (
      <div className="help-generel--container">
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

  render() {
    return (
      <div className='help--container'>
        {this.tips()}
        {this.props.pro && this.proHelp()}
        {this.generel()}
      </div>
    );
  }
}

HelpContainerComponent.displayName = 'Help';
