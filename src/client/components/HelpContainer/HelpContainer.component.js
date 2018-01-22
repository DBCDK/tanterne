/**
 * @file
 * Help container
 */

import React, {Component} from 'react';
import Tabs from 'react-simpletabs';

export class HelpContainerComponent extends Component {
  princip() {
    return (
      <div className='help-chapter--container'>
        <a name="princip"/>
        <div className="section-head">
          Principper for DK5-udvikling
        </div>
        <div className="section">
          Vedtaget i Bibliografisk Råd, februar 2007
        </div>
        <div className="section">
          Bibliografisk Råd under Biblioteksstyrelsen har ansvaret for den overordnede prioritering af DK5’s udvikling.
          Den løbende redaktion af systemet varetages af den af Dansk BiblioteksCenter nedsatte DK5-redaktionsgruppe.
        </div>
        <div className="section">
          Der gælder følgende generelle principper for udviklingen af DK5:
        </div>
        <div className="sub-section-head">
          1. Systemets orden
        </div>
        <div className="section">
          DK5 er et aspektorienteret klassifikationssystem. De 100 hovedgrupper er underdelt efter decimalprincippet.
          Den primære underdeling i decimalklassedelingen sker efter discipliner og fag.
          Strukturen er i princippet hierarkisk i såvel notation som i grupperelationer.
        </div>
        <div className="section">
          Det er målet, at DK5’s systematik i videst muligt omfang afspejler det vidensunivers, der kommer til udtryk i den aktuelle danske publikationsmasse.
        </div>
        <div className="section">
          Målsætningen om aktualitet indebærer, at der løbende må kunne foretages revisioner i systemet og systemets terminologi med henblik på ajourføring i
          overensstemmelse med den faglige/samfundsmæssige udvikling.<br/>
          Der vil i et kontrolleret system dog altid være tale om en vis tilbageskuen i revisionsarbejdet.
        </div>
        <div className="sub-section-head">
          2. Specificitet
        </div>
        <div className="section">
          Generelt niveau:<br/>
          DK5’s specificitet udvikles, så den modsvarer behovet for findeling ved nationalbibliografisk registrering af fysiske materialer, som opstilles efter systemet.
        </div>
        <div className="section">
          Udviklingen af det generelle niveau for DK5 knytter sig med andre ord til dets funktion som opstillingssystem.
        </div>
        <div className="section">
          Øget specificitet på specielle områder:<br/>
          I det omfang, hvor der hos enkelte eller grupper af institutioner er behov for en findeling, der går videre end DK5’s generelle niveau,
          kan DK5-redaktionen være rådgivende ved udarbejdelse af vejledende underdelinger til systemet.
        </div>
        <div className="section">
          For de vejledende underdelinger gælder også, at de først og fremmest bør udarbejdes, hvis der af hensyn til materialernes opstilling er behov
         for yderligere findelinger af systemet
        </div>
        <div className="sub-section-head">
          3. Terminologi
        </div>
        <div className="section">
          Det tilstræbes, at terminologien i systemets grupper er præcis og i overensstemmelse med nutidig sprogbrug.
        </div>
      </div>);
  }

