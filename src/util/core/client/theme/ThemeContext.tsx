import * as React from 'react';
import axios from 'axios'

export interface Theme{
    name: string,
    bannerPath: string,
    bannerImage: string,
    palettePath: string,
    logo: string
};
const defaultTheme = {
    name: "default",
    bannerPath: '/resources/static/css/themes/banners/spring-banner.css',
    palettePath: '/resources/static/css/themes/palette/base-theme.css',
    bannerImage: "/resources/static/img/themes/banners/spring.jpg",
    logo: "/resources/static/img/themes/logos/dark-transparent.png"
}
export const ThemeContext = React.createContext<Theme>(defaultTheme);

export const ThemeProvider = (props: { children: React.ReactNode }) => {
    const [curTheme, setTheme] = React.useState<Theme>(defaultTheme)

    React.useEffect(() => {
        // get list of themes
        axios.get('/resources/static/json/themes.json', {
            responseType: "json",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => {
            interface ResponseTheme {
                name: string | null,
                startTime: string | null,
                endTime: string | null,
                bannerPath: string | null,
                bannerImage: string | null,
                palettePath: string | null,
                logo: string | null
            }
            
            const curTime = new Date()
            const curYear = curTime.getFullYear()
            // parses the strings in themes.json to the current year & converts to a date
            const parseResponseDate = (x: string) => new Date(x.replace('[year]', curYear.toString()))

            if(res.status === 200){
                const themes: ResponseTheme[] = res.data
                // the current theme; each entry is "filled in" with highest priority given to earlier themes
                // some themes don't provide a banner or palette; in these cases, they stay unset for now (until a lower priority sets them)
                let theme: ResponseTheme = {
                    name: null,
                    startTime: null,
                    endTime: null,
                    bannerPath: null,
                    bannerImage: null,
                    palettePath: null,
                    logo: null
                }

                themes.forEach((cur: ResponseTheme) => {
                    const startTime = parseResponseDate(cur.startTime!)
                    const endTime = parseResponseDate(cur.endTime!)
                    
                    // startTime <= endTime: cur in between start and end
                    // startTime > endTime: cur after start or before end (wrapping around)
                    if(startTime <= endTime && (startTime <= curTime && curTime <= endTime) ||      
                        startTime > endTime && (startTime <= curTime || curTime <= endTime)) { 
                            // fill in each property
                            if(!theme.name) theme.name = cur.name;
                            if(!theme.bannerPath) theme.bannerPath = cur.bannerPath;
                            if(!theme.bannerImage) theme.bannerImage = cur.bannerImage;
                            if(!theme.palettePath) theme.palettePath = cur.palettePath;
                            if(!theme.logo) theme.logo = cur.logo;
                        }
                })

                setTheme({
                    name: theme.name ? theme.name : defaultTheme.name,
                    bannerPath: theme.bannerPath ? theme.bannerPath : defaultTheme.bannerPath,
                    bannerImage: theme.bannerImage ? theme.bannerImage : defaultTheme.bannerImage,
                    palettePath: theme.palettePath ? theme.palettePath : defaultTheme.palettePath,
                    logo: theme.logo ? theme.logo : defaultTheme.logo,
                })
            }
        }).catch(err => console.error(err))
    }, [])
    
    return (
        <ThemeContext.Provider value={curTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
}