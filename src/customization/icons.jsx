import {AnimatePresence, LazyMotion, m, domAnimation} from 'framer-motion'
import {XMarkIcon, ArrowUpIcon, CheckmarkIcon} from '../components/icons'
import {useEffect, useReducer, useState} from 'react'
import {Atom, ImageUp, ImageOff} from 'lucide-react'
import {options} from '../components/options'
import {Select} from 'react-animated-select'

const initialState = {
    items: [{
        icon: <ArrowUpIcon/>,
        name: 'ArrowIcon',
        desc: 'A directional chevron icon that indicates a collapsible menu. It points downwards when the menu is closed and flips upwards when the menu is expanded.',
        file: null
    }, {
        name: 'ClearIcon',
        icon: <XMarkIcon/>,
        desc: <>An <code>X</code> shaped icon used to clear or reset the current selection. It provides a quick way for users to remove their input or close a temporary overlay, ensuring a clean state.</>,
        file: null
    }, {
        name: 'Checkmark',
        icon: <CheckmarkIcon/>,
        desc: 'A classic tick icon that signifies a successful selection. In multi-select mode, it appears inside the Checkbox to provide a clear visual confirmation that a specific option has been successfully toggled.',
        file: null
    }, {
        name: 'Checkbox', 
        icon: false,
        desc: `By default, this is a simple border surrounding the Checkmark to indicate a toggleable state. However, it can be fully customized by uploading a unique icon to match your design system's specific multi-select aesthetic.`,
        file: null
    }],
    drag: false}

const animation = {
    initial: {scale: 0.5, opacity: 0},
    animate: {scale: 1, opacity: 1},
    exit: {scale: 0.5, opacity: 0},
    transition: {
        transform: {duration: 0.5, ease: [0.34, 1.8, 0.64, 1]},
        opacity: {duration: 0.2, ease: 'linear'}
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ICON':
            const url = action.payload instanceof File ? URL.createObjectURL(action.payload) : action.payload
            return {
                ...state,
                items: state.items.map(item => 
                    item.name === action.name ? {...item, file: url, hover: false} : item
                )
            }
        case 'SET_DRAG':
            return {...state, drag: action.payload}
        case 'SET_OVER':
            return {
                ...state,
                items: state.items.map(item => 
                    item.name === action.name ? {...item, hover: action.payload} : item
                )
            }
        default:
            return state
    }
}

