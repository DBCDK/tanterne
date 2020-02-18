/**
 * @file
 * Help container
 */

import React, {Component} from 'react';

export class AboutContainerComponent extends Component {
  componentDidMount(){
    document.title = "Om DK5 | DK5"
  }
  render() {
    return (
      <div className='about--container'>
        <div className="about-generel--container">
          <h1 className="section-head">
            DK5 - Decimalklassedeling
          </h1>
          <div className="section">
            DK5 er det fælles opstillings- og klassifikationssystem for de danske folke- og skolebiblioteker, samt nogle uddannelsesbiblioteker.
          </div>
          <div className="section">
            DK betyder decimalklassedeling eller DecimalKlassifikation, og DK5 er inddelt i ti hovedgrupper.
            Hovedgrupperne er underdelt i op til ti grupper, som igen kan underinddeles i op til ti grupper og så videre.
            Hertil kommer særlige regler for underdeling, f.eks. geografisk eller efter biograferede personers navne.
            DK5 er et hierarkisk opbygget system. Du kan se hierarkiet ved at klikke på et af billederne på forsiden, og derfra klikke videre ned i systemet.
          </div>
          <h2 className="sub-section-head">
            Registret til DK5
          </h2>
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
          <h2 className="sub-section-head">
            Historiske noter
          </h2>
          <div className="section">
            Der kan være noter om DK5-grupper, hvor emnet eller et aspekt af emnet tidligere har skullet søges som f.eks.
            <div className="example">Mobiltelefoner, se <span className="linkstyle">62.384</span> Telefoni – Før 2010: <span className="linkstyle">62.397</span>.</div>
            Det betyder, at bøger om mobiltelefoner, som er udgivet frem til år 2009 findes på hylden under 62.397.
          </div>
          <h2 className="sub-section-head">
            Henvisning til hierarkisk underdelte grupper
          </h2>
          <div className="section">
            Når et emne henviser til en gruppe, som er hierarkisk underdelt, betyder det, at bøger om emnet kan stå i både den gruppe,
            der henvises til og de hierarkisk underordnede grupper.<br/>
            F.eks. betyder henvisningen:
            <div className="example">Lægemidler, se <span className="linkstyle">61.55</span> Farmakologi.</div>
            at bøger om lægemidler kan findes både under 61.55 og de hierarkisk underordnede grupper herunder:
          </div>
          <div className="example">
            <span className="linkstyle">61.55 Farmakologi</span>
            <div className="example">
              <span className="linkstyle">61.5503 Systematik. Terminologi</span><br/>
              <span className="linkstyle">61.5506 Foreninger. Institutioner</span><br/>
              <span className="linkstyle">61.5507 Uddannelse og forskning</span><br/>
              <span className="linkstyle">61.552 Farmakodynamik. Toksikologi</span><br/>
              <span className="linkstyle">61.554 Farmaci</span><br/>
              <span className="linkstyle">61.555 Apotekervæsen</span><br/>
            </div>
          </div>
          <h2 className="sub-section-head">
            Emner der henviser til en DK5-gruppe
          </h2>
          <div className="section">
            Man kan se hvilke emner der enten henviser direkte til en dk5-gruppe, eller som har et aspekt, som henviser til gruppen.
            Umiddelbart vises de første 5 emner, der er henviser til gruppen, og resten kan udfoldes.<br/>
            F.eks.
            <div className="example">
              <span className="linkstyle">79.601 Idrætssociologi. Idrætspsykologi. Træningslære</span>
              <div className="example">
                - &nbsp; <span className="linkstyle">Coaching</span><br/>
                - &nbsp; <span className="linkstyle">Doping</span><br/>
                - &nbsp; <span className="linkstyle">Fitness</span><br/>
                - &nbsp; <span className="linkstyle">Idrætsetik</span><br/>
                - &nbsp; <span className="linkstyle">Idrætspsykologi</span><br/>
                <span className="linkstyle">Vis alle (12)</span><br/>
              </div>
            </div>
          </div>
          <div className="section">
            De enkelte ord er klikbare, så man kan søge på ordet og dermed se alle de DK5-grupper emnet henviser til<br/>
            F.eks.
            <div className="example">
              Doping
              <ul>
                <li>Farmakologi, se <span className="linkstyle">61.55</span> Farmakologi</li>
                <li>Idrætsetik, se <span className="linkstyle">79.601</span> Idrætssociologi. Idrætspsykologi. Træningslære</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AboutContainerComponent.displayName = 'About';
