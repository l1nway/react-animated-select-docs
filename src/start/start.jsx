import {content, CopyButton, CodeBlock, animProps, options} from './components'
import {Zap, Star, Shield, ChevronDown, X, Play} from 'lucide-react'
import {LazyMotion, m, domAnimation} from 'framer-motion'
import {Fragment, useCallback, useState} from 'react'
import {Select, Option} from 'react-animated-select'
import {setScrollTarget} from '../components/store'
import {useDispatch} from 'react-redux'

function Start() {
    const dispatch = useDispatch()

    const [copied, setCopied] = useState(false)
    const [value, setValue] = useState()

    const scroll = useCallback(() => dispatch(setScrollTarget('playground')))

    const copy = useCallback((code, keyId) => {
        navigator.clipboard.writeText(code)
        setCopied(keyId)

        const timer = setTimeout(() => setCopied(false), 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <article
            className='rac-section'
            id='start'
        >
            <LazyMotion features={domAnimation}>
                <section className='rac-main-container'>
                    <h2 className='rac-start-title'>Getting started</h2>
                    <p className='rac-start-desc'>A premium React select component focused on performance and reliability. Beyond its extensive feature set and deep customization options, this component is built to be exceptionally stable. It gracefully handles complex data and unexpected prop values, providing a rock-solid foundation for your application's UI.</p>
                    <p className='rac-start-desc'>Go ahead — experiment with different configurations and build the perfect Select component tailored to your needs.</p>
                    <label className='rac-start-label'>
                        <button
                            className='rac-start-button'
                            onClick={scroll}
                        >
                            <Play/> <span>Try demo</span>
                        </button>
                    </label>
                    <m.label
                        className='rac-code-container'
                        variants={animProps}
                        layout
                    >
                        <CodeBlock
                            code='npm install react-animated-select'
                            title='Installation'
                            copied={copied}
                            language='bash'
                            keyId='install'
                            copy={copy}
                        />
                        <CopyButton copy={copy} code='npm install react-animated-select' keyId='install' copied={copied}/>
                    </m.label>
                </section>
                {Object.values(content).map((item) => (
                    <section
                        className='rac-start-basic'
                        key={item.id}
                        id={item.id}
                    >
                        <div
                            className='rac-code-title-container2'
                        >
                            <div className='rac-code-title-container'>
                                <div className='rac-code-icon'>
                                    {item.icon}
                                </div>
                                <h3 className='rac-code-title'>
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                        <p className='rac-code-desc'>
                            {item.desc}
                        </p>
                        <div className='rac-code-container'>
                            <div className='rac-basic-select-container'>
                                <Select
                                    options={(item.id === 'basic') ? options : undefined}
                                    optionsClassName='rac-basic-options'
                                    className='rac-basic-select'
                                    ArrowIcon={<ChevronDown/>}
                                    onChange={setValue}
                                    ClearIcon={<X/>}
                                    value={value}
                                >
                                    {(item.id === 'advanced') &&
                                        <Fragment>
                                            <Option value='basic'><Zap/>Basic</Option>
                                            <Option value='pro'><Star/>Pro</Option>
                                            <Option value='enterprise' disabled><Shield/>Enterprise</Option>
                                        </Fragment>
                                    }
                                </Select>
                            </div>
                            <div className='rac-code-wrapper'>
                                <CodeBlock code={item.code}/>
                                <CopyButton copy={copy} code={item.code} keyId={item.id} copied={copied}/>
                            </div>
                        </div>
                    </section>
                ))}
            </LazyMotion>
        </article>
  )
}

export default Start