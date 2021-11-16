import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

export const WeaterComponent = (props: any) => {
    const [weatherData, setWeatherData] = useState<any>()

    async function weatherCheck() {
        console.log(props.coordinance.coordinance)
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${props.coordinance.coordinance.lat}&lon=${props.coordinance.coordinance.lng}&units=metric&APPID=${process.env.REACT_APP_WEATER}`)
            .then(res => res.json())
            .then(result => {
                setWeatherData(result)
                console.log(result);
            });
    }

    useEffect(() => {
        weatherCheck()
    }, [props.coordinance])

    if (!weatherData) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            {weatherData.name}
            {weatherData.weather[0].description}
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WeaterComponent)
