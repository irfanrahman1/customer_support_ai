'use client'
import { Box, Stack, TextField, Button } from '@mui/material'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to SimCo! How can I assist you today?' }
  ])
  const [message, setMessage] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const sendMessage = async () => {
    if (message.trim() === '') return;

    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: 'Let me check that for you...' }
    ])
    setMessage('')

    // Simulate a delay for a more natural chat experience
    setTimeout(() => {
      let responseMessage = 'I’m not sure how to help with that. Please try asking in a different way.'

      const lowerCaseMessage = message.toLowerCase();

      if (lowerCaseMessage.includes('balance')) {
        responseMessage = 'Your current balance is $25. Would you like to recharge?'
      } else if (lowerCaseMessage.includes('recharge')) {
        responseMessage = 'You can recharge your SIM with the following plans:\n1. $10 for 1GB\n2. $20 for 3GB\n3. $30 for 5GB\nPlease type the number of your choice.'
      } else if (lowerCaseMessage.includes('plan')) {
        responseMessage = 'Our current plans are:\n- Unlimited Talk & Text: $15/month\n- 5GB Data + Unlimited Talk & Text: $25/month\n- 10GB Data + Unlimited Talk & Text: $35/month'
      } else if (lowerCaseMessage.includes('buy') && lowerCaseMessage.includes('sim')) {
        responseMessage = 'You can purchase a SIM card on our website or visit one of our retail stores. Would you like to find the nearest store?'
      }

      setMessages((messages) => [
        ...messages.slice(0, messages.length - 1),
        { role: 'assistant', content: responseMessage }
      ])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack 
          direction="column" 
          spacing={2} 
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box 
              key={index}
              display='flex'
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box 
                bgcolor={
                  message.role === 'assistant' 
                  ? 'primary.main' 
                  : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)} 
            onKeyPress={handleKeyPress}
            fullWidth
            inputRef={inputRef}
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
