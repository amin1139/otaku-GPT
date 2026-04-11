import {AI_KEY} from './constants'
import Groq from 'groq-sdk'

const groq = new Groq({ 
  apiKey: AI_KEY,
  dangerouslyAllowBrowser: true 
})

export default groq