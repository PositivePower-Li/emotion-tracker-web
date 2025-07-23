import { useState } from 'react'
import './App.css'

const emotions = [
  { label: '開心', icon: '😄' },
  { label: '生氣', icon: '😡' },
  { label: '難過', icon: '😢' },
  { label: '焦慮', icon: '😰' },
  { label: '平靜', icon: '😌' },
]

const strategies = [
  '深呼吸',
  '寫日記',
  '運動',
  '找老師/同學談談',
  '聽音樂',
  '其他'
]

function App() {
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [reason, setReason] = useState('')
  const [intensity, setIntensity] = useState(3)
  const [strategy, setStrategy] = useState('深呼吸')
  const [records, setRecords] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedEmotion) return alert('請選擇情緒')
    const newRecord = {
      date: new Date().toLocaleString(),
      emotion: selectedEmotion,
      reason,
      intensity,
      strategy
    }
    setRecords([newRecord, ...records])
    setSelectedEmotion(null)
    setReason('')
    setIntensity(3)
    setStrategy('深呼吸')
  }

  return (
    <div className="container">
      <h1>情緒管理紀錄</h1>
      <form onSubmit={handleSubmit} className="emotion-form">
        <div className="section">
          <label>1. 今天的情緒：</label>
          <div className="emotions">
            {emotions.map(e => (
              <button
                type="button"
                key={e.label}
                className={selectedEmotion === e.label ? 'selected' : ''}
                onClick={() => setSelectedEmotion(e.label)}
                aria-label={e.label}
              >
                <span style={{ fontSize: 32 }}>{e.icon}</span><br/>{e.label}
              </button>
            ))}
          </div>
        </div>
        <div className="section">
          <label>2. 發生了什麼事？</label>
          <input
            type="text"
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="簡單描述原因..."
            required
          />
        </div>
        <div className="section">
          <label>3. 情緒強度：</label>
          <input
            type="range"
            min="1"
            max="5"
            value={intensity}
            onChange={e => setIntensity(Number(e.target.value))}
          />
          <span>{intensity}</span>
        </div>
        <div className="section">
          <label>4. 我選擇的調節方法：</label>
          <select value={strategy} onChange={e => setStrategy(e.target.value)}>
            {strategies.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">提交紀錄</button>
      </form>
      <hr/>
      <h2>我的情緒紀錄</h2>
      <ul className="records">
        {records.length === 0 && <li>尚無紀錄</li>}
        {records.map((rec, idx) => (
          <li key={idx}>
            <b>{rec.date}</b>｜{rec.emotion}｜強度：{rec.intensity}<br/>
            事件：{rec.reason}<br/>
            調節方法：{rec.strategy}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
