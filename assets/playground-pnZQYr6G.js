const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/live-CKp4eMbh.js","assets/react-C9eDEYO-.js","assets/prism-ByjZRKs9.js","assets/select-CXvnnUVy.js","assets/select-BOQSBLdM.css","assets/index-4H6v0K7N.js","assets/index-DJynyqa8.css","assets/keyboard-DCJ7Nk35.js"])))=>i.map(i=>d[i]);
import{T as l,O as d,_ as p}from"./index-4H6v0K7N.js";import{r,j as e}from"./react-C9eDEYO-.js";import"./select-CXvnnUVy.js";const u=r.lazy(()=>p(()=>import("./live-CKp4eMbh.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),t=`function App() {
    const [value, setValue] = useState()

    return (
        <Select icons={{arrow: ChevronUp}} onChange={setValue} value={value}>
            <Option value='1'><Zap/> Basic Plan</Option>
            <Option value='2'><Star/> Pro License</Option>
            <Option value='3' disabled><Shield/> Enterprise</Option>
        </Select>
    )
}

render(<App/>)`,n=e.jsxs("div",{className:"rac-live-container",children:[e.jsx("div",{className:"rac-live-preview-box"}),e.jsxs("div",{className:"rac-live-editor-box",children:[e.jsx("div",{className:"rac-editor-header",children:"Editable Source"}),e.jsx("div",{className:"rac-live-editor",children:e.jsx("pre",{className:"rac-live-code",children:t})})]})]}),h=()=>{const a=r.useRef(null),[i,c]=r.useState(!1);return r.useEffect(()=>{const s=new IntersectionObserver(([o])=>{o.isIntersecting&&(c(!0),s.disconnect())},{rootMargin:"1000px 0px"});return s.observe(a.current),()=>s.disconnect()},[]),e.jsxs("section",{className:"rac-playground",id:"playground",ref:a,children:[e.jsx(l,{icon:e.jsx(d,{className:"rac-playground-icon"}),children:"Interactive Playground"}),e.jsx("p",{className:"rac-code-desc",children:"Experiment with props, icons, and logic in real-time. Modify the code below and watch the component update instantly."}),i?e.jsx(r.Suspense,{fallback:n,children:e.jsx(u,{code:t})}):n]})};export{h as default};
