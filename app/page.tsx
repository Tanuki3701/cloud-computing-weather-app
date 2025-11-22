"use client";

import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  CloudRain, Wind, Droplets, MapPin, ThermometerSun, RefreshCw, 
  Sun, Sunset, Eye, Gauge, Navigation, Globe, Cloud, CloudLightning, Snowflake, Moon
} from 'lucide-react';

// --- 定義城市座標資料 ---
const CITIES = [
  { name: "Taipei City", lat: 25.0330, lon: 121.5654, label: "台北 (Taipei)" },
  { name: "Taichung City", lat: 24.1477, lon: 120.6736, label: "台中 (Taichung)" },
  { name: "Kaohsiung City", lat: 22.6273, lon: 120.3014, label: "高雄 (Kaohsiung)" },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, label: "東京 (Tokyo)" },
  { name: "New York", lat: 40.7128, lon: -74.0060, label: "紐約 (New York)" },
  { name: "London", lat: 51.5074, lon: -0.1278, label: "倫敦 (London)" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, label: "巴黎 (Paris)" },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, label: "雪梨 (Sydney)" },
];

// --- 判斷天氣狀態並返回對應的動畫元件 ---
const WeatherAnimation = ({ code, isDay }: { code: number, isDay: number }) => {
  // 晴朗 (Clear)
  if (code === 0) {
    if (isDay) {
      return (
        <div className="relative w-24 h-24 flex items-center justify-center">
          <Sun size={80} className="text-yellow-400 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full animate-pulse"></div>
        </div>
      );
    } else {
      return (
        <div className="relative w-24 h-24 flex items-center justify-center">
          <Moon size={80} className="text-slate-200 animate-bounce-slow" />
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
        </div>
      );
    }
  }

  // 多雲 (Cloudy)
  if (code >= 1 && code <= 3) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <Cloud size={80} className="text-blue-100 relative z-10 animate-[pulse_4s_ease-in-out_infinite]" />
        {isDay === 1 && <Sun size={40} className="text-yellow-400 absolute -top-2 -right-2 animate-[spin_10s_linear_infinite] z-0" />}
      </div>
    );
  }

  // 霧 (Fog)
  if (code >= 45 && code <= 48) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <Cloud size={80} className="text-slate-300 opacity-80" />
        <div className="absolute w-full h-4 bg-slate-200 blur-lg bottom-2 animate-[pulse_3s_infinite]"></div>
      </div>
    );
  }

  // 雨 (Rain/Drizzle)
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <CloudRain size={80} className="text-blue-300 z-10" />
        {/* 模擬雨滴動畫 (CSS Keyframes 不需要額外寫，用 animate-pulse 模擬一下) */}
        <div className="absolute -bottom-4 flex gap-2">
           <div className="w-1 h-3 bg-blue-400 rounded-full animate-[bounce_1s_infinite]"></div>
           <div className="w-1 h-3 bg-blue-400 rounded-full animate-[bounce_1.2s_infinite]"></div>
           <div className="w-1 h-3 bg-blue-400 rounded-full animate-[bounce_0.8s_infinite]"></div>
        </div>
      </div>
    );
  }

  // 雷雨 (Thunder)
  if (code >= 95) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <CloudLightning size={80} className="text-purple-300 z-10" />
        <div className="absolute inset-0 bg-yellow-400/30 blur-2xl animate-[pulse_0.5s_ease-in-out_infinite]"></div>
      </div>
    );
  }

  // 雪 (Snow)
  if (code >= 71 && code <= 77) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <Snowflake size={80} className="text-white animate-[spin_6s_linear_infinite]" />
      </div>
    );
  }

  // 預設
  return <Cloud size={80} className="text-white" />;
};

const getWeatherDesc = (code: number) => {
  if (code === 0) return "晴朗無雲 Clear Sky";
  if (code >= 1 && code <= 3) return "多雲時晴 Partly Cloudy";
  if (code >= 45 && code <= 48) return "起霧 Foggy";
  if (code >= 51 && code <= 67) return "細雨 Drizzle";
  if (code >= 71 && code <= 77) return "降雪 Snow";
  if (code >= 80 && code <= 82) return "雷陣雨 Rain Showers";
  if (code >= 95) return "雷暴 Thunderstorm";
  return "降雨 Rain";
};

const DetailCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl flex items-center space-x-3 hover:bg-slate-700/50 transition-all hover:scale-105 duration-300">
    <div className={`p-2.5 rounded-lg ${color} bg-opacity-10 text-white`}>
      <Icon size={20} className={color.replace('bg-', 'text-')} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</p>
      <h3 className="text-lg font-bold text-white">{value}</h3>
    </div>
  </div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); 
  const [weatherData, setWeatherData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto`;
      
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);

      const formattedChart = data.daily.time.map((dateStr: string, index: number) => {
        const date = new Date(dateStr);
        return {
          day: date.toLocaleDateString('zh-TW', { weekday: 'short' }),
          max: data.daily.temperature_2m_max[index],
          min: data.daily.temperature_2m_min[index],
          uv: data.daily.uv_index_max[index],
        };
      });
      setChartData(formattedChart);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity.lat, selectedCity.lon);
  }, [selectedCity]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (isoString: string) => {
    if (!isoString) return "--:--";
    const date = new Date(isoString);
    return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- Header --- */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
              <Globe className="text-white animate-pulse" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Global Weather
              </h1>
              <p className="text-xs text-slate-400">Vibe Coding Project V3.0</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors hover:bg-slate-700"
              value={selectedCity.name}
              onChange={(e) => {
                const city = CITIES.find(c => c.name === e.target.value);
                if (city) setSelectedCity(city);
              }}
            >
              {CITIES.map((city) => (
                <option key={city.name} value={city.name}>{city.label}</option>
              ))}
            </select>
            
            <button 
              onClick={() => fetchWeather(selectedCity.lat, selectedCity.lon)}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all active:scale-95"
              disabled={loading}
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        {/* --- Main Content --- */}
        {weatherData && weatherData.current && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 左側：目前天氣 (大卡片) */}
            <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all hover:shadow-blue-500/20">
               {/* 背景裝飾 */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
              <div className="absolute -left-10 bottom-10 w-32 h-32 bg-cyan-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 text-blue-100 mb-1">
                        <MapPin size={18} />
                        <span className="font-medium tracking-wide text-sm opacity-80">CURRENT LOCATION</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-wide">
                        {selectedCity.label.split(" ")[0]}
                        </h2>
                    </div>
                    {/* 動態天氣動畫區塊 */}
                    <WeatherAnimation code={weatherData.current.weather_code} isDay={weatherData.current.is_day} />
                </div>

                <div className="mt-6">
                    <h1 className="text-7xl font-bold text-white mb-2 tracking-tighter">
                    {weatherData.current.temperature_2m}°
                    </h1>
                    <p className="text-lg text-blue-100 font-medium flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                    {getWeatherDesc(weatherData.current.weather_code)}
                    </p>
                </div>
              </div>
              
              <div className="mt-8 space-y-3 relative z-10 bg-black/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                <div className="flex justify-between text-blue-100 border-b border-white/10 pb-2">
                  <span className="text-sm">體感溫度 Feels Like</span>
                  <span className="font-bold text-white">{weatherData.current.apparent_temperature}°C</span>
                </div>
                <div className="flex justify-between text-blue-100 pt-1">
                  <span className="text-sm">今日高/低 Max/Min</span>
                  <span className="font-bold text-white">
                    {weatherData.daily.temperature_2m_max[0]}° / {weatherData.daily.temperature_2m_min[0]}°
                  </span>
                </div>
              </div>
            </div>

            {/* 右側：詳細數據 Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <DetailCard title="濕度 Humidity" value={`${weatherData.current.relative_humidity_2m}%`} icon={Droplets} color="bg-cyan-500" />
              <DetailCard title="風速 Wind" value={`${weatherData.current.wind_speed_10m} km/h`} icon={Wind} color="bg-teal-500" />
              <DetailCard title="降雨量 Rain" value={`${weatherData.current.precipitation} mm`} icon={CloudRain} color="bg-blue-500" />
              <DetailCard title="紫外線 UV" value={weatherData.daily.uv_index_max[0]} icon={Sun} color="bg-orange-500" />
              <DetailCard title="氣壓 Pressure" value={`${weatherData.current.surface_pressure} hPa`} icon={Gauge} color="bg-purple-500" />
              <DetailCard title="風向 Direction" value={`${weatherData.current.wind_direction_10m}°`} icon={Navigation} color="bg-indigo-500" />
              <DetailCard title="日出 Sunrise" value={formatTime(weatherData.daily.sunrise[0])} icon={Eye} color="bg-yellow-500" />
              <DetailCard title="日落 Sunset" value={formatTime(weatherData.daily.sunset[0])} icon={Sunset} color="bg-red-500" />
            </div>
          </div>
        )}

        {/* --- Chart --- */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ThermometerSun className="text-yellow-400" />
              未來 7 天氣溫走勢 (7-Day Forecast)
            </h3>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1 text-orange-400"><div className="w-2 h-2 rounded-full bg-orange-400"></div> 最高溫</span>
              <span className="flex items-center gap-1 text-cyan-400"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> 最低溫</span>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  itemSorter={(item: any) => -item.value} 
                />
                
                <Area type="monotone" dataKey="max" stroke="#fb923c" strokeWidth={3} fillOpacity={1} fill="url(#colorMax)" name="最高溫" />
                <Area type="monotone" dataKey="min" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorMin)" name="最低溫" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}