  greenland() {
    return (
      <div className='help-chapter--container'>
        <a name="kommisorium"/>
        <div className="section-head">
          Grønlandske stednavne
        </div>
        <div className="section">
          <i>Stednavne autoriseret af Nunat Aqquinik Aalajangiisartut (Grønlands Stednavnenævn)</i>
        </div>
        <div className="section col-3-newspaper">
          1. Qaanaap kommunia<br/>
          Qaanaaq<br/>
          Siorapaluk<br/>
          Qeqertarsuaq<br/>
          Qeqertat<br/>
          Moriusaq<br/>
          Pituffik<br/>
          Savissivik<br/>
          <br/>
          2. Kommuneqarfik Upernavik<br/>
          Upernavik<br/>
          Kullorsuaq<br/>
          Nuussuaq<br/>
          Nutaarmiut<br/>
          Tasiusaq<br/>
          Innaarsuit<br/>
          Naajaat<br/>
          Aappilattoq<br/>
          Kangersuatsiaq<br/>
          UpernavikKujalleq<br/>
          <br/>
          3. Uummannap kommunia<br/>
          Uummannaq<br/>
          Nuugaatsiaq<br/>
          Illorsuit<br/>
          Ukkusissat<br/>
          Saattut<br/>
          Ikerasak<br/>
          Qaarsut<br/>
          Niaqornat<br/>
          <br/>
          4. Ilulissat kommuniat<br/>
          Ilulissat<br/>
          Saqqaq<br/>
          Qeqertaq<br/>
          Oqaatsut<br/>
          Ilimanaq<br/>
          <br/>
          5. Qasigiannguit kommuniat<br/>
          Qasigiannguit<br/>
          Ikamiut<br/>
          <br/>
          6. Qeqertarsuup kommunia<br/>
          Qeqertarsuaq<br/>
          Kangerluk<br/>
          <br/>
          7. Kommuneqarfik Aasiaat<br/>
          Aasiaat<br/>
          Akunnaaq<br/>
          Kitsissuarsuit<br/>
          <br/>
          8. Kommuneqarfik Kangaatsiaq<br/>
          Kangaatsiaq<br/>
          Niaqornaarsuk<br/>
          Ikerasaarsuk<br/>
          Iginniarfik<br/>
          Attu<br/>
          <br/>
          9. Sisimiut kommuniat<br/>
          Sisimiut<br/>
          Sarfannguit<br/>
          Itilleq<br/>
          Kangerlussuaq<br/>
          <br/>
          10. Maniitsup kommunia<br/>
          Maniitsoq<br/>
          Kangaamiut<br/>
          Napasoq<br/>
          Atammik<br/>
          <br/>
          11. Nuup kommunia<br/>
          Nuuk<br/>
          Kapisillit<br/>
          Qeqertarsuatsiaat<br/>
          Nordafar<br/>
          Nuussuaq<br/>
          <br/>
          12. Paamiut kommuniat<br/>
          Paamiut<br/>
          Arsuk<br/>
          <br/>
          13. Ivittuut kommuniat<br/>
          Ivittuut<br/>
          Kangilinnguit<br/>
          <br/>
          14. Qaqortup kommunia<br/>
          Qaqortoq<br/>
          Qassimiut<br/>
          Eqalugaarsuit<br/>
          Saarloq<br/>
          Upernaviarsuk<br/>
          <br/>
          15. Narsap kommunia<br/>
          Narsaq<br/>
          Qassiarsuk<br/>
          Igaliku<br/>
          Narsarsuaq<br/>
          <br/>
          16. Nanortallip kommunia<br/>
          Nanortalik<br/>
          Ammassivik<br/>
          Alluitsoq<br/>
          AlluitsupPaa<br/>
          Tasiusaq<br/>
          NarsaqKujalleq<br/>
          Aappilattoq<br/>
          Qallimiut<br/>
          <br/>
          17. Ammassallip kommunia<br/>
          Tasiilaq<br/>
          Isortoq<br/>
          Ikkatteq<br/>
          Tiniteqilaaq<br/>
          Qernertuarsuit<br/>
          Kuummiut<br/>
          Sermiligaaq<br/>
          Kulusuk<br/>
          KapDan<br/>
          <br/>
          18. Illoqqortoormiut kommuniat<br/>
          Illoqqortoormiut<br/>
          Uunarteq<br/>
          Itterajivit<br/>
          NerleritInaat<br/>
          <br/>
          19. Stationit:<br/>
            Mestersvig<br/>
          Danmarkshavn<br/>
          Station Nord<br/>
          Brønlundsfjord<br/>
          Angisoq<br/>
          Prins Christians Sund<br/>
          Daneborg<br/>
          <br/>
          Oversigten er først udfærdiget den 11.11.1991.  I takt med ændringer i Grønlands kommunaleinddeling og kommunernes ændringer af egne betegnelser
          er rettelserne opdateret, sidst pr. 1. juni, 2000.<br/>
        </div>
      </div>);
  }
  kommisorium() {
    return (
      <div className='help-chapter--container'>
        <a name="kommisorium"/>
        <div className="section-head">
          Kommisorium
        </div>
        <div className="sub-section-head">
          Opgaver og formål
        </div>
        <div className="section">
          DK5-forum forestår udviklingen af DK5 i løbende og åben dialog med biblioteksansatte og brugere i hele landet.
          Bibliotekernes bevidsthed om muligheden for at have indflydelse på DK5 skal øges og deres lyst til at give input skal stimuleres.
        </div>
        <div className="section">
          DK5-forum lægger problemstillinger ud til debat og præsenterer løsningsforslag og løsninger på profblog.
        </div>
        <div className="section">
          DK5-forum skal endvidere formulere den principielle fortolkning af klassifi­kationssystemet.
        </div>
        <div className="section">
          DK5-forums årlige beretning og arbejdsplan forelægges for Bibliografisk Råd, der har det overordnede ansvar for DK5&apos;s udvikling.
        </div>
        <div className="sub-section-head">
          Sammensætning
        </div>
        <div className="section">
          DK5-forum består af i alt 4 medarbejdere fra de klassificerende team, hvoraf 1 er sekretær for gruppen.
          DK5-forum kan trække på DBC’s egne fagreferenter og eksterne specialister og interessenter ved udvikling inden for specifikke DK5-grupper.
        </div>
        <div className="sub-section-head">
          Arbejdsform
        </div>
        <div className="section">
          DK5-forum afholder møder efter behov, ca. 4-6 møder årligt.
          DK5-forum kan afholde møder/workshops på et bibliotek, hvor der er adgang til at se litteraturen på hylderne, i samarbejde
          med bibliotekarer på det pågældende bibliotek.
        </div>
      </div>);
  }
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
        <div className="sub-section-head">
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
        <div className="sub-section-head">
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
  supplementNumbers() {
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
          <div>
            <div className="bullet">1</div>Digte. V&aelig;rker af enkelte forfattere
            <div className="note">
              Till&aelig;gstalene 0 og 1 omfatter ikke epsisk og dramatisk litteratur p&aring; vers.
              Kortere fort&aelig;llende digte placeres dog i formgrupperne 0 og 1.
            </div>
          </div>
          <div><div className="bullet">2</div>Skuespil. Antologier</div>
          <div><div className="bullet">3</div>Skuespil. V&aelig;rker af enkelte forfattere</div>
          <div>
            <div className="bullet">4</div>Romaner og noveller. Antologier
            <div className="note">
              Her anbringes ogs&aring; antologier, sammensat af forskellige digtarter<br />
              I grupperne 86 og 88 placerer Dansk bogfortegnelse l&aelig;seb&oslash;ger og prosaantologier til
              skolebrug i en undergruppe med till&aelig;gstallet -046 eller -246.
              Andre skoleudgaver af sk&oslash;nlitteratur placeres som tilsvarende almindelige udgaver.
            </div>
          </div>
          <div><div className="bullet">5</div>Romaner og noveller f&oslash;r 1901. V&aelig;rker af enkelte forfattere</div>
          <div><div className="bullet">6</div>Romaner og noveller fra 1901. V&aelig;rker af enkelte forfattere</div>
          <div>
            <div className="bullet">7</div>Humor, tegneserier etc. Antologier
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
          <div>
            <div className="bullet">94</div>Fort&aelig;llinger for b&oslash;rn. Antologier
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
          <div>
            <div className="bullet">-6</div>Skole- og l&aelig;reb&oslash;ger (inkl. opgavesamlinger)
            <div className="note">
              Bruges i 51.3, 86-04 og 88-24.
            </div>
          </div>
          <div>
            <div className="bullet">-61</div>Almindelige l&aelig;reb&oslash;ger, l&aelig;seb&oslash;ger
            <div className="note">
              Bruges i 89.2, 89.3 og 89.4.
            </div>
          </div>
          <div>
            <div className="bullet">-62</div>&Oslash;velser og opgaver
            <div className="note">
              Bruges i 89.2, 89.3 og 89.4.
            </div>
          </div>
          <div><div className="bullet">-65</div>L&aelig;reb&oslash;ger (inkl. opgavesamlinger) for folkeskolen</div>
          <div>
            <div className="bullet">-66</div>Andre skole- og l&aelig;reb&oslash;ger (inkl. opgavesamlinger)
            <div className="note">
              -65 og -66 bruger i 40, 51, 51.1, 51.5, 51.8, 53, 54, 56 og 90,
            </div>
          </div>
          <div>
            <div className="bullet">-8</div>Udgaver for b&oslash;rn
            <div className="note">
              Bruges i 39.12 og 88.99
            </div>
          </div>
          <div>
            <div className="bullet">-99</div>Enkeltbiografier
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
      <div className="help-chapter--container">
        <div className="section-head">
          DK5
        </div>
        <div className="sub-section-head">
          Historie
        </div>
        <div className="section">
          Den danske bibliotekspioner <a href="https://da.wikipedia.org/wiki/Andreas_Schack_Steenberg">Andreas Schack Steenberg</a> var initiativtager
          til den første udgave af Dansk Decimal-Klassedeling.
          På en rejse i USA 1902 mødte Steenberg <a href="https://en.wikipedia.org/wiki/Melvil_Dewey">Melvil Dewey</a>,
          og på grundlag af dennes <a href="https://da.wikipedia.org/wiki/Dewey_Decimal_Classification">Dewey Decimal Classification System</a>,
          (7th edition, 1911) udarbejdede Statens Bogsamlingskomité første udgave af Decimal-Klassedeling : til Brug ved Ordningen af Bogsamlinger, 1. udgave 1915.
          Femte udgave, DK5, blev udarbejdet i årene 1959-1969 af en klassifikationskomité med fagleder ved Danmarks Biblioteksskole J. B. Friis-Hansen
          som sekretær og fagligt hovedansvarlig. DK5 udkom første gang i 1970, men er gennem alle årene løbende blevet rettet og ajourført af DBC.
        </div>
        <div className="sub-section-head">
          DK5-udvikling
        </div>
        <div className="section">
          Bibliografisk Råd nedsat af Slots- og Kulturstyrelsen har ansvaret for den overordnede prioritering af DK5&apos;s udvikling.
          Den løbende revision af systemet varetages af DBC.
        </div>
        <div className="sub-section-head">
          Systemets opbygning og notation
        </div>
        <div className="section">
          Systemet består af 100 hovedgrupper, som grupperer sig på følgende måde:
        </div>
        <div className="section">
          <ul>
            <li><a href="#!/hierarchy/00-07">00-07</a></li>Bogvæsen. Biblioteker. Museer. Medier. Leksika og blandede værker<br />
            <li><a href="#!/hierarchy/10-19">10-19</a></li>Filosofi. Psykologi. Videnskab og forskning. Kommunikation og IT<br />
            <li><a href="#!/hierarchy/20-29">20-29</a></li>Religion<br />
            <li><a href="#!/hierarchy/30-39">30-39</a></li>Samfundsfag. Pædagogik. Forsorg. Folkekultur<br />
            <li><a href="#!/hierarchy/40-49">40-49</a></li>Geografi og rejser. Lokalhistorie<br />
            <li><a href="#!/hierarchy/50-59">50-59</a></li>Naturvidenskab. Matematik. Antropologi og etnografi<br />
            <li><a href="#!/hierarchy/60-69">60-69</a></li>Teknik. Sygdom og sundhed. Erhverv. Hus og hjem<br />
            <li><a href="#!/hierarchy/70-79">70-79</a></li>Kultur. Kunstarter. Sport<br />
            <li><a href="#!/hierarchy/80-89">80-89</a></li>Litteratur. Sprog<br />
            <li><a href="#!/hierarchy/90-99">90-99</a></li>Historie. Biografier og erindringer<br />
          </ul>
        </div>
        <div className="section">
          De 100 hovedgrupper er underdelt efter decimalprincippet.
          Den primære underdeling i decimalklassedelingen sker efter discipliner og fag.
          Strukturen er i princippet hierarkisk i såvel notation som i grupperelationer, men der findes dog undtagelser.
        </div>
        <div className="sub-section-head">
          Almindelige regler
        </div>
        <div className="section">
          <i>Hovedregel – speciel placering</i><br />
          Som hovedregel gælder, at værker placeres så specielt som muligt.
          Sammen med værkerne om et givet emne placeres også dets forudsætninger, forhistorie og konsekvenser.<br/>
          Hovedreglen om at placere værker så specielt som muligt fraviges i visse tilfælde, hvor man uanset emnet samler den ældre litteratur.
          F.eks. samles den ældre teologiske litteratur i 20.8 Ældre teologisk litteratur.
          I visse af grupperne 82‑88 samles både fag- og skønlitteraturen fra døde sprog.
          Denne faglitteratur er så gammel, at den i reglen kun har historisk interesse og kun dårligt lader sig indpasse i en mere nutidig systematik over fagene.
        </div>
        <div className="section">
          <i>»i alm.«</i><br />
          Tilføjelsen »i alm.« til en gruppebetegnelse angiver, at særlige aspekter af emnet skal placeres andetsteds i systemet.
          Noten til gruppen beskriver nærmere, hvilke aspekter af emnet, der er tale om.<br />
          Henvisninger til specielle aspekter vil som regel modsvares af noter under de specielle aspekter om emnet i alm.
          Yderligere oplysninger om specielle aspekter kan søges alfabetisk på emner.
        </div>
        <div className="section">
          <i>Sammensatte emner</i><br />
          Værker om sammensatte emner sættes under det mest specifikke.
        </div>
        <div className="section">
          Værker, som er både regionalt og emnemæssigt afgrænset, placeres altid under emnet, f.eks. sættes et værk om slanger i Danmark under 58.7
          Padder og krybdyr og værker om fugle i den danske strandeng under 58.83 Fuglenes økologi og adfærd - ikke i 58.86 Danmarks fugle i alm.
        </div>
        <div className="section">
          En vares kulturhistorie og handel med varen placeres altid sammen med værker om fremstillingen, f.eks. sættes handel med tøj under 68.8
          Beklædningsfagene; og stueplanternes historie og dyrkning under 63.57 Stueplanter.
        </div>
        <div className="section">
          <i>Historiske periodeinddelinge</i><br />
          I grupper med underdeling for enkelte perioders historie er gruppen for nyere tid fællesgruppe for denne og de følgende undergrupper.
          F.eks. er den filosofihistoriske gruppe 10.914 Nyere tid fællesgruppe for 10.914 ‑10.918.
        </div>
        <div className="section">
          Et værk, der strækker sig over flere periodeinddelinger i DK5, placeres i overgruppen eller, hvis der er udpræget overvægt til en periode, så i gruppen for denne periode.
          I visse grupper fremgår det af noten, hvor en bestemt tidsperiode placeres, f.eks. dækker 91.8 Det 19. århundredes historie også perioden fra 1815 til 1914
        </div>
        <div className="section">
          Kunsthistorien, litteraturhistorien, kirkehistorien m.m. er opdelt i tidsperioder, f. eks. middelalderen, renæssancen og nyere tid.
          Disse grupper dækker karakteristiske perioder og kunstneriske retninger. Grupperne kan være tidsmæssigt overlappende.
        </div>
        <div className="section">
          I grupper med underdeling for enkelte lande sættes værker, som omhandler enkelte perioder i enkelte lande, under landet.
        </div>
        <div className="section">
          <i>Danske forhold vs. andre landes forhol</i><br />
          Visse grupper har undergrupper til danske forhold og til andre landes forhold.
          I sådanne tilfælde placeres fremstillinger omfattende både danske og andre landes forhold i overgruppen.
        </div>
        <div className="section">
          Hvis en speciel undergruppe til andre landes forhold findes, men ingen til danske forhold (f.eks. 34.38
          Andre landes strafferet og kriminologi) placeres såvel danske forhold som almindelige fremstillinger i overgruppen eller en undergruppe,
          hvis der findes en mere specifik undergruppe til det aktuelle emne (f.eks. sættes almindelige fremstillinger af kriminologi og kriminologi i Danmark i 34.31 Kriminologi.
          Forbrydelser ikke i 34.3 Strafferet Kriminologi).
          Tværgående studier af flere landes forhold sættes under gruppen til andre landes forhold også selv om Danmark er et af de lande, som er beskrevet.
        </div>
        <div className="section">
          <i>Forholdet mellem to eller tre…</i><br />
          Beskrivelser af historiske og faktiske forhold mellem to eller tre lande placeres under det land, som vægter mest i beskrivelsen, dog ikke under Danmark<br />
          Hvis et værk dækker f.eks. to eller tre geografiske områder ligeværdigt, placeres værket under det land, som er nævnt først i titlen eller den øvrige beskrivelse,
          dog ikke under Danmark, heller ikke hvis Danmark er nævnt først.
          F.eks. sættes en rejseguide, der dækker Østrig og Ungarn, under det land, der er nævnt først i titlen.
          Det samme gælder ved valg af alfabetisk underdeling, hvor et værk behandler flere lokaliteter i et land ligeværdigt.
        </div>
        <div className="section">
          Samme regel gælder for forholdet mellem to eller tre religioner eller trosretninger.
          I tilfælde af, at en af religionerne er kristendom, sættes værket under den førstnævnte fremmede religion.
        </div>
        <div className="section">
          Forholdet mellem to eller tre personer sættes under den mest interessante, i tvivlstilfælde sættes værket under den i titlen eller den øvrige beskrivelse først nævnte.
        </div>
        <div className="section">
          <i>Flere end tre…</i><br />
          Omhandler et værk flere end tre lande, stater og lignende, er hovedreglen, at værket placeres i overgruppen.
          Dette vil for visse gruppers vedkommende også fremgå af noten til de enkelte grupper, f.eks. 40.1 Kort og atlas.
          I enkelte grupper er indført en undtagelsesbestemmelse fra denne regel. Undtagelsen vil altid fremgå af noten, f.eks. 48 vedrørende flere end to verdensdele.
        </div>
        <div className="section">
          Handler et værk om flere end tre religioner, sættes i overgruppen 29 Religionsvidenskab, mens værker om flere end 3 personer sættes i 99.1-99.3.
        </div>
        <div className="sub-section-head">
          Form- og metagrupper
        </div>
        <div className="section">
          Systemet er udbygget med et sæt af form- og metagrupper.
        </div>
        <div className="section">
          Det beskrevne sæt af form- og metagrupper må kun opfattes som et mønster.
          Grupperne er kun oprettet de steder i systemet, hvor værkerne har skabt behov for det, og de anvendes kun, hvor de er opført i systemet, undtagen den valgfri
          tilføjelse af formgruppe 05.
        </div>
        <div className="section">
          Visse grupper i systemet kan have et klassemærke, der ender på en form- eller metagruppenotation, uden indholdsmæssigt at være en form- eller metagruppe,
          f.eks. 88.803 Baskisk skønlitteratur. Til grupperne 10, 20, 30, 40 o.s.v. føjes kun sidste ciffer, f.eks. 30.7 Uddannelse og forskning.
        </div>
        <div className="section">
          <i>Formgrupper</i><br />
          Formgrupper skiller litteraturen efter ydre kriterier.
        </div>
        <div className="section">
          Formgruppe 04: Værker af blandet indhold
          Formgruppe 05: Tidsskrifter og andre periodisk udkommende værker af blandet indhold.<br/>
        </div>
        <div className="section">
          Formgruppe 05 er ikke opført i systemet. Brugen af denne form­gruppe er valgfri og anvendes ikke i nationalbibliografien.<br/>
          Den valgfri tilføjelse af formgruppe 05 til tidsskrifter og andre periodica af blandet indhold kan bruges til alle grupper undtagen de alfabetisk,
          geografisk og topografisk underdelte ved tilføjelse af cifrene 05 til klassemærket, f.eks. 63.6505 til et tidsskrift om racefjerkræavl.
        </div>
        <div className="section">
          <i>Metagrupper</i><br />
          Metalitteraturen beskæftiger sig med, hvordan man dyrker faget i modsætning til den litteratur, der beskæftiger sig med fagets emner.<br/>
          F.eks. sættes værker om sygeplejeforskning under 61.707 Uddannelse og forskning, mens værker om sygepleje, som bygger på sygeplejeforskning sættes i 61.7 Sygepleje.
        </div>
        <div className="section">
          Metagruppe 01: Fagets grundlag, teori, metode, filosofi, etik, æstetik og psykologi<br/>
          Metagruppe 02: Hjælpevidenskaber og oversigter<br/>
          Metagruppe 03: Systematik og terminologi<br/>
          Metagruppe 06: Museer og samlinger, udstillinger, almene institutioner og selskaber, almene foreninger og organisationer, fagets medarbejdere
          og deres sociale status, standens historie og vilkår<br/>
          Metagruppe 07: Uddannelse og forskning, uddannelses- og forskningsinstitutioner. Institutioner, selskaber, organisationer og foreninger inden
          for uddannelse og forskning<br/>
          Metagruppe 08: Undersøgelsesteknik og -apparatur, fagets hjælpemidler, faglig praksis (eventuelt supplerende historiegruppe)<br/>
          Metagruppe 09: Fagets historie og almindelige tilstandsbeskrivelse<br/>
        </div>
        <div className="section">
          Reglen om speciel placering gælder også, hvor der er oprettet metagrupper.
          Værker om et fags foreninger, etik, uddannelse o.s.v. placeres således i den gruppe, der er mest speciel, og ikke i eventuelle metagrupper højere i systemet.
          F.eks. placeres Institut for Dansk Dialektforskning i 89.66 Dialekter og gruppesprog, ikke i 89.07 Uddannelse og forskning i alm.
        </div>
        <div className="section">
          Visse af metagrupperne i systemet har ikke det ovenfor beskrevne indhold.
          Det drejer sig især om grupperne 02 og 08. Inkonsekvenserne stammer fra tidligere udgaver og har fået lov at bestå ud fra ønsket
          om at ændre bestående grupper så lidt som muligt.
        </div>
        <div className="sub-section-head">
          Værkgrupper
        </div>
        <div className="section">
          I DK5 har det for visse materialer været nødvendigt at fravige hovedreglen om værkers placering efter emne, og i stedet placere disse materialer efter deres form.
          Dette gælder f.eks. klassifikation af skønlitteratur, musik og spillefilm.
        </div>
        <div className="section">
          Følgende grupper er rene værkgrupper: 03, 04, 05, 20.8, 39.12-39.14, 39.23-39.25, 72, 75.74, 77.7, 77.74., 78.3-78.8, 82-88 og 89.69.
          Derudover findes grupper, der dels omfatter selve værkerne, og dels beskrivelsen af dem, f.eks. 37.134, 75.4-75.5, 77.4 med undergrupper. og 79.41.
        </div>
        <div className="sub-section-head">
          Underdelingsprincipper
        </div>
        <div className="section">
          I visse grupper er der givet anvisning på underdeling efter følgende principper:
        </div>
        <div className="section">
          <b>Systematisk underdeling</b><br/>
          Systematisk underdeling sker ved kombination af klassemærker.
          F.eks. underdeles gruppe 01.6 Fagbibliografier ved tilføjelse af cifre, som betegner de enkelte emner:
          En bibliografi over Londons økonomiske forhold i alm. får det kombinerede klassemærke 01.6331837 London.
          Særlige kombinationsregler gælder i 01.6 Fagbibliografier for bibliografier over bibliografier og i 99.3 Faglige og biografiske opslagsværker,
          se noterne til de to grupper.
        </div>
        <div className="section">
          <b>Alfabetisk underdeling</b><br/>
          Visse grupper underdeles ikke ved hjælp af cifre, men ved tilføjelse af et alfabetisk ordningsord.
          Alfabetisk underdeling findes bl.a. i grupperne 34.66, 46.4, 72 og 99.4.
          En udgave af retsplejeloven sættes således i gruppe 34.66 Retspleje, og en bog om Herlufsholm i gruppe 46.4 Herlufsholm
        </div>
        <div className="section">
          <i>Personnavne</i><br/>
          Ved underdeling med personnavne (f.eks. i 99.4 Biografier af enkelte personer) bruges samme navneformer som i den alfabetiske katalog,
          jf. Katalogiseringsreglerne § 40-53 vedrørende personnavne som opslag.
        </div>
        <div className="section">
          <i>Danske stednavne</i><br/>
          Ved underdeling med danske stednavne bruges samme former som i følgende kilder til danske geografiske navne:
        </div>
        <div className="section">
          Autoriserede stednavne i Danmark / udgivet af Stednavneudvalget ; og autoriseret af  Kulturministeriet. - [Stednavneudvalget], [1998]-.<br />
          Seneste version fra Kort & Matrikelstyrelsens hjemmeside.
        </div>
        <div className="section">
          Danmark / J.P. Trap. - Gad, 1953-1972.
        </div>
        <div className="section">
          <i>Grønlandske stednavne</i><br />
          Til og med 1997 anvendtes den danske betegnelse for grønlandske lokaliteter, der har en dansk navneform.
          Fra 1998 anvendes udelukkende grønlandske stednavne for grønlandske lokaliteter, f. eks. Nuuk (ikke Godthåb).
          Den indførte ændring kan indebære katalogbrud i topografisk underdelte grupper.
        </div>
        <div className="section">
          Grønlandske stednavne udformes fra 1998 i overensstemmelse med »Stednavne autoriseret af Nunat Aqquinik Aalajangiisartut (Grønlands Stednavnenævn)«.
          Listen er gengivet som særskilt bilag. Listen er opdelt efter kommuner.
        </div>
        <div className="section">
          <i>Udenlandske stednavne</i><br />
          For udenlandske stednavne bruges en fordansket form, når en sådan er almindeligt anvendt, f.eks. Korfu (ikke Kerkyra)
          og Rivieraen (ikke Côte d&apos;Azur), men Napoli (ikke Neapel).
          I tvivlstilfælde henvises til følgende standardværker:<br />
          »Gyldendals store verdensatlas« eller dettes engelske forlæg, Harper Collins’ »Times Atlas of the World«, nyeste udgave.
        </div>
        <div className="section">
          <b>Geografisk underdeling</b><br />
          Ved geografisk underdeling fremkommer undergrupper til enkelte landes, områders og verdensdeles forhold.
          En gruppe underdeles geografisk ved tilføjelse af cifre, som hentes fra grupperne 41‑49.5, bortset fra grupperne »enkelte lokaliteter« samt gruppe 46.3 København.
          Man fjerner 4-tallet og punktummet og tilføjer de resterende cifre i det geografiske klassemærke til den geografisk underdelte gruppe.
          F.eks. dannes en gruppe til Kinas politiske system af grupperne 32.2 Politiske systemer i enkelte lande og 48.28 Kina.
          Når 4-tallet og punktummet fjernes i 48.28 fås cifrene 828, som tilføjes 32.2. Resultatet bliver 32.2828, som er klassemærket for Kinas politiske system.
        </div>
        <div className="section">
          Undtagelser:<br />
          I følgende grupper kan man ikke underdele med endetallet 1 (Europa): 04.2‑04.8975, 05.2‑05.95, 06.2‑06.8975,10.92‑10.995, 27.2‑27.8975, 70.92‑70.98975, 71.2‑71.795,
          73.2-73.95, 74.2‑74.8975, 74.92‑74.995, 75.092‑75.0995, 77.092‑77.0995, 78.92‑78.995.
        </div>
        <div className="section">
          I følgende grupper kan man ikke underdele med endetallene fra grupperne 49‑49.5 (Polarlandene): 04.2‑04.8975, 06.2‑06.8975, 27.2‑27.8975, 65.011‑65.018975,
          70.92‑70.98975, 74.2‑74.8975, 78.71‑78.78975.
        </div>
        <div className="section">
          Den antikke verdens kultur- og samfundsforhold skal placeres i periodegruppen for oldtiden, hvor en sådan er oprettet,
          f.eks. placeres det antikke græske teaters historie i 77.0911 Oldtiden, hvorimod byen Roms økonomiske historie står i 33.18757 Rom,
          og staten Roms (Romerrigets) økonomiske historie sættes i 33.1875.
        </div>
        <div className="section">
          <b>Geografisk og topografisk underdeling</b><br />
          Ved geografisk og topografisk underdeling, som er en udvidelse af den geografiske underdeling,
          kan man yderligere underdele med grupperne »enkelte lokaliteter«, hvor disse findes.
          Grupperne til enkelte lokaliteter er alfabetisk underdelt efter lokaliteten, og denne underdeling medtages ved den geografisk topografiske underdeling.
          Således består klassemærket for et værk om Dublins bebyggelsesgeografi af de tre elementer: 1) 71.95 Bebyggelsesgeografi – 2) 43.87 Irland enkelte lokaliteter
          (som bliver til 387, når 4-tallet og punktummet fjernes) – 3) Dublin, - altså 71.95387 Dublin.<br />
          For Københavns vedkommende tilføjes cifrene 63, ikke 64 København. En lokalbibliografi for København sættes således i 01.763.
        </div>
        <div className="sub-section-head">
          Tillægstal for antologier
        </div>
        <div className="section">
          I grupperne 04.2‑04.8975 samt 82‑88 anvendes tillægstallet 1 - i visse tilfælde, hvor systemet gør det nødvendigt dog 01 - for antologier.
          For antologier af musikalier og musikoptagelser gælder særlige regler, jf. noten til gruppe 78.3-78.8.<br/>
          Ved antologi forstås i disse grupper værker, der indeholder flere bidrag af mere end et ophav, f.eks. forfatter/komponist.
        </div>
        <div className="sub-section-head">
          Opstillings- og katalogklassemærker
        </div>
        <div className="section">
          Alle systemets grupper kan bruges som både opstillingssignatur og som katalogsignatur, undtagen katalogklassemærker.<br/>
          Katalogklassemærker er klassemærker bestående af en opstillingssignatur, et kolon og en signatur for yderligere underdeling af opstillingssignaturen.<br/>
          F.eks. består katalogklassemærket 78.412:73 af opstillingssignaturen 78.412 Orkestermusik med soloinstrumenter, kolon, og signaturen 73 Trompet.
          Kornet. Dvs. at orkestermusik med trompet eller kornet som soloinstrument opstilles i 78.412 og biplaceres i katalogen under 78.412:73.<br/>
          Desuden er 01.2 Bibliografier over enkelte personer kun beregnet til biplacering i katalogen. Anvendelsen af katalogklassemærker og opstillingssignatur
          for musikoptagelser er beskrevet i den indrammede note til 78.3-78.8.
        </div>
        <div className="sub-section-head">
          Valgfri undergrupper
        </div>
        <div className="section">
          Valgfri undergrupper anvendes ikke i nationalbibliografien.<br/>
          Valgfri undergrupper er indført i systemet, hvor enkelte specialbiblioteker eller grupper af institutioner har behov for en findeling,
          der går videre end DK5&apos;s generelle niveau, f.eks. 39.5 Festtraditioner.<br/>
          Valgfri undergrupper er i systemet angivet med noten: Valgfri gruppe.
        </div>
        <div className="sub-section-head">
          Tomme grupper
        </div>
        <div className="section">
          Visse grupper er tomme i den forstand, at de kun fungerer som overskrifter, f.eks. gruppe 47 Andre europæiske lande.
          Det gælder også en række af de grupper, som underdeles efter ovenstående underdelingsprincipper, f.eks. 99.3 Faglige biografiske opslagsværker,
          der underdeles systematisk og 01.5 Nationale bibliografier, der underdeles geografisk.<br />
          Det vil som regel af gruppebetegnelsen fremgå, om en gruppe alene fungerer som samlende overskrift for en række undergrupper, idet ordet »enkelte« da vilforekomme
          i gruppebetegnelsen, f.eks. 48.6 enkelte nord- og mellemamerikanske lande. I andre tilfælde vil det fremgå af noten til gruppen, f.eks. 37.13 Undervisningsmidler.
        </div>
        <div className="sub-section-head">
          Historiske noter
        </div>
        <div className="section">
          Der er til visse grupper i systemet føjet noter med oplysninger om ændringer i forhold til tidligere klassifikation.
        </div>
        <div className="section">
          Det gælder for ændringer, der er trådt i kraft fra 1991 ff. og det drejer sig om<br/>
          <ul>
            <li>- Grupper, hvor væsentlige dele af den litteratur, der nu står i gruppen, tidligere var placeret et andet sted i systemet</li><br/>
            <li>- Grupper, hvor overskriften er ændret væsentligt</li><br/>
            <li>- Grupper der er blevet underdelt</li><br/>
            <li>- Nyoprettede grupper</li><br/>
            <li>- Nedlagte grupper</li><br/>
          </ul>
        </div>
        <div className="section">
          Nedlagte grupper vil tillige være markeret med rødt.
        </div>
        <div className="sub-section-head">
          Registret til DK5
        </div>
        <div className="section">
          Man kan finde et emne i DK5 ved hjælp af DK5’s søgeboks.
        </div>
        <div className="section">
          Hvert emne kan henvise til en eller flere af DK5’s grupper. Enten henviser ordet direkte til en af DK5’s grupper som f.eks.<br/>
          <i>Konkurrenceret, se 34.27 Erhvervsforvaltningsret i alm.</i>
        </div>
        <div className="section">
          eller henvisningerne kan være fordelt på aspekter af emnet som f.eks.
        </div>
        <div className="section">
          <i>
            Smertebehandling<br />
            Behandlingsmetoder, se 61.54 Behandlingsformer i alm.<br />
            Farmakologi, se 61.55 Farmakologi<br />
            Kirurgisk smertebehandling, se 61.66 Kirurgi. Anæstesiologi
          </i>
        </div>
        <div className="sub-section-head">
          Historiske noter
        </div>
        <div className="section">
          Der kan være noter om DK5-grupper, hvor emnet eller et aspekt af emnet tidligere har skullet søges som f.eks.<br />
          <i>Mobiltelefoner, se 62.384 Telefoni – Før 2010: 62.397</i><br />
          Det betyder, at bøger om mobiltelefoner, som er udgivet frem til år 2009 findes på hylden under 62.397.
        </div>
        <div className="sub-section-head">
          Henvisning til hierarkisk underdelte grupper
        </div>
        <div className="section">
          Når et emne henviser til en gruppe, som er hierarkisk underdelt, betyder det, at bøger om emnet kan stå i både den gruppe,
          der henvises til og de hierarkisk underordnede grupper.<br/>
          F.eks. betyder henvisningen:
        </div>
        <div className="section">
          <i>Lægemidler, se 61.55 Farmakologi</i>
        </div>
        <div className="section">
          at bøger om lægemidler kan findes både under 61.55 og de hierarkisk underordnede grupper herunder:
        </div>
        <div className="section">
          <u>
            61.55 Farmakologi<br/>
            61.5503 Systematik. Terminologi<br/>
            61.5506 Foreninger. Institutioner<br/>
            61.5507 Uddannelse og forskning<br/>
            61.552 Farmakodynamik. Toksikologi<br/>
            61.554 Farmaci<br/>
            61.555 Apotekervæsen
          </u>
        </div>
        <div className="sub-section-head">
          Liste over emner der henviser til en DK5-gruppe
        </div>
        <div className="section">
          Man kan se hvilke emner der enten henviser direkte til en dk5-gruppe, eller som har et aspekt, som henviser til gruppen.
          Umiddelbart vises de første 5 emner, der er henviser til gruppen, og resten kan udfoldes.<br/>
          F.eks.<br/>
          <i>79.601 Idrætssociologi. Idrætspsykolog. Træningslære</i><br />
          Specialtræning inden for en enkelt sportsgren sættes i den pågældende undergruppe. I 79.601 sættes også sportsånd.
          Idrætsteori sættes i 61.1, idrætshygiejne i 61.31.<br />
          <ul>
            <li>- Coaching</li><br/>
            <li>- Doping</li><br/>
            <li>- Fitness</li><br/>
            <li>- Idrætsetik</li><br/>
            <li>- Idrætspsykologi</li><br/>
            <li>VIS ALLE (12)</li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.pro) {
      return (<div className='help--container'>{this.tips()}</div>);
    }
    return (
      <div className='help--container'>
        <Tabs>
          <Tabs.Panel title='Tips'>{this.tips()}</Tabs.Panel>
          <Tabs.Panel title='Forord'>{this.generel()}</Tabs.Panel>
          <Tabs.Panel title='Kommisorium'>{this.kommisorium()}</Tabs.Panel>
          <Tabs.Panel title='Principper'>{this.princip()}</Tabs.Panel>
          <Tabs.Panel title='Tillægstal'>{this.supplementNumbers()}</Tabs.Panel>
          <Tabs.Panel title='Grønlandske stednavne'>{this.greenland()}</Tabs.Panel>
        </Tabs>
      </div>
    );
  }
}

HelpContainerComponent.displayName = 'Help';
