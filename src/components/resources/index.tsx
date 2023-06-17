import * as React from "react";

export const Resources = (): JSX.Element => {
    React.useEffect((): void => {
        document.title = "Resources | Metropolis";
    }, []);

    const goBack = (): void => {
        window.history.back();
    }

    return (
        <>
            <link rel="stylesheet" href="/resources/static/css/flatpage.css" />
            <div className="resources-page">
                <a id="back" onClick={goBack}>
                    <i className="zmdi zmdi-arrow-left"></i>
                </a>

                <div className="container">
                    <div className="content">
                        <h1 className="title">Resources</h1>
                        <hr />
                        <div className="content-body"><h3>Guidance Appointment Link</h3>
                            <p><a href="https://guidanceinterview.com/s/wlmac/"></a><a href="https://guidanceinterview.com/s/wlmac/">https://guidanceinterview.com/s/wlmac/</a> </p>
                            <h3>Guidance Classrooms</h3>
                            <blockquote>
                                <p>Grade 9: <code>6afo7et</code><br />
                                    Grade 10: <code>3ngnumv</code><br />
                                    Grade 11: <code>cvkeyui</code><br />
                                    Grade 12: <code>oy3zyqw</code></p>
                            </blockquote>
                            <h3>WLMAC Library Site</h3>
                            <p><a href="https://sites.google.com/tdsb.on.ca/wlm-library/home"></a><a href="https://sites.google.com/tdsb.on.ca/wlm-library/home">https://sites.google.com/tdsb.on.ca/wlm-library/home</a></p>
                            <h3>Club &amp; Council Operating Guidelines</h3>
                            <p><a href="https://docs.google.com/document/d/1Y3ku3PHs7xS7adF0UBIBJ97xh6yg9yfOPNwhVL-FaCs/edit?usp=sharing"></a><a href="https://docs.google.com/document/d/1Y3ku3PHs7xS7adF0UBIBJ97xh6yg9yfOPNwhVL-FaCs/edit?usp=sharing">https://docs.google.com/document/d/1Y3ku3PHs7xS7adF0UBIBJ97xh6yg9yfOPNwhVL-FaCs/edit?usp=sharing</a></p>
                            <h3>Teacher Emails</h3>
                            <p><a href="mailto:daniel.abtan@tdsb.on.ca">Mr. Abtan (daniel.abtan@tdsb.on.ca)</a><br />
                                <a href="mailto:theodoros.agelothanasis@tdsb.on.ca">Mr. Agelothanasis (theodoros.agelothanasis@tdsb.on.ca)</a><br />
                                <a href="mailto:maggie.archer@tdsb.on.ca">Ms. Archer (maggie.archer@tdsb.on.ca)</a><br />
                                <a href="mailto:shazeeda.assim@tdsb.on.ca">Ms. Assim (shazeeda.assim@tdsb.on.ca)</a><br />
                                <a href="mailto:sarah.bagnarol@tdsb.on.ca">Ms. Bagnarol (sarah.bagnarol@tdsb.on.ca)</a><br />
                                <a href="mailto:florina.basaraba@tdsb.on.ca">Ms. Basaraba (florina.basaraba@tdsb.on.ca)</a><br />
                                <a href="mailto:ray.basso@tdsb.on.ca">Mr. Basso (ray.basso@tdsb.on.ca)</a><br />
                                <a href="mailto:stacy.batras@tdsb.on.ca">Ms. Batras (stacy.batras@tdsb.on.ca)</a><br />
                                <a href="mailto:daniel.berenstein@tdsb.on.ca">Mr. Berenstein (daniel.berenstein@tdsb.on.ca)</a><br />
                                <a href="mailto:david.bouttell@tdsb.on.ca">Mr. Bouttell (david.bouttell@tdsb.on.ca)</a><br />
                                <a href="mailto:john.cade@tdsb.on.ca">Mr. Cade (john.cade@tdsb.on.ca)</a><br />
                                <a href="mailto:giovanna.capozzi@tdsb.on.ca">Ms. Capozzi (giovanna.capozzi@tdsb.on.ca)</a><br />
                                <a href="mailto:nicole.cheung-seekit@tdsb.on.ca">Ms. Cheung-Seekit (nicole.cheung-seekit@tdsb.on.ca)</a><br />
                                <a href="mailto:tanya.chevannes@tdsb.on.ca">Ms. Chevannes (tanya.chevannes@tdsb.on.ca)</a><br />
                                <a href="mailto:dan.chippier@tdsb.on.ca">Mr. Chippier (dan.chippier@tdsb.on.ca)</a><br />
                                <a href="mailto:jon.cohen@tdsb.on.ca">Mr. Cohen (jon.cohen@tdsb.on.ca)</a><br />
                                <a href="mailto:lisa.abrams@tdsb.on.ca">Ms. Cohen (lisa.abrams@tdsb.on.ca)</a><br />
                                <a href="mailto:charles.collins@tdsb.on.ca">Mr. Collins (charles.collins@tdsb.on.ca)</a><br />
                                <a href="mailto:marika.cooper@tdsb.on.ca">Ms. Cooper (marika.cooper@tdsb.on.ca)</a><br />
                                <a href="mailto:jennifer.covent2@tdsb.on.ca">Ms. Covent (jennifer.covent2@tdsb.on.ca)</a><br />
                                <a href="mailto:cate.cuttle@tdsb.on.ca">Ms. Cuttle (cate.cuttle@tdsb.on.ca)</a><br />
                                <a href="mailto:youssef.daoud@tdsb.on.ca">Mr. Daoud (youssef.daoud@tdsb.on.ca)</a><br />
                                <a href="mailto:jimena.delazar@tdsb.on.ca">Ms. Del Azar (jimena.delazar@tdsb.on.ca)</a><br />
                                <a href="mailto:sean.devine@tdsb.on.ca">Mr. Devine (sean.devine@tdsb.on.ca)</a><br />
                                <a href="mailto:david.disalle@tdsb.on.ca">Mr. Di Salle (david.disalle@tdsb.on.ca)</a><br />
                                <a href="mailto:jennifer.dolan@tdsb.on.ca">Ms. Dolan (jennifer.dolan@tdsb.on.ca)</a><br />
                                <a href="mailto:yolanda.elso-ponzo@tdsb.on.ca">Ms. Elso-Ponzo (yolanda.elso-ponzo@tdsb.on.ca)</a><br />
                                <a href="mailto:jaime.galo@tdsb.on.ca">Mr. Galo (jaime.galo@tdsb.on.ca)</a><br />
                                <a href="mailto:brandi.goldman@tdsb.on.ca">Ms. Goldman (brandi.goldman@tdsb.on.ca)</a><br />
                                <a href="mailto:julie.gourley@tdsb.on.ca">Ms. Gourley (julie.gourley@tdsb.on.ca)</a><br />
                                <a href="mailto:dina.graham@tdsb.on.ca">Ms. Graham (dina.graham@tdsb.on.ca)</a><br />
                                <a href="mailto:angeliki.grundy@tdsb.on.ca">Ms. Grundy  (angeliki.grundy@tdsb.on.ca)</a><br />
                                <a href="mailto:ron.gruszecki@tdsb.on.ca">Mr. Gruszecki (ron.gruszecki@tdsb.on.ca)</a><br />
                                <a href="mailto:philip.guglielmi@tdsb.on.ca">Mr. Guglielmi (philip.guglielmi@tdsb.on.ca)</a><br />
                                <a href="mailto:iulia.gugoiu@tdsb.on.ca">Ms.Gugoiu (iulia.gugoiu@tdsb.on.ca)</a><br />
                                <a href="mailto:danny.hadida@tdsb.on.ca">Mr. Hadida (danny.hadida@tdsb.on.ca)</a><br />
                                <a href="mailto:chichky.hua@tdsb.on.ca">Mr. Hua (chichky.hua@tdsb.on.ca)</a><br />
                                <a href="mailto:sandy.indiran@tdsb.on.ca">Ms. Indiran (sandy.indiran@tdsb.on.ca)</a><br />
                                <a href="mailto:julie.kerr@tdsb.on.ca">Ms. Kerr (julie.kerr@tdsb.on.ca)</a><br />
                                <a href="mailto:michael.kissoon@tdsb.on.ca">Mr. Kissoon (michael.kissoon@tdsb.on.ca)</a><br />
                                <a href="mailto:talia.klement@tdsb.on.ca">Ms. Klement (talia.klement@tdsb.on.ca)</a><br />
                                <a href="mailto:valentina.krasteva@tdsb.on.ca">Ms. Krasteva (valentina.krasteva@tdsb.on.ca)</a><br />
                                <a href="mailto:eugene.kvache@tdsb.on.ca">Mr. Kvache (eugene.kvache@tdsb.on.ca)</a><br />
                                <a href="mailto:cindy.lawfong@tdsb.on.ca">Ms. Law (cindy.lawfong@tdsb.on.ca)</a><br />
                                <a href="mailto:ian.lawrence@tdsb.on.ca">Mr. Lawrence (ian.lawrence@tdsb.on.ca)</a><br />
                                <a href="mailto:steven.leder@tdsb.on.ca">Mr. Leder (steven.leder@tdsb.on.ca)</a><br />
                                <a href="mailto:willa.lee@tdsb.on.ca">Ms. Lee (willa.lee@tdsb.on.ca)</a><br />
                                <a href="mailto:thomas.livingstone@tdsb.on.ca">Mr. Livingstone (thomas.livingstone@tdsb.on.ca)</a><br />
                                <a href="mailto:branavy.mailvaganam@tdsb.on.ca">Ms. Mailvaganam (branavy.mailvaganam@tdsb.on.ca)</a><br />
                                <a href="mailto:robert.malo@tdsb.on.ca">Mr. Malo (robert.malo@tdsb.on.ca)</a><br />
                                <a href="mailto:carla.mancini@tdsb.on.ca">Ms. Mancini (carla.mancini@tdsb.on.ca)</a><br />
                                <a href="mailto:natasha.mansouri@tdsb.on.ca">Ms. Mansouri (natasha.mansouri@tdsb.on.ca)</a><br />
                                <a href="mailto:emily.markowitz@tdsb.on.ca">Ms. Markowitz (emily.markowitz@tdsb.on.ca)</a><br />
                                <a href="mailto:kristy.mcdowell@tdsb.on.ca">Ms. McDowell (kristy.mcdowell@tdsb.on.ca)</a><br />
                                <a href="mailto:mark.o&#39;brien@tdsb.on.ca">Mr. O’Brien (mark.o'brien@tdsb.on.ca)</a><br />
                                <a href="mailto:robert.onizuka@tdsb.on.ca">Mr. Onizuka (robert.onizuka@tdsb.on.ca)</a><br />
                                <a href="mailto:michelle.osier@tdsb.on.ca">Ms. Osier (michelle.osier@tdsb.on.ca)</a><br />
                                <a href="mailto:alexandra.parravano@tdsb.on.ca">Ms. Parravano (alexandra.parravano@tdsb.on.ca)</a><br />
                                <a href="mailto:jeremy.paul@tdsb.on.ca">Mr. Paul (jeremy.paul@tdsb.on.ca)</a><br />
                                <a href="mailto:anna.pisecny-decouto@tdsb.on.ca">Ms. Pisecny-DeCouto (anna.pisecny-decouto@tdsb.on.ca)</a><br />
                                <a href="mailto:rhonda.rankine@tdsb.on.ca">Ms. Rankine (rhonda.rankine@tdsb.on.ca)</a><br />
                                <a href="mailto:david.regan@tdsb.on.ca">Mr. Regan (david.regan@tdsb.on.ca)</a><br />
                                <a href="mailto:spencer.rupke@tdsb.on.ca">Mr. Rupke (spencer.rupke@tdsb.on.ca)</a><br />
                                <a href="mailto:jennifer.scottbarnier@tdsb.on.ca">Ms. Scott-Barnier (jennifer.scottbarnier@tdsb.on.ca)</a><br />
                                <a href="mailto:ben.segev@tdsb.on.ca">Mr. Segev (ben.segev@tdsb.on.ca)</a><br />
                                <a href="mailto:elaine.sinclair@tdsb.on.ca">Ms. Sinclair (elaine.sinclair@tdsb.on.ca)</a><br />
                                <a href="mailto:anna.spiliopoulos@tdsb.on.ca">Ms. Spiliopoulos (anna.spiliopoulos@tdsb.on.ca)</a><br />
                                <a href="mailto:ryan.stitt@tdsb.on.ca">Mr. Stitt (ryan.stitt@tdsb.on.ca)</a><br />
                                <a href="mailto:nathan.stoffman@tdsb.on.ca">Mr. Stoffman (nathan.stoffman@tdsb.on.ca)</a><br />
                                <a href="mailto:julie.tanzerlevy@tdsb.on.ca">Ms. Tanzer Levy (julie.tanzerlevy@tdsb.on.ca)</a><br />
                                <a href="mailto:fraser.tebbutt@tdsb.on.ca">Mr. Tebbutt (fraser.tebbutt@tdsb.on.ca)</a><br />
                                <a href="mailto:inga.teper@tdsb.on.ca">Ms. Teper (inga.teper@tdsb.on.ca)</a><br />
                                <a href="mailto:inna.veliganova@tdsb.on.ca">Ms. Veliganova (inna.veliganova@tdsb.on.ca)</a><br />
                                <a href="mailto:stephanie.white@tdsb.on.ca">Ms. White (stephanie.white@tdsb.on.ca)</a><br />
                                <a href="mailto:kyle.whitfield@tdsb.on.ca">Mr. Whitfield (kyle.whitfield@tdsb.on.ca)</a><br />
                                <a href="mailto:jody.willis@tdsb.on.ca">Mr. Willis (jody.willis@tdsb.on.ca)</a><br />
                                <a href="mailto:wingsun.wong@tdsb.on.ca">Mr. Wong (wingsun.wong@tdsb.on.ca)</a></p>
                            <h3>Have a resource you'd feel is helpful?</h3>
                            <p>Submit it <a href="https://forms.gle/DJ6zMTJi9BNNXuFu8">here</a></p></div>
                    </div>
                </div>
            </div>
        </>
    );
}