function Icons() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [value, setValue] = useState(null)

    useEffect(() => {
        const handleDragOver = (e) => {
            e.preventDefault()
            if (!state.drag) dispatch({type: 'SET_DRAG', payload: true})
        }

        const handleDragLeave = (e) => {
            if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
                dispatch({type: 'SET_DRAG', payload: false})
            }
        }

        const handleDrop = (e) => {
            e.preventDefault()
            dispatch({type: 'SET_DRAG', payload: false})
        }

        window.addEventListener('dragover', handleDragOver)
        window.addEventListener('dragleave', handleDragLeave)
        window.addEventListener('drop', handleDrop)

        return () => {
            window.removeEventListener('dragover', handleDragOver)
            window.removeEventListener('dragleave', handleDragLeave)
            window.removeEventListener('drop', handleDrop)
        }
    }, [state.drag])

    return (
        <section
            style={{paddingTop: '1em'}}
            className='rac-states'
            id='icons'
        >
            <div className='rac-code-title-container'>
                <div className='rac-code-icon'>
                    <Atom style={{color: '#c084fc'}}/>
                </div>
                <h3 className='rac-code-title'>
                    Icons
                </h3>
            </div>
            <p className='rac-icons-desc'>While the component ships with a default set of optimized SVGs, it offers full support for custom overrides. You can upload your own assets or programmatically define icons using custom <span style={{color: 'rgb(86, 156, 214)'}}>{`<img>`}</span> tags, inline SVGs, or dedicated React components to perfectly align with your design system. You can also simply disable any of the icons by specifying the value <span style={{color: 'rgb(244, 71, 71)'}}>false</span> in the prop.</p>
            <div className='rac-icons-props'>
                {state.items.map((item, index) =>
                    <div
                        onDragLeave={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                dispatch({type: 'SET_OVER', name: item.name, payload: false})
                            }
                        }}
                        onDragEnter={() => dispatch({type: 'SET_OVER', name: item.name, payload: true})}
                        onDragOver={(e) => e.preventDefault()}
                        className='rac-icons-container'
                        onDrop={(e) => {
                            e.preventDefault()
                            dispatch({type: 'SET_OVER', name: item.name, payload: false})
                            const file = e.dataTransfer.files[0]
                            file && dispatch({type: 'SET_ICON', name: item.name, payload: file})
                        }}
                        key={item.name}
                    >
                        <label
                            style={{
                                borderColor: item.hover 
                                    ? 'rgb(192, 132, 252)' 
                                    : state.drag 
                                        ? '#8b5cf64d' 
                                        : ''
                            }}
                            className='rac-icons-title-container'
                            onClick={(e) => {
                                if (item.file) {
                                    e.preventDefault()
                                    dispatch({type: 'SET_ICON', name: item.name, payload: null})
                                }
                            }}
                        >
                            <LazyMotion features={domAnimation}>
                                <AnimatePresence mode='wait' initial={false}>
                                    {!item.file
                                        ? <m.div
                                            style={{border: !item.icon ? '0.1px solid gray' : ''}}
                                            className='rac-icons-icon'
                                            {...animation}
                                            key='def'
                                        >
                                            {item.icon}
                                        </m.div>
                                        : <m.img
                                            alt={`User's ${item.name} icon`}
                                            className='rac-icons-icon'
                                            src={item.file}
                                            {...animation}
                                            key='custom'
                                        />}
                                </AnimatePresence>
                                    <h4 key='stable' className='rac-icons-title'>{item.name}</h4>
                                <AnimatePresence mode='wait' initial={false}>
                                    <m.div
                                        key={item.file ? 'delete' : 'upload'}
                                        className='rac-file-icons'
                                        {...animation}
                                    >
                                        {item.file
                                            ? <ImageOff className='rac-icons-upload'/>
                                            : <ImageUp className='rac-icons-upload'/>
                                        }
                                    </m.div>
                                </AnimatePresence>
                                    {!item.file && <input
                                        onChange={(e) => e.target.files[0] && dispatch({
                                            type: 'SET_ICON', 
                                            name: item.name, 
                                            payload: e.target.files[0]
                                        })}
                                        className='rac-demo-checkbox'
                                        accept='image/*'
                                        type='file'
                                    />}
                            </LazyMotion>
                        </label>
                        <span className='rac-icon-desc'>{item.desc}</span>
                    </div>
                )}
            </div>
            <Select
                CheckmarkIcon={state.items.find(i => i.name === 'Checkmark')?.file ? <img alt='Checkmark icon' src={state.items.find(i => i.name === 'Checkmark').file}/> : undefined}
                ArrowIcon={state.items.find(i => i.name === 'ArrowIcon')?.file ? <img alt='Arrow icon' src={state.items.find(i => i.name === 'ArrowIcon').file}/> : undefined}
                ClearIcon={state.items.find(i => i.name === 'ClearIcon')?.file ? <img alt='Close icon' src={state.items.find(i => i.name === 'ClearIcon').file}/> : undefined}
                Checkbox={state.items.find(i => i.name === 'Checkbox')?.file ? <img alt='Checkbox icon' src={state.items.find(i => i.name === 'Checkbox').file}/> : undefined}
                style={{'--rac-select-min-height': '2.5rem'}}
                optionsClassName='rac-basic-options'
                className='rac-basic-select'
                onChange={setValue}
                options={options}
                value={value}
                multiple
            />
        </section>
    )
}

export default Icons