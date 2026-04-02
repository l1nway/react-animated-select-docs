import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {Copy, CopyCheck, MousePointer2, Mouse} from 'lucide-react'
import {m, AnimatePresence} from 'framer-motion'

const copyMotionProps = {
    initial: {opacity: 0, scale: 0.5},
    animate: {opacity: 1, scale: 1},
    exit: {opacity: 0, scale: 0.5},
    transition: {duration: 0.1}
}

//

export const CopyButton = ({copy, code, keyId, copied}) => 
    <button
        onClick={() => copy(code, keyId)}
        className='rac-code-button'
    >
        <AnimatePresence mode='wait' initial={false}>
            {copied !== keyId
                ? <m.div key='copy' {...copyMotionProps}><Copy/></m.div>
                : <m.div key='copied' {...copyMotionProps}><CopyCheck/></m.div>
            }
        </AnimatePresence>
    </button>

export const CodeBlock = ({code, language = 'jsx'}) =>
    <SyntaxHighlighter
        language={language} 
        style={vscDarkPlus}
        customStyle={{
            backgroundColor: '#1a1a24',
            fontSize: '0.95rem',
            padding: '16px',
            margin: 0
        }}
    >
        {code}
    </SyntaxHighlighter>

// 

const basicCode = `import {Select} from 'react-animated-select'\nimport {useState} from 'react'\n\nfunction App() {\n  const options = ['Apple', 'Banana', 'Orange', 'Strawberry']\n  const [value, setValue] = useState('Apple')\n\n  return (\n    <Select\n      options={options}\n      value={value}\n      onChange={setValue}\n    />\n  )\n}`

const advancedCode = `import {Select, Option} from 'react-animated-select'\nimport {useState} from 'react'\nimport {Zap, Shield, Star} from 'lucide-react'\n\nfunction App() {\n  const [value, setValue] = useState()\n\n  return (\n    <Select \n      placeholder='Choose plan' \n      value={value} \n      onChange={setValue}\n    >\n      <Option value='basic'><Zap/>Basic</Option>\n      <Option value='pro'><Star/>Pro</Option>\n      <Option value='enterprise' disabled><Shield/>Enterprise</Option>\n    </Select>\n  )\n}`

//
export const content = {
    basic: {
        id: 'basic',
        title: 'Basic usage',
        desc: 'The simplest way to use the component by passing an array to the options prop.',
        code: basicCode,
        icon: <MousePointer2/>
    },
    advanced: {
        id: 'advanced',
        title: 'Advanced Usage (JSX Children)',
        desc: 'For more control, use Option components as children. This allows for custom styling and complex data structures.',
        code: advancedCode,
        icon: <Mouse/>
    }
}

export const animProps = {
    transition: {duration: 0.3},
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
}

export const options = ['Apple', 'Banana', 'Orange', 'Strawberry']