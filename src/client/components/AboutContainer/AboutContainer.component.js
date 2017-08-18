/**
 * @file
 * Help container
 */

import React, {Component} from 'react';

export class AboutContainerComponent extends Component {
  render() {
    return (
      <div className='about--container'>
        <div className="about-generel--container">
          <div className="section-head">
            DK5 - Decimalklassedeling
          </div>
          <div className="section">
            DK5 er det fælles opstillings- og klassifikationssystem for de danske folke- og skolebiblioteker, samt nogle uddannelsesbiblioteker.
          </div>
          <div className="section">
            DK betyder decimalklassedeling eller DecimalKlassifikation, og DK5 er inddelt i ti hovedgrupper.
            Hovedgrupperne er underdelt i op til ti grupper, som igen kan underinddeles i op til ti grupper og så videre.
            Hertil kommer særlige regler for underdeling, f.eks. geografisk eller efter biograferede personers navne.
            DK5 er et hierarkisk opbygget system. Du kan se hierarkiet ved at klikke på et af billederne på forsiden, og derfra klikke videre ned i systemet.
          </div>
          <div className="sub-section-head">
            Registret til DK5
          </div>
          <div className="section">
            Man kan finde et emne i DK5 ved hjælp af DK5’s søgeboks.
          </div>
          <div className="section">
            Hvert emne kan henvise til en eller flere af DK5’s grupper. Enten henviser ordet direkte til en af DK5’s grupper som f.eks.
            <div className="example">Konkurrenceret, se 34.27 Erhvervsforvaltningsret i alm.</div>
            eller henvisningerne kan være fordelt på aspekter af emnet som f.eks.
            <div className="example">
              Smertebehandling
              <ul>
                <li>Behandlingsmetoder, se 61.54 Behandlingsformer i alm.</li>
                <li>Farmakologi, se 61.55 Farmakologi</li>
                <li>Kirurgisk smertebehandling, se 61.66 Kirurgi. Anæstesiologi</li>
              </ul>
            </div>
          </div>
          <div className="sub-section-head">
            Historiske noter
          </div>
          <div className="section">
            Der kan være noter om DK5-grupper, hvor emnet eller et aspekt af emnet tidligere har skullet søges som f.eks.
            <div className="example">Mobiltelefoner, se <a>62.384</a> Telefoni – Før 2010: <a>62.397</a>.</div>
            Det betyder, at bøger om mobiltelefoner, som er udgivet frem til år 2009 findes på hylden under 62.397.
          </div>
          <div className="sub-section-head">
            Henvisning til hierarkisk underdelte grupper
          </div>
          <div className="section">
            Når et emne henviser til en gruppe, som er hierarkisk underdelt, betyder det, at bøger om emnet kan stå i både den gruppe,
            der henvises til og de hierarkisk underordnede grupper.<br/>
            F.eks. betyder henvisningen:
            <div className="example">Lægemidler, se <a>61.55</a> Farmakologi.</div>
            at bøger om lægemidler kan findes både under 61.55 og de hierarkisk underordnede grupper herunder:
          </div>
          <div className="example">
            <a>61.55 Farmakologi</a>
            <div className="example">
              <a>61.5503 Systematik. Terminologi</a><br/>
              <a>61.5506 Foreninger. Institutioner</a><br/>
              <a>61.5507 Uddannelse og forskning</a><br/>
              <a>61.552 Farmakodynamik. Toksikologi</a><br/>
              <a>61.554 Farmaci</a><br/>
              <a>61.555 Apotekervæsen</a><br/>
            </div>
          </div>
          <div className="sub-section-head">
            Emner der henviser til en DK5-gruppe
          </div>
          <div className="section">
            Man kan se hvilke emner der enten henviser direkte til en dk5-gruppe, eller som har et aspekt, som henviser til gruppen.
            Umiddelbart vises de første 5 emner, der er henviser til gruppen, og resten kan udfoldes.<br/>
            F.eks.
            <div className="example">
              <a>79.601 Idrætssociologi. Idrætspsykologi. Træningslære</a>
              <div className="example">
                - &nbsp; <a>Coaching</a><br/>
                - &nbsp; <a>Doping</a><br/>
                - &nbsp; <a>Fitness</a><br/>
                - &nbsp; <a>Idrætsetik</a><br/>
                - &nbsp; <a>Idrætspsykologi</a><br/>
                <a>Vis alle (12)</a><br/>
              </div>
            </div>
          </div>
          <div className="section">
            De enkelte ord er klikbare, så man kan søge på ordet og dermed se alle de DK5-grupper emnet henviser til<br/>
            F.eks.
            <div className="example">
              Doping
              <ul>
                <li>Farmakologi, se <a>61.55</a> Farmakologi</li>
                <li>Idrætsetik, se <a>79.601</a> Idrætssociologi. Idrætspsykologi. Træningslære</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AboutContainerComponent.displayName = 'About';
