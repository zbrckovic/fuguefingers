import { App } from 'App'
import React from 'react'
import { createRoot } from 'react-dom/client'
import 'styles/main.sass'

const rootElement = document.getElementById('root')
if (rootElement === null) throw new Error('no root element')

const root = createRoot(rootElement)
root.render(<App/>)
