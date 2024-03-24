import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태정보가 보인다.
// 3. 5개의 버튼이 있다. (1개는 현재 위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 보인다.
// 5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {
  // State 설정
  const [weather, setWeather] = useState(null)
  const cities = ['paris', 'new york', 'tokyo', 'seoul']
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiError, setAPIError] = useState("")

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 데이터 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      // console.log(data);
      setWeather(data);
      setLoading(false)
    } catch (err) {
      setAPIError(err.message)
      setLoading(false)
    }
    
  };

  // 도시별 날씨 데이터 가져오기
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      setLoading(true)
      let response = await fetch(url)
      let data = await response.json()
      // console.log("Data: ", data)
      setWeather(data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setAPIError(err.message)
      setLoading(false)
    }
    
  }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city)
    }
  }

  // 앱이 실행되자마자 >> useEffect사용 & array 빈값: componentDidMount 역할
  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity()
    }
  }, [city]);

  // // ComponentDidUpdate 역할. city state가 업데이트 되었는지 확인
  // useEffect(() => {
  //   // console.log("City? ", city)
  //   getWeatherByCity()
  // }, [city])
  return (
    <div>
      {loading?(
      <div className="container">
      <ClipLoader
          color="lightblue"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </div>
        ) : (
          <div className="container">
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} handleCityChange={handleCityChange} setCity={setCity} selectedCity={city} />
          </div>
        )}
    </div>
  );
}

export default App;
