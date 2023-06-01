import React, {useEffect, useRef, useState} from "react";

const App = () => {
    const [url, setUrl] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [error, setError] = useState('')
    const [volume, setVolume] = useState(100)
    const [loading, setLoading] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null)

    const timePercents = Number((currentTime / (audioRef.current?.duration || 1) * 100).toFixed(2))
    const displayTime = `${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(Math.round(currentTime % 60)).padStart(2, '0')}`

    useEffect(() => {
        console.log(audioRef.current?.currentTime, audioRef.current?.duration)
        if (!isPlaying) return audioRef.current?.pause()
        if (!audioRef.current) return
        audioRef.current?.play()
        audioRef.current.onended = () => {
            setCurrentTime(0)
            setIsPlaying(false)
        }
        const interval = setInterval(() => setCurrentTime(audioRef.current?.currentTime as number), 300)
        return () => clearInterval(interval)
    }, [isPlaying])


    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (url.trim().length < 1) return setError('Empty URL')
        setLoading(true)
        setIsPlaying(false)
        setSubmitted(true)
        setCurrentTime(0)
    }

    const audioErrorHandler = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        setSubmitted(false)
        setError(e.target.error.message || "Unknown error")
    }

    return (
        <>
            {submitted ? <button className={'back-button'} onClick={() => setSubmitted(false)}><svg width="79" height="18" viewBox="0 0 79 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.72 17.12L0.0560001 11.456V10.208L5.72 4.544L6.944 5.768L3.464 9.248L2.648 9.8L2.744 10.088L3.728 9.944H17V11.696H3.728L2.744 11.576L2.648 11.864L3.464 12.416L6.944 15.896L5.72 17.12ZM24.6874 17V15.2H27.0394V2H24.6874V0.199999H33.1114C34.0874 0.199999 34.9514 0.375999 35.7034 0.727999C36.4714 1.08 37.0634 1.576 37.4794 2.216C37.9114 2.84 38.1274 3.576 38.1274 4.424V4.616C38.1274 5.4 37.9754 6.048 37.6714 6.56C37.3674 7.056 37.0074 7.448 36.5914 7.736C36.1754 8.008 35.7674 8.208 35.3674 8.336V8.672C35.7674 8.768 36.1834 8.96 36.6154 9.248C37.0474 9.52 37.4074 9.912 37.6954 10.424C37.9994 10.936 38.1514 11.584 38.1514 12.368V12.608C38.1514 13.52 37.9274 14.312 37.4794 14.984C37.0474 15.64 36.4474 16.144 35.6794 16.496C34.9274 16.832 34.0634 17 33.0874 17H24.6874ZM29.0554 15.176H32.8714C33.9274 15.176 34.7354 14.928 35.2954 14.432C35.8554 13.936 36.1354 13.264 36.1354 12.416V12.2C36.1354 11.352 35.8554 10.68 35.2954 10.184C34.7354 9.688 33.9274 9.44 32.8714 9.44H29.0554V15.176ZM29.0554 7.616H32.9434C33.9034 7.616 34.6714 7.376 35.2474 6.896C35.8234 6.4 36.1114 5.752 36.1114 4.952V4.712C36.1114 3.896 35.8234 3.248 35.2474 2.768C34.6874 2.272 33.9194 2.024 32.9434 2.024H29.0554V7.616ZM44.6186 17.336C43.8026 17.336 43.0586 17.192 42.3866 16.904C41.7146 16.616 41.1866 16.2 40.8026 15.656C40.4186 15.112 40.2266 14.448 40.2266 13.664C40.2266 12.864 40.4186 12.208 40.8026 11.696C41.1866 11.168 41.7146 10.776 42.3866 10.52C43.0586 10.248 43.8106 10.112 44.6426 10.112H48.6026V9.248C48.6026 8.416 48.3546 7.76 47.8586 7.28C47.3786 6.8 46.6586 6.56 45.6986 6.56C44.7546 6.56 44.0186 6.792 43.4906 7.256C42.9626 7.704 42.6026 8.312 42.4106 9.08L40.6346 8.504C40.8266 7.848 41.1306 7.256 41.5466 6.728C41.9626 6.184 42.5146 5.752 43.2026 5.432C43.9066 5.096 44.7466 4.928 45.7226 4.928C47.2266 4.928 48.3946 5.32 49.2266 6.104C50.0586 6.872 50.4746 7.96 50.4746 9.368V14.672C50.4746 15.152 50.6986 15.392 51.1466 15.392H52.2266V17H50.5706C50.0426 17 49.6186 16.856 49.2986 16.568C48.9786 16.264 48.8186 15.864 48.8186 15.368V15.248H48.5306C48.3546 15.552 48.1146 15.872 47.8106 16.208C47.5226 16.528 47.1226 16.792 46.6106 17C46.0986 17.224 45.4346 17.336 44.6186 17.336ZM44.8346 15.704C45.9546 15.704 46.8586 15.376 47.5466 14.72C48.2506 14.048 48.6026 13.112 48.6026 11.912V11.648H44.7146C43.9626 11.648 43.3386 11.816 42.8426 12.152C42.3626 12.472 42.1226 12.96 42.1226 13.616C42.1226 14.272 42.3706 14.784 42.8666 15.152C43.3786 15.52 44.0346 15.704 44.8346 15.704ZM59.4951 17.336C58.3591 17.336 57.3351 17.096 56.4231 16.616C55.5271 16.12 54.8151 15.416 54.2871 14.504C53.7751 13.592 53.5191 12.512 53.5191 11.264V11C53.5191 9.736 53.7751 8.656 54.2871 7.76C54.8151 6.848 55.5271 6.152 56.4231 5.672C57.3351 5.176 58.3591 4.928 59.4951 4.928C60.6151 4.928 61.5671 5.136 62.3511 5.552C63.1511 5.968 63.7751 6.52 64.2231 7.208C64.6871 7.896 64.9831 8.632 65.1111 9.416L63.2631 9.8C63.1831 9.224 62.9911 8.696 62.6871 8.216C62.3991 7.736 61.9911 7.352 61.4631 7.064C60.9351 6.776 60.2871 6.632 59.5191 6.632C58.7351 6.632 58.0311 6.808 57.4071 7.16C56.7991 7.512 56.3111 8.016 55.9431 8.672C55.5911 9.328 55.4151 10.112 55.4151 11.024V11.24C55.4151 12.152 55.5911 12.936 55.9431 13.592C56.3111 14.248 56.7991 14.752 57.4071 15.104C58.0311 15.456 58.7351 15.632 59.5191 15.632C60.6871 15.632 61.5751 15.328 62.1831 14.72C62.8071 14.112 63.1911 13.36 63.3351 12.464L65.2071 12.872C65.0311 13.64 64.7111 14.368 64.2471 15.056C63.7831 15.744 63.1511 16.296 62.3511 16.712C61.5671 17.128 60.6151 17.336 59.4951 17.336ZM68.0389 17V0.199999H69.9349V10.088H70.2709L75.6469 5.264H78.2869L71.7829 10.976L78.4789 17H75.8629L70.2709 11.888H69.9349V17H68.0389Z" fill="#1B191C"/>
            </svg>
            </button> : <p className={'action-description'}>Insert the link</p>}
            {submitted ?
                <div className={'audio-controls'} style={{opacity: loading ? 0.4 : 1}}>
                    <audio ref={audioRef} onLoadedData={() => {
                        setLoading(false)
                        setError('')
                    }} onError={audioErrorHandler} src={url}/>
                    <button
                        className={'audio-play-button'}
                        disabled={loading}
                        onClick={() => {
                            setIsPlaying(s => !s)
                        }}
                    >
                        {!isPlaying ?
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 40V0H4.34286L40 18.7952V20.9639L4.34286 40H0Z" fill="white"/>
                            </svg> :
                            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="4" height="40" fill="white"/>
                                <rect x="28" width="4" height="40" fill="white"/>
                            </svg>
                        }
                    </button>
                    <input
                        style={{'--progress': `${timePercents}%`} as React.CSSProperties}
                        className={'time-slider'}
                        disabled={loading}
                        value={timePercents}
                        type={'range'}
                        onChange={e => {
                            if (audioRef.current) {
                                if (audioRef.current.duration === Infinity) return
                                const abs = Math.abs(Number(e.target.value) - timePercents)
                                const time = Number(Number(e.target.value) / 100 * audioRef.current.duration)
                                if (abs > 0.1) audioRef.current.currentTime = time
                                setCurrentTime(time)
                            }
                        }}
                    />
                    <div className={'time-and-volume'}>
                        <p>{displayTime}</p>
                        <input
                            className={'volume-slider'}
                            disabled={loading}
                            value={volume}
                            style={{'--progress': `${volume}%`} as React.CSSProperties}
                            onChange={e => {
                                if (audioRef.current) {
                                    audioRef.current.volume = Number(e.target.value) / 100
                                    setVolume(Number(e.target.value))
                                }
                            }}
                            type={'range'}/>
                    </div>
                </div> :
                <form onSubmit={submitHandler}>
                    <div className={'input-wrapper'}>
                        <input className={'url-input'} value={url} onChange={e => setUrl(e.target.value)} placeholder={'https://'} type={'url'}/>
                        {
                            error && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#C6A827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M11 7V11" stroke="#C6A827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="11" cy="15" r="0.5" fill="black" stroke="#C6A827"/>
                            </svg>
                        }
                        <button className={'submit'}>
                            <svg width="100%" height="100%" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" fill="#F8D231"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M67.7197 48.6943C68.0934 48.3068 68.0934 47.693 67.7197 47.3056L51.7197 30.7216L51.0253 30.002L49.586 31.3906L50.2803 32.1103L64.6457 46.9999H29H28V48.9999H29H64.6457L50.2803 63.8896L49.586 64.6093L51.0253 65.9979L51.7197 65.2782L67.7197 48.6943Z" fill="#1B191C"/>
                            </svg>
                            <div className={'button-overlay'}/>
                        </button>
                    </div>
                    <p className={'error-text'}>{error}</p>
                </form>
            }
        </>
    );
};

export default App;