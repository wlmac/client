import * as React from "react";

export const ContentHistory = (): JSX.Element => {
    return (
        <>
            <div className="content" id="content-history">
                <h1 className="title">Welcome to the Lyon's Den</h1>
                <hr />
                <h2 className="subtitle">Home and Pride of the Mackenzie Lyons circa 1960</h2>
                <p className="text">
                    William Lyon Mackenzie C. I. is a Toronto District Secondary School opened in 1960 and located in North York.
                    Mackenzie was named after the historical prowess William Lyon Mackenzie, the political agitator who led the
                    government revolt in Toronto in 1837. In its years of establishing a home of blue and gold, William Lyon Mackenzie
                    Collegiate not only built an incredible student body of 1500 strong, but also a strong, tight knit community that
                    prides itself on multicultural diversity, inclusion, creativity and academic innovation. And, here is where the
                    heart and soul of the Lyon Pride resound.
                </p>
                <p className="text">
                    William Lyon Mackenzie Collegiate boasts scholastic excellence in its academic programing: the MaCS enrichment
                    program, the Gifted Program, the ELL program, the Advanced Placement Program, and the FIT program. Collectively,
                    these programs have helped nurture student voice and advocacy and inspire a variety of extracurricular
                    opportunities from clubs and councils to intramurals and athletics, to school-wide events and initiatives, all
                    of which beautifully reflect the spirit of membership - the roar of the Lyon Pride.
                </p>
            </div>

            {/* <script>
                $(document).ready(function() {
                    var urlParams = new URLSearchParams(window.location.search);
                    $(".content").hide();
                    if(!$("#content-"+urlParams.get("tab")).length) {
                        urlParams.set("tab", "history");
                        history.replaceState(null, null, "?"+urlParams.toString());
                    }
                    $("#content-"+urlParams.get("tab")).show();
                    $(".header").removeClass("active");
                    $("#"+urlParams.get("tab")).addClass("active");
                    //$(".card-authors-text").find("a").addClass("link");
                });
            </script> */}
        </>
    )
}